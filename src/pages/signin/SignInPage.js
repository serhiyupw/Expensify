import React, {Component} from 'react';
import {
    SafeAreaView, Text, View
} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import compose from '../../libs/compose';
import {Redirect} from '../../libs/Router';
import ROUTES from '../../ROUTES';
import ONYXKEYS from '../../ONYXKEYS';
import styles from '../../styles/styles';
import CustomStatusBar from '../../components/CustomStatusBar';
import updateUnread from '../../libs/UnreadIndicatorUpdater/updateUnread/index';
import SignInPageLayout from './SignInPageLayout';
import LoginForm from './LoginForm';
import GithubUsernameForm from './GithubUsernameForm';
import PasswordForm from './PasswordForm';
import ResendValidationForm from './ResendValidationForm';

const propTypes = {
    /* Onyx Props */

    // The details about the account that the user is signing in with
    account: PropTypes.shape({
        // Whether or not the account already exists
        accountExists: PropTypes.bool,

        // Whether or not there have been chat reports shared with this user
        canAccessExpensifyCash: PropTypes.bool,
    }),

    // The credentials of the person signing in
    credentials: PropTypes.shape({
        login: PropTypes.string,
        githubUsername: PropTypes.string,
        password: PropTypes.string,
        twoFactorAuthCode: PropTypes.string,
    }),

    // The session of the logged in person
    session: PropTypes.shape({
        // Error to display when there is a session error returned
        authToken: PropTypes.string,

        // Error to display when there is a session error returned
        error: PropTypes.string,
    }),
};

const defaultProps = {
    account: {},
    session: {},
    credentials: {},
};

class SignInPage extends Component {
    componentDidMount() {
        // Always reset the unread counter to zero on this page
        updateUnread(0);
    }

    render() {
        // If we end up on the sign in page and have an authToken then
        // we are signed in and should be brought back to the site root
        if (this.props.session.authToken) {
            return <Redirect to={ROUTES.ROOT} />;
        }

        // Show the login form if
        // - A login has not been entered yet
        const showLoginForm = !this.props.credentials.login;

        // Show the GitHub username form if
        // - A login has been entered
        // - AND they do not have access to this app yet
        // - AND the user hasn't entered a GitHub username yet
        // - AND a password hasn't been entered yet
        const showGithubUsernameForm = this.props.credentials.login
            && !this.props.account.canAccessExpensifyCash
            && !this.props.credentials.githubUsername
            && !this.props.credentials.password;

        // Show the password form if
        // - A login has been entered
        // - AND a GitHub username has been entered OR they already have access to expensify cash
        // - AND an account exists already for this login
        // - AND a password hasn't been entered yet
        const showPasswordForm = this.props.credentials.login
            && (
                this.props.credentials.githubUsername
                || this.props.account.canAccessExpensifyCash
            )
            && this.props.account.accountExists
            && !this.props.credentials.password;

        // Show the resend validation link form if
        // - A login has been entered
        // - AND a GitHub username has been entered OR they already have access to this app
        // - AND an account did not exist for that login
        const showResendValidationLinkForm = this.props.credentials.login
            && (
                this.props.credentials.githubUsername
                || this.props.account.canAccessExpensifyCash
            )
            && !this.props.account.accountExists;

        return (
            <>
                <CustomStatusBar />
                <SafeAreaView style={[styles.signInPage]}>
                    <SignInPageLayout>
                        {showLoginForm && <LoginForm />}

                        {showGithubUsernameForm && <GithubUsernameForm />}

                        {showPasswordForm && <PasswordForm />}

                        {showResendValidationLinkForm && <ResendValidationForm />}

                        {/* Because of the custom layout of the login form, session errors are displayed differently */}
                        {!showLoginForm && (
                            <View>
                                {this.props.session && !_.isEmpty(this.props.session.error) && (
                                    <Text style={[styles.formError]}>
                                        {this.props.session.error}
                                    </Text>
                                )}
                            </View>
                        )}
                    </SignInPageLayout>
                </SafeAreaView>
            </>
        );
    }
}

SignInPage.propTypes = propTypes;
SignInPage.defaultProps = defaultProps;

export default compose(
    withOnyx({
        account: {key: ONYXKEYS.ACCOUNT},
        credentials: {key: ONYXKEYS.CREDENTIALS},
        session: {key: ONYXKEYS.SESSION},
    })
)(SignInPage);
