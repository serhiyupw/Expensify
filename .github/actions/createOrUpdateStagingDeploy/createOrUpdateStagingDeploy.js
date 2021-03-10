const _ = require('underscore');
const core = require('@actions/core');
const github = require('@actions/github');
const moment = require('moment');
const GithubUtils = require('../../libs/GithubUtils');
const GitUtils = require('../../libs/GitUtils');

const newVersion = core.getInput('NPM_VERSION', {required: true});
const octokit = github.getOctokit(core.getInput('GITHUB_TOKEN', {required: true}));
const githubUtils = new GithubUtils(octokit);

githubUtils.getStagingDeployCash()
    .then(() => githubUtils.updateStagingDeployCash(
        newVersion,
        core.getInput('NEW_PULL_REQUESTS').split(',') || [],
        core.getInput('NEW_DEPLOY_BLOCKERS').split(',') || [],
    ))
    .catch((err) => {
        // Unable to find the open StagingDeployCash
        if (err && err.code === 404) {
            console.log('No open StagingDeployCash found, creating a new one.');

            // Fetch all the StagingDeployCash issues
            return octokit.issues.listForRepo({
                owner: GithubUtils.GITHUB_OWNER,
                repo: GithubUtils.EXPENSIFY_ISSUE_REPO,
                labels: 'StagingDeployCash',
            });
        }

        // Unexpected error!
        console.error('Unexpected error occurred finding the StagingDeployCash!'
            + ' There may have been more than one open StagingDeployCash found,'
            + ' or there was some other problem with the Github API request.');
        core.setFailed(err);
    })
    .then((githubResponse) => {
        if (!githubResponse.data || _.isEmpty(githubResponse.data)) {
            console.error('Failed fetching data from Github!', githubResponse);
            core.setFailed(new Error('Failed fetching data from Github'));
        }

        // Parse the tag from the most recent StagingDeployCash
        const lastTag = githubUtils.getStagingDeployCashData(githubResponse.data[0]).tag;

        // Find the list of PRs merged between the last StagingDeployCash and the new version
        return GitUtils.getPullRequestsMergedBetween(lastTag, newVersion);
    })
    .then(PRNumbers => githubUtils.createNewStagingDeployCash(
        `Deploy Checklist: Expensify.cash ${moment().format('YYYY-MM-DD')}`,
        newVersion,
        _.map(PRNumbers, GithubUtils.getPullRequestURLFromNumber),
    ))
    .catch(err => core.setFailed(err));
