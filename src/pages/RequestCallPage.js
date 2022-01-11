import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import _ from 'underscore';
import moment from 'moment';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import Str from 'expensify-common/lib/str';
import HeaderWithCloseButton from '../components/HeaderWithCloseButton';
import Navigation from '../libs/Navigation/Navigation';
import styles from '../styles/styles';
import ScreenWrapper from '../components/ScreenWrapper';
import withLocalize, {withLocalizePropTypes} from '../components/withLocalize';
import ONYXKEYS from '../ONYXKEYS';
import compose from '../libs/compose';
import FullNameInputRow from '../components/FullNameInputRow';
import Button from '../components/Button';
import FixedFooter from '../components/FixedFooter';
import CONST from '../CONST';
import Growl from '../libs/Growl';
import * as Inbox from '../libs/actions/Inbox';
import * as Report from '../libs/actions/Report';
import personalDetailsPropType from './personalDetailsPropType';
import TextInput from '../components/TextInput';
import Text from '../components/Text';
import KeyboardAvoidingView from '../components/KeyboardAvoidingView';
import RequestCallIcon from '../../assets/images/request-call.svg';
import * as PersonalDetails from '../libs/actions/PersonalDetails';
import LoginUtil from '../libs/LoginUtil';
import * as ValidationUtils from '../libs/ValidationUtils';

const propTypes = {
    ...withLocalizePropTypes,

    /** The personal details of the person who is logged in */
    myPersonalDetails: personalDetailsPropType.isRequired,

    /** Current user session */
    session: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,

    /** The details about the user that is signed in */
    user: PropTypes.shape({
        /** Whether or not the user is subscribed to news updates */
        loginList: PropTypes.arrayOf(PropTypes.shape({

            /** Phone/Email associated with user */
            partnerUserID: PropTypes.string,
        })),
    }).isRequired,

    /** The policies which the user has access to */
    policies: PropTypes.shape({
        /** ID of the policy */
        policyID: PropTypes.string,

        /** The type of the policy */
        type: PropTypes.string,
    }).isRequired,

    /** Route object from navigation */
    route: PropTypes.shape({
        params: PropTypes.shape({
            /** The task ID to request the call for */
            taskID: PropTypes.string,
        }),
    }).isRequired,

    /** Used to track state for the request call form */
    requestCallForm: PropTypes.shape({
        loading: PropTypes.bool,
    }),

    /** The number of minutes the user has to wait for an inbox call */
    inboxCallUserWaitTime: PropTypes.number,
};

const defaultProps = {
    requestCallForm: {
        loading: false,
    },
    inboxCallUserWaitTime: null,
};

