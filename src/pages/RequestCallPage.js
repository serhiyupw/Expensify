import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import _ from 'underscore';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import Str from 'expensify-common/lib/str';
import HeaderWithCloseButton from '../components/HeaderWithCloseButton';
import Navigation from '../libs/Navigation/Navigation';
import ROUTES from '../ROUTES';
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
import {requestConciergeDMCall} from '../libs/actions/Inbox';

const propTypes = {
    ...withLocalizePropTypes,

    /** The personal details of the person who is logged in */
    myPersonalDetails: PropTypes.shape({
        /** Display name of the current user from their personal details */
        displayName: PropTypes.string,

        /** Primary login of the current user */
        login: PropTypes.string,
    }),

    /** List of reports */
    reports: PropTypes.objectOf(PropTypes.shape({
        reportID: PropTypes.number,
        participants: PropTypes.arrayOf(PropTypes.string),
    })),
};
const defaultProps = {
    myPersonalDetails: {},
    reports: {},
};

class RequestCallPage extends React.Component {
    constructor(props) {
        super(props);

        // The displayName defaults to the user's login if they haven't set a first and last name,
        // which we can't use to prefill the input fields
        const [firstName, lastName] = props.myPersonalDetails.displayName !== props.myPersonalDetails.login
            ? props.myPersonalDetails.displayName.split(' ')
            : [];
        this.state = {
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            phoneNumber: this.getPhoneNumber(props.user.loginList) ?? '',
            isLoading: false,
        };

        this.conciergeReport = _.find(
            this.props.reports,
            report => report.participants.length === 1 && report.participants[0] === CONST.EMAIL.CONCIERGE,
        );

        this.getPhoneNumber = this.getPhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.setState({isLoading: true});
        if (!this.state.firstName.length || !this.state.lastName.length) {
            Growl.show(this.props.translate('requestCallPage.growlMessageEmptyName'), CONST.GROWL.ERROR);
            this.setState({isLoading: false});
            return;
        }

        requestConciergeDMCall('', this.state.firstName, this.state.lastName, this.state.phoneNumber)
            .then((result) => {
                this.setState({isLoading: false});
                if (result.jsonCode === 200) {
                    Growl.show(this.props.translate('requestCallPage.growlMessageOnSave'), CONST.GROWL.SUCCESS);
                    Navigation.navigate(ROUTES.getReportRoute(this.conciergeReport.reportID));
                    return;
                }

                // Phone number validation is handled by the API
                Growl.show(result.message, CONST.GROWL.ERROR, 3000);
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

    render() {
        const isButtonDisabled = false;
        return (
            <ScreenWrapper>
                <HeaderWithCloseButton
                    title={this.props.translate('requestCallPage.requestACall')}
                    shouldShowBackButton
                    onBackButtonPress={() => Navigation.navigate(ROUTES.getReportRoute(this.conciergeReport.reportID))}
                    onCloseButtonPress={() => Navigation.dismissModal(true)}
                />
                <View style={[styles.flex1, styles.p5]}>
                    <Text style={[styles.mb4, styles.textP]}>
                        {this.props.translate('requestCallPage.description')}
                    </Text>
                    <Text style={[styles.mt4, styles.mb4, styles.textP]}>
                        {this.props.translate('requestCallPage.instructions')}
                    </Text>
                    <FullNameInputRow
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        onChangeFirstName={firstName => this.setState({firstName})}
                        onChangeLastName={lastName => this.setState({lastName})}
                        style={[styles.mt4, styles.mb4]}
                    />
                    <Text style={[styles.mt4, styles.formLabel]} numberOfLines={1}>
                        {this.props.translate('common.phoneNumber')}
                    </Text>
                    <TextInput
                        autoCompleteType="off"
                        autoCorrect={false}
                        style={[styles.textInput]}
                        value={this.state.phoneNumber}
                        placeholder="+14158675309"
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                    />
                </View>
                <FixedFooter>
                    <Button
                        success
                        isDisabled={isButtonDisabled}
                        onPress={this.onSubmit}
                        style={[styles.w100]}
                        text={this.props.translate('requestCallPage.callMe')}
                        isLoading={this.state.isLoading}
                    />
                </FixedFooter>
            </ScreenWrapper>
        );
    }
}

RequestCallPage.displayName = 'RequestCallPage';
RequestCallPage.propTypes = propTypes;
RequestCallPage.defaultProps = defaultProps;
export default compose(
    withLocalize,
    withOnyx({
        myPersonalDetails: {
            key: ONYXKEYS.MY_PERSONAL_DETAILS,
        },
        account: {
            key: ONYXKEYS.ACCOUNT,
        },
        session: {
            key: ONYXKEYS.SESSION,
        },
        reports: {
            key: ONYXKEYS.COLLECTION.REPORT,
        },
        user: {
            key: ONYXKEYS.USER,
        },
    }),
)(RequestCallPage);
