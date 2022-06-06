import _ from 'underscore';
import Onyx from 'react-native-onyx';
import * as PersistedRequests from '../actions/PersistedRequests';
import * as NetworkStore from './NetworkStore';
import ONYXKEYS from '../../ONYXKEYS';
import * as ActiveClientManager from '../ActiveClientManager';
import * as Request from '../Request';
import RequestThrottle from '../RequestThrottle';
import CONST from '../../CONST';

let resolveIsReadyPromise;
let isReadyPromise = new Promise((resolve) => {
    resolveIsReadyPromise = resolve;
});

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

// Resolve the isReadyPromise immediately so that the queue starts working as soon as the page loads
resolveIsReadyPromise();

let isSequentialQueueRunning = false;

/**
 * This method will get any persisted requests and fire them off in sequence to retry them.
 *
 * @returns {Promise}
 */
function process() {
    const persistedRequests = PersistedRequests.getAll();

    // If we have no persisted requests or we are offline we don't want to make any requests so we return early
    if (_.isEmpty(persistedRequests) || NetworkStore.isOffline()) {
        requestThrottle.clear();
        return Promise.resolve();
    }

    // Get the first request in the queue and process it
    const request = persistedRequests.shift();
    return Request.processWithMiddleware(request, true).then(() => {
        // If the request is successful we want to:
        // - Remove it from the queue
        // - Clear any wait time we may have added if it failed before
        // - Call process again to process the other requests in the queue
        PersistedRequests.remove(request);
        requestThrottle.clear();
        return process();
    }).catch((error) => {
        // If a request fails with a non-retryable error we just remove it from the queue and return
        if (!_.contains(errorsToRetry, error.message)) {
            PersistedRequests.remove(request);
            return Promise.resolve();
        }

        // If the request failed and we want to retry it:
        // - Check that we are not offline
        // - Sleep for a period of time
        // - Call process again. This will retry the same request since we have not removed it from the queue
        if (NetworkStore.isOffline()) {
            return Promise.resolve();
        }
        return requestThrottle.sleep(requestThrottle.getRequestWaitTime()).then(() => process());
    });
}

function flush() {
    if (isSequentialQueueRunning) {
        return;
    }

    // ONYXKEYS.PERSISTED_REQUESTS is shared across clients, thus every client/tab will have a copy
    // It is very important to only process the queue from leader client otherwise requests will be duplicated.
    if (!ActiveClientManager.isClientTheLeader()) {
        return;
    }

    isSequentialQueueRunning = true;

    // Reset the isReadyPromise so that the queue will be flushed as soon as the request is finished
    isReadyPromise = new Promise((resolve) => {
        resolveIsReadyPromise = resolve;
    });

    // Ensure persistedRequests are read from storage before proceeding with the queue
    const connectionID = Onyx.connect({
        key: ONYXKEYS.PERSISTED_REQUESTS,
        callback: () => {
            Onyx.disconnect(connectionID);
            process()
                .finally(() => {
                    isSequentialQueueRunning = false;
                    resolveIsReadyPromise();
                });
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

    // If the queue is running this request will run once it has finished processing the current batch
    if (isSequentialQueueRunning) {
        isReadyPromise.then(flush);
        return;
    }

    flush();
}

export {
    flush,
    isRunning,
    push,
};