class RequestCallPage extends Component {
    constructor(props) {
        super(props);
        const {firstName, lastName} = this.getFirstAndLastName(props.myPersonalDetails);
        this.state = {
            firstName,
            firstNameError: '',
            lastName,
            phoneNumber: this.getPhoneNumber(props.user.loginList) || '',
            phoneExtension: '',
            phoneExtensionError: '',
            lastNameError: '',
            phoneNumberError: '',
            onTheWeekend: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.getPhoneNumber = this.getPhoneNumber.bind(this);
        this.getPhoneNumberError = this.getPhoneNumberError.bind(this);
        this.getPhoneExtensionError = this.getPhoneExtensionError.bind(this);
        this.getFirstAndLastName = this.getFirstAndLastName.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.validatePhoneInput = this.validatePhoneInput.bind(this);
        this.validatePhoneExtensionInput = this.validatePhoneExtensionInput.bind(this);
    }

    componentDidMount() {
        // If it is the weekend don't check the wait time
        if (moment().day() === 0 || moment().day() === 6) {
            this.setState({
                onTheWeekend: true,
            });
            return;
        }
        Inbox.getInboxCallWaitTime();
    }

    onSubmit() {
        if (!this.validateInputs()) {
            return;
        }

        const personalPolicy = _.find(this.props.policies, policy => policy && policy.type === CONST.POLICY.TYPE.PERSONAL);
        if (!personalPolicy) {
            Growl.error(this.props.translate('requestCallPage.growlMessageNoPersonalPolicy'), 3000);
            return;
        }

        Inbox.requestInboxCall({
            taskID: this.props.route.params.taskID,
            policyID: personalPolicy.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: LoginUtil.getPhoneNumberWithoutSpecialChars(this.state.phoneNumber),
            phoneNumberExtension: this.state.phoneExtension,
            email: this.props.session.email,
        });
    }

    /**
     * Gets the user's phone number from their secondary login.
     * Returns null if it doesn't exist.
     * @param {Array<Object>} loginList
     *
     * @returns {String|null}
     */
    getPhoneNumber(loginList) {
        const secondaryLogin = _.find(loginList, login => Str.isSMSLogin(login.partnerUserID));
        return secondaryLogin ? Str.removeSMSDomain(secondaryLogin.partnerUserID) : null;
    }

    /**
     * Gets proper phone number error message depending on phoneNumber input value.
     * @returns {String}
     */
    getPhoneNumberError() {
        const phoneNumber = LoginUtil.getPhoneNumberWithoutSpecialChars(this.state.phoneNumber);
        if (_.isEmpty(this.state.phoneNumber.trim()) || !Str.isValidPhone(phoneNumber)) {
            return this.props.translate('messages.errorMessageInvalidPhone');
        }
        return '';
    }

    /**
     * Gets the phone extension error message depending on the phoneExtension input value.
     * @returns {String}
     */
    getPhoneExtensionError() {
        if (_.isEmpty(this.state.phoneExtension)) {
            return '';
        }
        if (!ValidationUtils.isPositiveInteger(this.state.phoneExtension)) {
            return this.props.translate('requestCallPage.error.phoneExtension');
        }
        return '';
    }

    /**
     * Gets the first and last name from the user's personal details.
     * If the login is the same as the displayName, then they don't exist,
     * so we return empty strings instead.
     * @param {String} login
     * @param {String} displayName
     *
     * @returns {Object}
     */
    getFirstAndLastName({login, displayName}) {
        let firstName;
        let lastName;

        if (Str.removeSMSDomain(login) === displayName) {
            firstName = '';
            lastName = '';
        } else {
            const firstSpaceIndex = displayName.indexOf(' ');
            const lastSpaceIndex = displayName.lastIndexOf(' ');

            if (firstSpaceIndex === -1) {
                firstName = displayName;
                lastName = '';
            } else {
                firstName = displayName.substring(0, firstSpaceIndex);
                lastName = displayName.substring(lastSpaceIndex);
            }
        }

        return {firstName, lastName};
    }

    getWaitTimeMessageKey(minutes) {
        if (minutes == null) {
            return 'requestCallPage.waitTime.calculating';
        }

        if (minutes > 300) {
            // The wait time is longer than 5 hours, so just say that.
            return 'requestCallPage.waitTime.fiveHoursPlus';
        }

        if (minutes > 60) {
            // The wait time is between 1 and 5 hours, so lets convert to hours and minutes.
            return 'requestCallPage.waitTime.hoursAndMinutes';
        }

        // The wait time is less than an hour so just give minutes.
        return 'requestCallPage.waitTime.minutes';
    }

    getWaitTimeMessage() {
        let waitTimeKey = 'requestCallPage.waitTime.weekend';
        if (!this.state.onTheWeekend) {
            waitTimeKey = this.getWaitTimeMessageKey(this.props.inboxCallUserWaitTime);
        }
        return `${this.props.translate(waitTimeKey, {minutes: this.props.inboxCallUserWaitTime})} ${this.props.translate('requestCallPage.waitTime.guides')}`;
    }

    validatePhoneInput() {
        this.setState({phoneNumberError: this.getPhoneNumberError()});
    }

    validatePhoneExtensionInput() {
        this.setState({phoneExtensionError: this.getPhoneExtensionError()});
    }

    /**
     * Checks for input errors, returns true if everything is valid, false otherwise.
     * @returns {Boolean}
     */
    validateInputs() {
        const firstOrLastNameEmpty = _.isEmpty(this.state.firstName.trim()) || _.isEmpty(this.state.lastName.trim());
        if (firstOrLastNameEmpty) {
            Growl.error(this.props.translate('requestCallPage.growlMessageEmptyName'));
        }

        const phoneNumberError = this.getPhoneNumberError();
        const phoneExtensionError = this.getPhoneExtensionError();
        const {firstNameError, lastNameError} = PersonalDetails.getFirstAndLastNameErrors(this.state.firstName, this.state.lastName);

        this.setState({
            firstNameError,
            lastNameError,
            phoneNumberError,
            phoneExtensionError,
        });
        return !firstOrLastNameEmpty && _.isEmpty(phoneNumberError) && _.isEmpty(phoneExtensionError) && _.isEmpty(firstNameError) && _.isEmpty(lastNameError);
    }

    render() {
        return (
            <ScreenWrapper>
                <KeyboardAvoidingView>
                    <HeaderWithCloseButton
                        title={this.props.translate('requestCallPage.title')}
                        shouldShowBackButton
                        onBackButtonPress={() => Report.fetchOrCreateChatReport([
                            this.props.session.email,
                            CONST.EMAIL.CONCIERGE,
                        ], true)}
                        onCloseButtonPress={() => Navigation.dismissModal(true)}
                    />
                    <ScrollView style={styles.flex1} contentContainerStyle={[styles.p5, styles.pt0]}>
                        <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter]}>
                            <Text style={[styles.h1, styles.flex1]}>{this.props.translate('requestCallPage.subtitle')}</Text>
                            <RequestCallIcon width={160} height={100} style={styles.flex1} />
                        </View>
                        <Text style={[styles.mb4]}>
                            {this.props.translate('requestCallPage.description')}
                        </Text>
                        <FullNameInputRow
                            firstName={this.state.firstName}
                            firstNameError={this.state.firstNameError}
                            lastName={this.state.lastName}
                            lastNameError={this.state.lastNameError}
                            onChangeFirstName={firstName => this.setState({firstName})}
                            onChangeLastName={lastName => this.setState({lastName})}
                            style={[styles.mv4]}
                        />
                        <View style={[styles.mt4, styles.flexRow]}>
                            <View style={styles.flex1}>
                                <TextInput
                                    label={this.props.translate('common.phoneNumber')}
                                    autoCompleteType="off"
                                    autoCorrect={false}
                                    value={this.state.phoneNumber}
                                    placeholder="2109400803"
                                    errorText={this.state.phoneNumberError}
                                    onBlur={this.validatePhoneInput}
                                    onChangeText={phoneNumber => this.setState({phoneNumber})}
                                />
                            </View>
                            <View style={[styles.flex1, styles.ml2]}>
                                <TextInput
                                    label={this.props.translate('requestCallPage.extension')}
                                    autoCompleteType="off"
                                    autoCorrect={false}
                                    value={this.state.phoneExtension}
                                    placeholder="100"
                                    errorText={this.state.phoneExtensionError}
                                    onBlur={this.validatePhoneExtensionInput}
                                    onChangeText={phoneExtension => this.setState({phoneExtension})}
                                />
                            </View>
                        </View>
                        <Text style={[styles.textMicroSupporting, styles.mt4]}>{this.getWaitTimeMessage()}</Text>
                    </ScrollView>
                    <FixedFooter>
                        <Button
                            success
                            onPress={this.onSubmit}
                            style={[styles.w100]}
                            text={this.props.translate('requestCallPage.callMe')}
                            isLoading={this.props.requestCallForm.loading}
                        />
                    </FixedFooter>
                </KeyboardAvoidingView>
            </ScreenWrapper>
        );
    }
}

RequestCallPage.propTypes = propTypes;
RequestCallPage.defaultProps = defaultProps;

export default compose(
    withLocalize,
    withOnyx({
        myPersonalDetails: {
            key: ONYXKEYS.MY_PERSONAL_DETAILS,
        },
        session: {
            key: ONYXKEYS.SESSION,
        },
        user: {
            key: ONYXKEYS.USER,
        },
        policies: {
            key: ONYXKEYS.COLLECTION.POLICY,
        },
        requestCallForm: {
            key: ONYXKEYS.REQUEST_CALL_FORM,
            initWithStoredValues: false,
        },
        inboxCallUserWaitTime: {
            key: ONYXKEYS.INBOX_CALL_USER_WAIT_TIME,
        },
    }),
)(RequestCallPage);
