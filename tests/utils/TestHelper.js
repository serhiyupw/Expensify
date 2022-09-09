import Onyx from 'react-native-onyx';
import CONST from '../../src/CONST';
import * as Session from '../../src/libs/actions/Session';
import HttpUtils from '../../src/libs/HttpUtils';
import ONYXKEYS from '../../src/ONYXKEYS';
import waitForPromisesToResolve from './waitForPromisesToResolve';
import * as ReportUtils from '../../src/libs/ReportUtils';
import * as NumberUtils from '../../src/libs/NumberUtils';

/**
 * @param {String} login
 * @param {Number} accountID
 * @param {String} [firstName]
 * @returns {Promise}
 */
function buildPersonalDetails(login, accountID, firstName = 'Test') {
    const avatar = ReportUtils.getDefaultAvatar(login);
    return {
        accountID,
        login,
        avatar,
        avatarThumbnail: avatar,
        displayName: `${firstName} User`,
        firstName,
        lastName: 'User',
        pronouns: '',
        timezone: CONST.DEFAULT_TIME_ZONE,
        payPalMeAddress: '',
        phoneNumber: '',
    };
}

/**
 * Simulate signing in and make sure all API calls in this flow succeed. Every time we add
 * a mockImplementationOnce() we are altering what Network.post() will return.
 *
 * @param {Number} [accountID]
 * @param {String} [login]
 * @param {String} [password]
 * @param {String} [authToken]
 * @param {String} [firstName]
 * @return {Promise}
 */
function signInWithTestUser(accountID = 1, login = 'test@user.com', password = 'Password1', authToken = 'asdfqwerty', firstName = 'Test') {
    const originalXhr = HttpUtils.xhr;
    HttpUtils.xhr = jest.fn();
    HttpUtils.xhr.mockImplementation(() => Promise.resolve({
        onyxData: [
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: ONYXKEYS.CREDENTIALS,
                value: {
                    login,
                },
            },
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: ONYXKEYS.ACCOUNT,
                value: {
                    validated: true,
                },
            },
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: ONYXKEYS.PERSONAL_DETAILS,
                value: {
                    [login]: buildPersonalDetails(login, accountID, firstName),
                },
            },
        ],
        jsonCode: 200,
    }));

    // Simulate user entering their login and populating the credentials.login
    Session.beginSignIn(login);
    return waitForPromisesToResolve()
        .then(() => {
            // Response is the same for calls to Authenticate and CreateLogin
            HttpUtils.xhr
                .mockImplementation(() => Promise.resolve({
                    jsonCode: 200,
                    accountID,
                    authToken,
                    email: login,
                }));
            Session.signIn(password);
            return waitForPromisesToResolve()
                .then(() => {
                    HttpUtils.xhr = originalXhr;
                });
        });
}

/**
 * Use for situations where fetch() is required.
 *
 * @example
 *
 *     beforeAll(() => {
 *         global.fetch = TestHelper.getGlobalFetchMock();
 *     });
 *
 * @returns {Function}
 */
function getGlobalFetchMock() {
    return jest.fn()
        .mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                jsonCode: 200,
            }),
        });
}

/**
 * @param {String} login
 * @param {Number} accountID
 * @returns {Promise}
 */
function setPersonalDetails(login, accountID) {
    Onyx.merge(ONYXKEYS.PERSONAL_DETAILS, {
        [login]: buildPersonalDetails(login, accountID),
    });
    return waitForPromisesToResolve();
}

/**
 * @param {String} actorEmail
 * @param {Number} sequenceNumber
 * @param {Number} timestamp
 * @returns {Object}
 */
function buildTestReportComment(actorEmail, sequenceNumber, timestamp) {
    return {
        actionName: CONST.REPORT.ACTIONS.TYPE.ADDCOMMENT,
        actorEmail,
        person: [{type: 'TEXT', style: 'strong', text: 'User B'}],
        sequenceNumber,
        timestamp,
        message: [{type: 'COMMENT', html: 'Comment 1', text: `Comment ${sequenceNumber}`}],
        reportActionID: NumberUtils.rand64(),
    };
}

export {
    getGlobalFetchMock,
    signInWithTestUser,
    setPersonalDetails,
    buildPersonalDetails,
    buildTestReportComment,
};
