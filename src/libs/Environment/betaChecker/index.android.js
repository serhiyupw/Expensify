import semver from 'semver';
import Onyx from 'react-native-onyx';
import CONST from '../../../CONST';
import pkg from '../../../../package.json';
import ONYXKEYS from '../../../ONYXKEYS';
import * as AppUpdate from '../../actions/AppUpdate';

let lastBetaValue = false;
Onyx.connect({
    key: ONYXKEYS.IS_BETA,
    callback: value => lastBetaValue = value,
});

/**
 * Check the GitHub releases to see if the current build is a beta build or production build
 *
 * @returns {Promise}
 */
function isBetaBuild() {
    return new Promise((resolve) => {
        fetch(CONST.GITHUB_RELEASE_URL)
            .then(res => res.json())
            .then((json) => {
                const productionVersion = json.tag_name;
                if (!productionVersion) {
                    AppUpdate.setIsAppInBeta(false);
                    resolve(false);
                }

                // If the current version we are running is greater than the production version, we are on a beta version of Android
                const isBeta = semver.gt(pkg.version, productionVersion);
                AppUpdate.setIsAppInBeta(isBeta);
                resolve(isBeta);
            })
            .catch(() => {
                // In case version fetch failed like in offline mode use last saved value
                resolve(lastBetaValue);
            });
    });
}

export default {
    isBetaBuild,
};
