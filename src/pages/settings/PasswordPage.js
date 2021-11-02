import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import _ from 'underscore';

import HeaderWithCloseButton from '../../components/HeaderWithCloseButton';
import Navigation from '../../libs/Navigation/Navigation';
import ROUTES from '../../ROUTES';
import ScreenWrapper from '../../components/ScreenWrapper';
import Text from '../../components/Text';
import styles from '../../styles/styles';
import ONYXKEYS from '../../ONYXKEYS';
import Button from '../../components/Button';
import {changePassword} from '../../libs/actions/User';
import {isValidPassword} from '../../libs/ValidationUtils';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import compose from '../../libs/compose';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';
import FixedFooter from '../../components/FixedFooter';
import ExpensiTextInput from '../../components/ExpensiTextInput';
import {clearAccountMessages} from '../../libs/actions/Session';

const propTypes = {
    /* Onyx Props */

    /** Holds information about the users account that is logging in */
    account: PropTypes.shape({
        /** An error message to display to the user */
        error: PropTypes.string,

        /** Success message to display when necessary */
        success: PropTypes.string,

        /** Whether or not a sign on form is loading (being submitted) */
        loading: PropTypes.bool,
    }),

    ...withLocalizePropTypes,
};

const defaultProps = {
    account: {},
};
class PasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            errors: {
                currentPassword: false,
                newPassword: false,
                confirmNewPassword: false,
                confirmPasswordMatch: false,
                newPasswordSameAsOld: false,
            },
        };

        this.submit = this.submit.bind(this);
        this.getErrorText = this.getErrorText.bind(this);
        this.validate = this.validate.bind(this);
        this.clearErrorAndSetValue = this.clearErrorAndSetValue.bind(this);
        this.currentPasswordInputRef = null;

        this.errorKeysMap = {
            currentPassword: 'passwordPage.errors.currentPassword',
            confirmNewPassword: 'passwordPage.errors.confirmNewPassword',
            newPasswordSameAsOld: 'passwordPage.errors.newPasswordSameAsOld',
            confirmPasswordMatch: 'setPasswordPage.passwordsDontMatch',
            newPassword: 'passwordPage.errors.newPassword',
        };
    }

    componentWillUnmount() {
        clearAccountMessages();
    }

    /**
     * Return the error message for the field
     *
     * @param {String} field
     * @returns {String}
     */
    getErrorText(field) {
        if (this.state.errors[field]) {
            return this.props.translate(this.errorKeysMap[field]);
        }
        return null;
    }


    /**
     * Set value for the field in state and clear error flag
     * @param {String} field
     * @param {String} value
     * @param {String[]} additionalErrorFlags
     */
    clearErrorAndSetValue(field, value, additionalErrorFlags) {
        const errorsToReset = {
            [field]: false,
        };
        if (additionalErrorFlags) {
            _.each(additionalErrorFlags, (errorFlag) => {
                errorsToReset[errorFlag] = false;
            });
        }

        this.setState(prevState => ({
            [field]: value,
            errors: {...prevState.errors, ...errorsToReset},
        }));
    }

    /**
     * Validate all fields and submit the form if no errors
     * @returns {Boolean}
     */
    validate() {
        const errors = {};

        if (!this.state.currentPassword) {
            errors.currentPassword = true;
        }

        if (!this.state.newPassword || !isValidPassword(this.state.newPassword)) {
            errors.newPassword = true;
        }

        if (!this.state.confirmNewPassword) {
            errors.confirmNewPassword = true;
        }

        if (this.state.currentPassword && this.state.newPassword && _.isEqual(this.state.currentPassword, this.state.newPassword)) {
            errors.newPasswordSameAsOld = true;
        }

        if (isValidPassword(this.state.newPassword) && this.state.confirmNewPassword && !_.isEqual(this.state.newPassword, this.state.confirmNewPassword)) {
            errors.confirmPasswordMatch = true;
        }

        this.setState({errors});
        return _.size(errors) === 0;
    }

    /**
     * Submit the form
     */
    submit() {
        if (!this.validate()) {
            return;
        }
        changePassword(this.state.currentPassword, this.state.newPassword)
            .then((response) => {
                if (response.jsonCode === 200) {
                    Navigation.navigate(ROUTES.SETTINGS);
                }
            });
    }

    render() {
        return (
            <ScreenWrapper onTransitionEnd={() => {
                if (this.currentPasswordInputRef) {
                    this.currentPasswordInputRef.focus();
                }
            }}
            >
                <KeyboardAvoidingView>
                    <HeaderWithCloseButton
                        title={this.props.translate('passwordPage.changePassword')}
                        shouldShowBackButton
                        onBackButtonPress={() => Navigation.navigate(ROUTES.SETTINGS)}
                        onCloseButtonPress={() => Navigation.dismissModal(true)}
                    />
                    <ScrollView style={styles.flex1} contentContainerStyle={styles.p5}>
                        <Text style={[styles.mb6]}>
                            {this.props.translate('passwordPage.changingYourPasswordPrompt')}
                        </Text>
                        <View style={styles.mb6}>
                            <ExpensiTextInput
                                label={`${this.props.translate('passwordPage.currentPassword')}*`}
                                ref={el => this.currentPasswordInputRef = el}
                                secureTextEntry
                                autoCompleteType="password"
                                textContentType="password"
                                value={this.state.currentPassword}
                                onChangeText={text => this.clearErrorAndSetValue('currentPassword', text)}
                                returnKeyType="done"
                                hasError={this.state.errors.currentPassword}
                                errorText={this.getErrorText('currentPassword')}
                            />
                        </View>
                        <View style={styles.mb6}>
                            <ExpensiTextInput
                                label={`${this.props.translate('passwordPage.newPassword')}*`}
                                secureTextEntry
                                autoCompleteType="password"
                                textContentType="password"
                                value={this.state.newPassword}
                                hasError={this.state.errors.newPassword || this.state.errors.newPasswordSameAsOld}
                                errorText={!this.state.errors.newPassword && this.state.errors.newPasswordSameAsOld
                                    ? this.getErrorText('newPasswordSameAsOld')
                                    : this.getErrorText('newPassword')}
                                onChangeText={text => this.clearErrorAndSetValue('newPassword', text, ['newPasswordSameAsOld'])}
                            />
                            {
                              !this.state.errors.newPassword && !this.state.errors.newPasswordSameAsOld
                              && (
                              <Text
                                  style={[
                                      styles.textLabelSupporting,
                                      styles.mt1,
                                  ]}
                              >
                                  {this.props.translate('passwordPage.newPasswordPrompt')}
                              </Text>
                              )
                            }
                        </View>
                        <View style={styles.mb6}>
                            <ExpensiTextInput
                                label={`${this.props.translate('passwordPage.confirmNewPassword')}*`}
                                secureTextEntry
                                autoCompleteType="password"
                                textContentType="password"
                                value={this.state.confirmNewPassword}
                                onChangeText={text => this.clearErrorAndSetValue('confirmNewPassword', text, ['confirmPasswordMatch'])}
                                hasError={this.state.errors.confirmNewPassword || this.state.errors.confirmPasswordMatch}
                                errorText={this.getErrorText(this.state.errors.confirmNewPassword ? 'confirmNewPassword' : 'confirmPasswordMatch')}
                                onSubmitEditing={this.validateAndSubmitForm}
                            />
                        </View>
                        {!_.some(_.values(this.state.errors)) && !_.isEmpty(this.props.account.error) && (
                            <Text style={styles.formError}>
                                {this.props.account.error}
                            </Text>
                        )}
                    </ScrollView>
                    <FixedFooter style={[styles.flexGrow0]}>
                        <Button
                            success
                            style={[styles.mb2]}
                            isLoading={this.props.account.loading}
                            text={this.props.translate('common.save')}
                            onPress={this.submit}
                        />
                    </FixedFooter>
                </KeyboardAvoidingView>
            </ScreenWrapper>
        );
    }
}

PasswordPage.propTypes = propTypes;
PasswordPage.defaultProps = defaultProps;

export default compose(
    withLocalize,
    withOnyx({
        account: {
            key: ONYXKEYS.ACCOUNT,
        },
    }),
)(PasswordPage);
