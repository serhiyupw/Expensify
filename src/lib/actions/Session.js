import _ from 'underscore';
import Ion from '../Ion';
import {request} from '../Network';
import IONKEYS from '../../IONKEYS';
import CONFIG from '../../CONFIG';
import redirectToSignIn from './SignInRedirect';

/**
 * Sign in with the API
 *
 * @param {string} login
 * @param {string} password
 * @param {string} twoFactorAuthCode
 * @param {string} exitTo
 * @param {boolean} useExpensifyLogin
 *
 * @returns {Promise}
 */
function signIn(login, password, twoFactorAuthCode = '', exitTo, useExpensifyLogin = true) {
    console.debug('[SIGNIN] Authenticating with login type:', useExpensifyLogin ? 'expensify' : 'device');
    return request('Authenticate', {
        // When authenticating for the first time, we pass useExpensifyLogin as true so we check for credentials for
        // the expensify partnerID to let users authenticate with their expensify user and password.
        useExpensifyLogin,
        partnerName: CONFIG.EXPENSIFY.PARTNER_NAME,
        partnerPassword: CONFIG.EXPENSIFY.PARTNER_PASSWORD,
        partnerUserID: login,
        partnerUserSecret: password,
        twoFactorAuthCode,
        exitTo
    })
        .catch((err) => {
            console.error(err);
            console.debug('[SIGNIN] Request error');
            return Ion.merge(IONKEYS.SESSION, {error: err.message});
        });
}

/**
 * Delete login
 * @param {string} authToken
 * @param {string} login
 * @returns {Promise}
 */
function deleteLogin(authToken, login) {
    return request('DeleteLogin', {
        authToken,
        partnerName: CONFIG.EXPENSIFY.PARTNER_NAME,
        partnerPassword: CONFIG.EXPENSIFY.PARTNER_PASSWORD,
        partnerUserID: login,
    }).catch(err => Ion.merge(IONKEYS.SESSION, {error: err.message}));
}

/**
 * Sign out of our application
 *
 * @returns {Promise}
 */
function signOut() {
    return redirectToSignIn()
        .then(() => Ion.multiGet([IONKEYS.SESSION, IONKEYS.CREDENTIALS]))
        .then(data => deleteLogin(data.session.authToken, data.credentials.login))
        .then(Ion.clear)
        .catch(err => Ion.merge(IONKEYS.SESSION, {error: err.message}));
}

/**
 * Make sure the authToken we have is OK to use
 *
 * @returns {Promise}
 */
function verifyAuthToken() {
    return Ion.multiGet([IONKEYS.LAST_AUTHENTICATED, IONKEYS.CREDENTIALS, IONKEYS.CURRENT_URL])
        .then(({last_authenticated, credentials, current_url}) => {
            const haveCredentials = !_.isNull(credentials);
            // const haveExpiredAuthToken = last_authenticated < new Date().getTime() - CONFIG.AUTH_TOKEN_EXPIRATION_TIME;
            const haveExpiredAuthToken = last_authenticated < new Date().getTime() - 5000;


            if (haveExpiredAuthToken && haveCredentials) {
                console.debug('Invalid auth token: Token has expired.');
                return signIn(credentials.login, credentials.password, '', current_url.substring(1), false);
            }

            // We make this request to see if we have a valid authToken, and we only want to retry it if we know we
            // have credentials to re-authenticate
            return request('Get', {returnValueList: 'account', doNotRetry: !haveCredentials}).then((data) => {
                if (data && data.jsonCode === 200) {
                    return Ion.merge(IONKEYS.SESSION, data);
                }

                // If the auth token is bad and we didn't have credentials saved, we want them to go to the sign in page
                return redirectToSignIn();
            });
        });
}

export {
    signIn,
    signOut,
    verifyAuthToken,
};
