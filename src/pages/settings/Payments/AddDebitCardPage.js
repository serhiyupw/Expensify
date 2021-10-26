import React, {Component} from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import lodashGet from 'lodash/get';
import _ from 'underscore';
import Onyx, {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import HeaderWithCloseButton from '../../../components/HeaderWithCloseButton';
import Navigation from '../../../libs/Navigation/Navigation';
import ScreenWrapper from '../../../components/ScreenWrapper';
import styles from '../../../styles/styles';
import StatePicker from '../../../components/StatePicker';
import Text from '../../../components/Text';
import TextLink from '../../../components/TextLink';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import {addBillingCard} from '../../../libs/actions/PaymentMethods';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
import {
    isValidAddress, isValidExpirationDate, isValidZipCode, isValidDebitCard, isValidSecurityCode,
} from '../../../libs/ValidationUtils';
import CheckboxWithLabel from '../../../components/CheckboxWithLabel';
import ExpensiTextInput from '../../../components/ExpensiTextInput';
import CONST from '../../../CONST';
import FormAlertWithSubmitButton from '../../../components/FormAlertWithSubmitButton';
import ONYXKEYS from '../../../ONYXKEYS';
import compose from '../../../libs/compose';

const propTypes = {
    addDebitCardForm: PropTypes.shape({
        /** Error message from API call */
        error: PropTypes.string,

        /** Whether or not the form is submitting */
        submitting: PropTypes.bool,
    }),

    /* Onyx Props */
    ...withLocalizePropTypes,
};

const defaultProps = {
    addDebitCardForm: {
        error: '',
        submitting: false,
    },
};

class DebitCardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameOnCard: '',
            cardNumber: '',
            expirationDate: '',
            securityCode: '',
            billingAddress: '',
            city: '',
            selectedState: '',
            zipCode: '',
            acceptedTerms: false,
            errors: {},
            shouldShowAlertPrompt: false,
        };

        this.requiredFields = [
            'nameOnCard',
            'cardNumber',
            'expirationDate',
            'securityCode',
            'billingAddress',
            'city',
            'selectedState',
            'zipCode',
            'acceptedTerms',
        ];

        // Map a field to the key of the error's translation
        this.errorTranslationKeys = {
            nameOnCard: 'addDebitCardPage.error.invalidName',
            cardNumber: 'addDebitCardPage.error.debitCardNumber',
            expirationDate: 'addDebitCardPage.error.expirationDate',
            securityCode: 'addDebitCardPage.error.securityCode',
            billingAddress: 'addDebitCardPage.error.address',
            city: 'addDebitCardPage.error.addressCity',
            selectedState: 'addDebitCardPage.error.addressState',
            zipCode: 'addDebitCardPage.error.zipCode',
            acceptedTerms: 'addDebitCardPage.error.acceptedTerms',
        };

        this.updateExpirationDate = this.updateExpirationDate.bind(this);
        this.submit = this.submit.bind(this);
        this.clearErrorAndSetValue = this.clearErrorAndSetValue.bind(this);
        this.getErrorText = this.getErrorText.bind(this);
    }

    /**
     * Make sure we reset the onyx values so old errors don't show if this form is displayed later
     */
    componentWillUnmount() {
        Onyx.set(ONYXKEYS.ADD_DEBIT_CARD_PAGE, {
            submitting: false,
            error: '',
        });
    }

    /**
     * @param {String} inputKey
     * @returns {String}
     */
    getErrorText(inputKey) {
        if (!lodashGet(this.state.errors, inputKey, false)) {
            return '';
        }

        return this.props.translate(this.errorTranslationKeys[inputKey]);
    }

    /**
     * Automatically adds the / character while the user is typing expiration date
     *
     * @param {String} expirationDate
     */
    updateExpirationDate(expirationDate) {
        let newExpirationDate = expirationDate;
        const isErasing = expirationDate.length < this.state.expirationDate.length;
        if (expirationDate.length === 2 && !isErasing) {
            newExpirationDate = `${expirationDate}/`;
        }

        this.clearErrorAndSetValue('expirationDate', newExpirationDate);
    }

    /**
     * @returns {Boolean}
     */
    validate() {
        const errors = {};
        if (_.isEmpty(this.state.nameOnCard.trim())) {
            errors.nameOnCard = true;
        }

        if (!isValidDebitCard(this.state.cardNumber.replace(/ /g, ''))) {
            errors.cardNumber = true;
        }

        if (!isValidExpirationDate(this.state.expirationDate)) {
            errors.expirationDate = true;
        }

        if (!isValidSecurityCode(this.state.securityCode)) {
            errors.securityCode = true;
        }

        if (!isValidAddress(this.state.billingAddress)) {
            errors.billingAddress = true;
        }

        if (_.isEmpty(this.state.city.trim())) {
            errors.city = true;
        }

        if (_.isEmpty(this.state.selectedState.trim())) {
            errors.selectedState = true;
        }

        if (!isValidZipCode(this.state.zipCode)) {
            errors.zipCode = true;
        }

        if (!this.state.acceptedTerms) {
            errors.acceptedTerms = true;
        }

        const hasErrors = _.size(errors) > 0;
        this.setState({
            errors,
            shouldShowAlertPrompt: hasErrors,
        });
        return !hasErrors;
    }

    submit() {
        if (!this.validate()) {
            return;
        }
        Onyx.merge(ONYXKEYS.ADD_DEBIT_CARD_PAGE, {submitting: true});
        addBillingCard(this.state);
    }

    /**
     * Clear the error associated to inputKey if found and store the inputKey new value in the state.
     *
     * @param {String} inputKey
     * @param {String} value
     */
    clearErrorAndSetValue(inputKey, value) {
        this.setState(prevState => ({
            [inputKey]: value,
            errors: {
                ...prevState.errors,
                [inputKey]: false,
            },
        }));
    }

    render() {
        return (
            <ScreenWrapper>
                <KeyboardAvoidingView>
                    <HeaderWithCloseButton
                        title={this.props.translate('addDebitCardPage.addADebitCard')}
                        shouldShowBackButton
                        onBackButtonPress={() => Navigation.goBack()}
                        onCloseButtonPress={() => Navigation.dismissModal(true)}
                    />
                    <ScrollView
                        style={[styles.w100, styles.flex1]}
                        contentContainerStyle={styles.flexGrow1}
                        keyboardShouldPersistTaps="handled"
                        ref={el => this.form = el}
                    >
                        <View style={[styles.mh5, styles.mb5]}>
                            <ExpensiTextInput
                                label={this.props.translate('addDebitCardPage.nameOnCard')}
                                onChangeText={nameOnCard => this.clearErrorAndSetValue('nameOnCard', nameOnCard)}
                                value={this.state.nameOnCard}
                                errorText={this.getErrorText('nameOnCard')}
                            />
                            <ExpensiTextInput
                                label={this.props.translate('addDebitCardPage.debitCardNumber')}
                                containerStyles={[styles.mt4]}
                                onChangeText={cardNumber => this.clearErrorAndSetValue('cardNumber', cardNumber)}
                                value={this.state.cardNumber}
                                errorText={this.getErrorText('cardNumber')}
                                keyboardType={CONST.KEYBOARD_TYPE.NUMBER_PAD}
                            />
                            <View style={[styles.flexRow, styles.mt4]}>
                                <View style={[styles.flex1, styles.mr2]}>
                                    <ExpensiTextInput
                                        label={this.props.translate('addDebitCardPage.expiration')}
                                        placeholder={this.props.translate('addDebitCardPage.expirationDate')}
                                        onChangeText={expirationDate => this.updateExpirationDate(expirationDate)}
                                        value={this.state.expirationDate}
                                        errorText={this.getErrorText('expirationDate')}
                                        keyboardType={CONST.KEYBOARD_TYPE.PHONE_PAD}
                                    />
                                </View>
                                <View style={[styles.flex1]}>
                                    <ExpensiTextInput
                                        label={this.props.translate('addDebitCardPage.cvv')}
                                        onChangeText={securityCode => this.clearErrorAndSetValue('securityCode', securityCode)}
                                        value={this.state.securityCode}
                                        errorText={this.getErrorText('securityCode')}
                                    />
                                </View>
                            </View>
                            <ExpensiTextInput
                                label={this.props.translate('addDebitCardPage.billingAddress')}
                                containerStyles={[styles.mt4]}
                                onChangeText={billingAddress => this.clearErrorAndSetValue('billingAddress', billingAddress)}
                                value={this.state.billingAddress}
                                errorText={this.getErrorText('billingAddress')}
                            />
                            <ExpensiTextInput
                                label={this.props.translate('common.city')}
                                containerStyles={[styles.mt4]}
                                onChangeText={city => this.clearErrorAndSetValue('city', city)}
                                value={this.state.city}
                                errorText={this.getErrorText('city')}
                            />
                            <View style={[styles.flexRow, styles.mt4]}>
                                <View style={[styles.flex1, styles.mr2]}>
                                    <StatePicker
                                        label={this.props.translate('common.state')}
                                        onChange={selectedState => this.clearErrorAndSetValue('selectedState', selectedState)}
                                        value={this.state.selectedState}
                                        hasError={Boolean(this.state.errors.selectedState)}
                                        errorText={this.getErrorText('selectedState')}
                                    />
                                </View>
                                <View style={[styles.flex1]}>
                                    <ExpensiTextInput
                                        label={this.props.translate('common.zip')}
                                        onChangeText={zipCode => this.clearErrorAndSetValue('zipCode', zipCode)}
                                        value={this.state.zipCode}
                                        errorText={this.getErrorText('zipCode')}
                                        keyboardType={CONST.KEYBOARD_TYPE.NUMERIC}
                                    />
                                </View>
                            </View>
                            <CheckboxWithLabel
                                isChecked={this.state.acceptedTerms}
                                onPress={() => {
                                    this.setState(prevState => ({
                                        acceptedTerms: !prevState.acceptedTerms,
                                        errors: {
                                            ...prevState.errors,
                                            acceptedTerms: false,
                                        },
                                    }));
                                }}
                                LabelComponent={() => (
                                    <>
                                        <Text>{`${this.props.translate('common.iAcceptThe')}`}</Text>
                                        <TextLink href="https://use.expensify.com/terms">
                                            {`${this.props.translate('addDebitCardPage.expensifyTermsOfService')}`}
                                        </TextLink>
                                    </>
                                )}
                                style={[styles.mt4, styles.mb4]}
                                errorText={this.getErrorText('acceptedTerms')}
                                hasError={Boolean(this.state.errors.acceptedTerms)}
                            />
                        </View>
                        {!_.isEmpty(this.props.addDebitCardForm.error) && (
                            <View style={[styles.mh5, styles.mb5]}>
                                <Text style={[styles.formError]}>
                                    {this.props.addDebitCardForm.error}
                                </Text>
                            </View>
                        )}
                        <FormAlertWithSubmitButton
                            isAlertVisible={this.state.shouldShowAlertPrompt}
                            buttonText={this.props.translate('common.save')}
                            onSubmit={this.submit}
                            onFixTheErrorsLinkPressed={() => {
                                this.form.scrollTo({y: 0, animated: true});
                            }}
                            isLoading={this.props.addDebitCardForm.submitting}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenWrapper>
        );
    }
}

DebitCardPage.propTypes = propTypes;
DebitCardPage.defaultProps = defaultProps;

export default compose(
    withOnyx({
        addDebitCardForm: {
            key: ONYXKEYS.ADD_DEBIT_CARD_PAGE,
        },
    }),
    withLocalize,
)(DebitCardPage);
