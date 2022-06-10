import _ from 'underscore';
import Onyx from 'react-native-onyx';
import * as PersistedRequests from '../actions/PersistedRequests';
import * as NetworkStore from './NetworkStore';
import ONYXKEYS from '../../ONYXKEYS';
import * as ActiveClientManager from '../ActiveClientManager';
import * as Request from '../Request';
import RequestThrottle from '../RequestThrottle';
import CONST from '../../CONST';

const requestThrottle = new RequestThrottle();
const errorsToRetry = [
    CONST.ERROR.FAILED_TO_FETCH,
    CONST.ERROR.IOS_NETWORK_CONNECTION_LOST,
    CONST.ERROR.NETWORK_REQUEST_FAILED,
    CONST.ERROR.IOS_NETWORK_CONNECTION_LOST_RUSSIAN,
    CONST.ERROR.IOS_NETWORK_CONNECTION_LOST_SWEDISH,
    CONST.ERROR.FIREFOX_DOCUMENT_LOAD_ABORTED,
    CONST.ERROR.SAFARI_DOCUMENT_LOAD_ABORTED,
    CONST.ERROR.IOS_LOAD_FAILED,
    CONST.ERROR.GATEWAY_TIMEOUT,
    CONST.ERROR.EXPENSIFY_SERVICE_INTERRUPTED,
];

let isSequentialQueueRunning = false;
let currentRequest = null;

/**
 * This method will get any persisted requests and fire them off in sequence to retry them.
 *
 * @returns {Promise}
 */
function process() {
    const persistedRequests = [...PersistedRequests.getAll()];
    console.log('running queue', persistedRequests);

    // If we have no persisted requests or we are offline we don't want to make any requests so we return early
    if (_.isEmpty(persistedRequests) || NetworkStore.isOffline()) {
        console.log('Offline or no requests');
        isSequentialQueueRunning = false;
        requestThrottle.clear();
        return Promise.resolve();
    }

    isSequentialQueueRunning = true;

    // Get the first request in the queue and process it
    currentRequest = persistedRequests.shift();
    console.log('processing', currentRequest);
    return Request.processWithMiddleware(currentRequest, true).then(() => {
        // If the request is successful we want to:
        // - Remove it from the queue
        // - Clear any wait time we may have added if it failed before
        // - Call process again to process the other requests in the queue
        PersistedRequests.remove(currentRequest);
        requestThrottle.clear();
        console.log('done, moving on to next request');
        return process();
    }).catch((error) => {
        // If a request fails with a non-retryable error we just remove it from the queue and move on to the next request
        if (!_.contains(errorsToRetry, error.message)) {
            console.log('not retrying, moving on', error);
            PersistedRequests.remove(currentRequest);
            return process();
        }

        // If the request failed and we want to retry it:
        // - Sleep for a period of time
        // - Call process again. This will retry the same request since we have not removed it from the queue
        requestThrottle.sleep().then(() => process());
    });
}

function flush() {
    console.log('Called flush');
    if (isSequentialQueueRunning) {
        return;
    }

    // ONYXKEYS.PERSISTED_REQUESTS is shared across clients, thus every client/tab will have a copy
    // It is very important to only process the queue from leader client otherwise requests will be duplicated.
    if (!ActiveClientManager.isClientTheLeader()) {
        return;
    }

    // Ensure persistedRequests are read from storage before proceeding with the queue
    const connectionID = Onyx.connect({
        key: ONYXKEYS.PERSISTED_REQUESTS,
        callback: () => {
            Onyx.disconnect(connectionID);
            console.log('Call process');
            process();
        },
    });
}

/**
 * @returns {Boolean}
 */
function isRunning() {
    return isSequentialQueueRunning;
}

// Flush the queue when the connection resumes
NetworkStore.onReconnection(flush);

// Call flush immediately so that the queue starts running as soon as the page loads
flush();

/**
 * @param {Object} request
 */
function push(request) {
    // Add request to Persisted Requests so that it can be retried if it fails
    PersistedRequests.save([request]);

    // If we are offline we don't need to trigger the queue to empty as it will happen when we come back online
    if (NetworkStore.isOffline()) {
        return;
    }

    if (!isSequentialQueueRunning) {
        flush();
    }
}

/**
 * @returns {Promise}
 */
function getCurrentRequest() {
    if (currentRequest === null) {
        return Promise.resolve();
    }
    return currentRequest;
}

export {
    flush,
    getCurrentRequest,
    isRunning,
    push,
};
