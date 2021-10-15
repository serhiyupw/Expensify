/* eslint-disable max-len */
export default {
    common: {
        cancel: 'Cancel',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        attachment: 'Attachment',
        to: 'To',
        optional: 'Optional',
        new: 'NEW',
        search: 'Search',
        next: 'Next',
        goBack: 'Go back',
        add: 'Add',
        resend: 'Resend',
        save: 'Save',
        saveChanges: 'Save changes',
        password: 'Password',
        profile: 'Profile',
        payments: 'Payments',
        preferences: 'Preferences',
        view: 'View',
        not: 'Not',
        signIn: 'Sign in',
        continue: 'Continue',
        firstName: 'First name',
        lastName: 'Last name',
        phone: 'Phone',
        phoneNumber: 'Phone number',
        email: 'Email',
        and: 'and',
        details: 'Details',
        privacy: 'Privacy',
        privacyPolicy: 'Privacy policy',
        delete: 'Delete',
        deleted: 'deleted',
        contacts: 'Contacts',
        recents: 'Recents',
        close: 'Close',
        download: 'Download',
        pin: 'Pin',
        unPin: 'Unpin',
        back: 'Back',
        saveAndContinue: 'Save & continue',
        settings: 'Settings',
        termsOfService: 'Terms of service',
        members: 'Members',
        invite: 'Invite',
        here: 'here',
        dob: 'Date of birth',
        ssnLast4: 'Last 4 digits of SSN',
        personalAddress: 'Personal address',
        companyAddress: 'Company address',
        noPO: 'PO boxes and mail drop addresses are not allowed',
        city: 'City',
        state: 'State',
        zip: 'Zip code',
        isRequiredField: 'is a required field',
        whatThis: 'What\'s this?',
        iAcceptThe: 'I accept the ',
        remove: 'Remove',
        admin: 'Admin',
        dateFormat: 'YYYY-MM-DD',
        send: 'Send',
        notifications: 'Notifications',
        na: 'N/A',
        noResultsFound: 'No results found',
        timePrefix: 'It\'s',
        conjunctionFor: 'for',
        todayAt: 'Today at',
        tomorrowAt: 'Tomorrow at',
        yesterdayAt: 'Yesterday at',
        conjunctionAt: 'at',
        genericErrorMessage: 'Oops... something went wrong and your request could not be completed. Please try again later.',
        error: {
            invalidAmount: 'Invalid amount',
        },
        please: 'Please',
        contactUs: 'contact us',
        pleaseEnterEmailOrPhoneNumber: 'Please enter an email or phone number',
        fixTheErrors: 'fix the errors',
        inTheFormBeforeContinuing: 'in the form before continuing',
        confirm: 'Confirm',
        reset: 'Reset',
        done: 'Done',
    },
    attachmentPicker: {
        cameraPermissionRequired: 'Camera permission required',
        expensifyDoesntHaveAccessToCamera: 'This app does not have access to your camera, please enable the permission and try again.',
        attachmentError: 'Attachment error',
        errorWhileSelectingAttachment: 'An error occurred while selecting an attachment, please try again',
        errorWhileSelectingCorruptedImage: 'An error occurred while selecting a corrupted attachment, please try another file',
        takePhoto: 'Take photo',
        chooseFromGallery: 'Choose from gallery',
        chooseDocument: 'Choose document',
        attachmentTooLarge: 'Attachment too large',
        sizeExceeded: 'Attachment size is larger than 50 MB limit.',
    },
    textInputFocusable: {
        noExtentionFoundForMimeType: 'No extension found for mime type',
        problemGettingImageYouPasted: 'There was a problem getting the image you pasted',
    },
    baseUpdateAppModal: {
        updateApp: 'Update app',
        updatePrompt: 'A new version of this app is available.\nUpdate now or restart the app at a later time to download the latest changes.',
    },
    iOUConfirmationList: {
        whoPaid: 'WHO PAID?',
        whoWasThere: 'WHO WAS THERE?',
        whatsItFor: 'What\'s it for?',
    },
    iOUCurrencySelection: {
        selectCurrency: 'Select a currency',
        allCurrencies: 'ALL CURRENCIES',
    },
    optionsSelector: {
        nameEmailOrPhoneNumber: 'Name, email, or phone number',
    },
    videoChatButtonAndMenu: {
        tooltip: 'Start a Call',
        zoom: 'Zoom',
        googleMeet: 'Google Meet',
    },
    hello: 'Hello',
    phoneCountryCode: '1',
    welcomeText: {
        phrase1: 'Welcome to the New Expensify! Enter your phone number or email to continue.',
        phrase2: 'Money talks. And now that chat and payments are in one place, it\'s also easy.',
        phrase3: 'Your payments get to you as fast as you can get your point across.',
        phrase4: 'Welcome back to the New Expensify! Please enter your password.',
    },
    reportActionCompose: {
        addAction: 'Actions',
        sendAttachment: 'Send attachment',
        addAttachment: 'Add attachment',
        writeSomething: 'Write something...',
        blockedFromConcierge: 'Communication is barred',
        youAppearToBeOffline: 'You appear to be offline.',
        fileUploadFailed: 'Upload failed. File is not supported.',
        roomIsArchived: 'This chat room has been deleted',
        localTime: ({user, time}) => `It's ${time} for ${user}`,
        edited: '(edited)',
        emoji: 'Emoji',
    },
    reportActionContextMenu: {
        copyToClipboard: 'Copy to clipboard',
        copied: 'Copied!',
        copyLink: 'Copy link',
        copyURLToClipboard: 'Copy URL to clipboard',
        markAsUnread: 'Mark as unread',
        editComment: 'Edit comment',
        deleteComment: 'Delete comment',
        deleteConfirmation: 'Are you sure you want to delete this comment?',
    },
    reportActionsView: {
        beFirstPersonToComment: 'Be the first person to comment',
    },
    reportActionsViewMarkerBadge: {
        newMsg: ({count}) => `${count} new message${count > 1 ? 's' : ''}`,
    },
    reportTypingIndicator: {
        isTyping: 'is typing...',
        areTyping: 'are typing...',
        multipleUsers: 'Multiple users',
    },
    sidebarScreen: {
        fabAction: 'New chat',
        newChat: 'New chat',
        newGroup: 'New group',
        headerChat: 'Chats',
        buttonSearch: 'Search',
        buttonMySettings: 'My settings',
        fabNewChat: 'New chat(Floating Action)',
    },
    iou: {
        amount: 'Amount',
        participants: 'Participants',
        confirm: 'Confirm',
        splitBill: 'Split bill',
        requestMoney: 'Request money',
        sendMoney: 'Send money',
        pay: 'Pay',
        viewDetails: 'View details',
        settleExpensify: 'Pay with Expensify',
        settleElsewhere: 'I\'ll settle up elsewhere',
        decline: 'Decline',
        settlePaypalMe: 'Pay with PayPal.me',
        settleVenmo: 'Pay with Venmo',
        request: ({amount}) => `Request ${amount}`,
        owes: ({manager, owner}) => `${manager} owes ${owner}`,
        paid: ({owner, manager}) => `${manager} paid ${owner}`,
        split: ({amount}) => `Split ${amount}`,
        send: ({amount}) => `Send ${amount}`,
        choosePaymentMethod: 'Choose payment method:',
        noReimbursableExpenses: 'This report has an invalid amount',
        maxParticipantsReached: ({count}) => `You've selected the maximum number (${count}) of participants.`,
        error: {
            invalidSplit: 'Split amounts do not equal total amount',
            other: 'Unexpected error, please try again later',
        },
    },
    reportDetailsPage: {
        notificationPreferencesDescription: 'Notify me about new messages',
        always: 'Always',
        daily: 'Daily',
        mute: 'Mute',
    },
    loginField: {
        addYourPhoneToSettleViaVenmo: 'Add your phone number to settle up via Venmo.',
        numberHasNotBeenValidated: 'The number has not yet been validated. Click the button to resend the validation link via text.',
        useYourPhoneToSettleViaVenmo: 'Use your phone number to settle up via Venmo.',
        emailHasNotBeenValidated: 'The email has not yet been validated. Click the button to resend the validation link via text.',
    },
    avatarWithImagePicker: {
        uploadPhoto: 'Upload photo',
        removePhoto: 'Remove photo',
        editImage: 'Edit photo',
    },
    profilePage: {
        profile: 'Profile',
        tellUsAboutYourself: 'Tell us about yourself, we would love to get to know you!',
        john: 'John',
        doe: 'Doe',
        preferredPronouns: 'Preferred pronouns',
        selectYourPronouns: 'Select your pronouns',
        selfSelectYourPronoun: 'Self-select your pronoun',
        emailAddress: 'Email address',
        setMyTimezoneAutomatically: 'Set my timezone automatically',
        timezone: 'Timezone',
        growlMessageOnSave: 'Your profile was successfully saved',
    },
    addSecondaryLoginPage: {
        addPhoneNumber: 'Add phone number',
        addEmailAddress: 'Add email address',
        enterPreferredPhoneNumberToSendValidationLink: 'Enter your preferred phone number and password to send a validation link.',
        enterPreferredEmailToSendValidationLink: 'Enter your preferred email address and password to send a validation link.',
        sendValidation: 'Send validation',
    },
    initialSettingsPage: {
        about: 'About',
        aboutPage: {
            description: 'The New Expensify App is built by a community of open source developers from around the world. Help us build the future of Expensify.',
            appDownloadLinks: 'App download links',
            viewTheCode: 'View the code',
            viewOpenJobs: 'View open jobs',
            reportABug: 'Report a bug',
        },
        appDownloadLinks: {
            android: {
                label: 'Android',
            },
            ios: {
                label: 'iOS',
            },
            desktop: {
                label: 'Desktop',
            },
        },
        signOut: 'Sign out',
        versionLetter: 'v',
        changePassword: 'Change password',
        readTheTermsAndPrivacyPolicy: {
            phrase1: 'Read the',
            phrase2: 'terms of service',
            phrase3: 'and',
            phrase4: 'privacy policy',
        },
    },
    passwordPage: {
        changePassword: 'Change password',
        changingYourPasswordPrompt: 'Changing your password will update your password for both your Expensify.com\nand New Expensify accounts.',
        currentPassword: 'Current password',
        newPassword: 'New password',
        newPasswordPrompt: 'New password must be different than your old password, have at least 8 characters,\n1 capital letter, 1 lowercase letter, 1 number.',
        confirmNewPassword: 'Confirm new password',
    },
    addPayPalMePage: {
        enterYourUsernameToGetPaidViaPayPal: 'Enter your username to get paid back via PayPal.',
        payPalMe: 'PayPal.me/',
        yourPayPalUsername: 'Your PayPal username',
        addPayPalAccount: 'Add PayPal account',
        editPayPalAccount: 'Update PayPal account',
        growlMessageOnSave: 'Your PayPal username was successfully added',
    },
    addDebitCardPage: {
        addADebitCard: 'Add a Debit Card',
        nameOnCard: 'Name on Card',
        debitCardNumber: 'Debit Card Number',
        expiration: 'Expiration',
        expirationDate: 'MM/YYYY',
        cvv: 'CVV',
        billingAddress: 'Billing Address',
        streetAddress: 'Street Address',
        cityName: 'City Name',
        expensifyTermsOfService: 'Expensify Terms Of Service',
        growlMessageOnSave: 'Your debit card was successfully added',
        error: {
            invalidName: 'Please add a valid name',
            zipCode: 'Please enter a valid zip code',
            debitCardNumber: 'Please enter a valid debit card number',
            expirationDate: 'Please enter a valid expiration date',
            securityCode: 'Please enter a valid security code',
            address: 'Please enter a valid billing address',
            addressState: 'Please select a state',
            addressCity: 'Please enter a city',
            acceptedTerms: 'You must accept the Terms of Service to continue',
            genericFailureMessage: 'An error occurred while adding your card, please try again',
        },
    },
    paymentsPage: {
        paymentMethodsTitle: 'Payment methods',
    },
    paymentMethodList: {
        addPaymentMethod: 'Add payment method',
        accountLastFour: 'Account ending in',
        cardLastFour: 'Card ending in',
        addFirstPaymentMethod: 'Add a payment method to send and receive payments directly in the app.',
    },
    preferencesPage: {
        mostRecent: 'Most recent',
        mostRecentModeDescription: 'This will display all chats by default, sorted by most recent, with pinned items at the top.',
        focus: '#focus',
        focusModeDescription: '#focus – This will only display unread and pinned chats, all sorted alphabetically.',
        receiveRelevantFeatureUpdatesAndExpensifyNews: 'Receive relevant feature updates and Expensify news',
        priorityMode: 'Priority mode',
        language: 'Language',
        languages: {
            english: 'English',
            spanish: 'Spanish',
        },
    },
    signInPage: {
        expensifyDotCash: 'New Expensify',
        theCode: 'the code',
        openJobs: 'open jobs',
        heroHeading: 'Split bills\nand chat with friends.',
        heroDescription: {
            phrase1: 'Money talks. And now that chat and payments are in one place, it\'s also easy. Your payments get to you as fast as you can get your point across.',
            phrase2: 'The New Expensify is open source. View',
            phrase3: 'the code',
            phrase4: 'View',
            phrase5: 'open jobs',
        },
    },
    termsOfUse: {
        phrase1: 'By logging in, you agree to the',
        phrase2: 'terms of service',
        phrase3: 'and',
        phrase4: 'privacy policy',
        phrase5: 'Money transmission is provided by Expensify Payments LLC (NMLS',
        phrase6: 'ID:2017010) pursuant to its',
        phrase7: 'licenses',
    },
    passwordForm: {
        pleaseFillOutAllFields: 'Please fill out all fields',
        pleaseFillPassword: 'Please enter your password',
        pleaseFillTwoFactorAuth: 'Please enter your two factor code',
        enterYourTwoFactorAuthenticationCodeToContinue: 'Enter your two factor authentication code to continue',
        forgot: 'Forgot?',
        twoFactorCode: 'Two factor code',
        requiredWhen2FAEnabled: 'Required when 2FA is enabled',
        error: {
            incorrectLoginOrPassword: 'Incorrect login or password. Please try again.',
            twoFactorAuthenticationEnabled: 'You have 2FA enabled on this account. Please sign in using your email or phone number.',
            invalidLoginOrPassword: 'Invalid login or password. Please try again or reset your password.',
            unableToResetPassword: 'We were unable to change your password. This is likely due to an expired password reset link in an old password reset email. We have emailed you a new link so you can try again. Check your Inbox and your Spam folder; it should arrive in just a few minutes.',
            noAccess: 'You do not have access to this application. Please add your GitHub username for access.',
            accountLocked: 'Your account has been locked after too many unsuccessful attempts. Please try again after 1 hour.',
            fallback: 'Something went wrong. Please try again later.',
        },
    },
    loginForm: {
        phoneOrEmail: 'Phone or email',
        error: {
            invalidFormatLogin: 'The email or phone number entered is invalid. Please fix the format and try again.',
        },
    },
    resendValidationForm: {
        linkHasBeenResent: 'Link has been re-sent',
        weSentYouMagicSignInLink: ({login}) => `We've sent a magic sign in link to ${login}. Check your Inbox and your Spam folder and wait 5-10 minutes before trying again.`,
        resendLink: 'Resend link',
        unvalidatedAccount: 'This account exists but isn\'t validated, please check your inbox for your magic link.',
        newAccount: ({login, loginType}) => `Welcome ${login}, it's always great to see a new face around here! Please check your ${loginType} for a magic link to validate your account.`,
    },
    detailsPage: {
        localTime: 'Local time',
    },
    newGroupPage: {
        createGroup: 'Create group',
    },
    notFound: {
        chatYouLookingForCannotBeFound: 'The chat you are looking for cannot be found.',
        getMeOutOfHere: 'Get me out of here',
        iouReportNotFound: 'The payment details you are looking for cannot be found.',
    },
    setPasswordPage: {
        enterPassword: 'Enter a password',
        confirmNewPassword: 'Confirm the password',
        setPassword: 'Set password',
        passwordsDontMatch: 'Passwords must match',
        newPasswordPrompt: 'Your password must have at least 8 characters,\n1 capital letter, 1 lowercase letter, 1 number.',
        passwordFormTitle: 'Welcome back to the New Expensify! Please set your password.',
        passwordNotSet: 'We were unable to set your new password correctly.',
        accountNotValidated: 'We were unable to validate your account. The validation code may have expired.',
    },
    stepCounter: ({step, total}) => `Step ${step} of ${total}`,
    bankAccount: {
        accountNumber: 'Account number',
        routingNumber: 'Routing number',
        addBankAccount: 'Add bank account',
        chooseAnAccount: 'Choose an account',
        connectOnlineWithPlaid: 'Connect online with Plaid',
        connectManually: 'Connect manually',
        yourDataIsSecure: 'Your data is secure',
        toGetStarted: 'Add a bank account and issue corporate cards, reimburse expenses, collect invoice payments, and pay bills, all from one place.',
        plaidBodyCopy: 'Give your employees an easier way to pay - and get paid back - for company expenses.',
        checkHelpLine: 'Your routing number and account number can be found on a check for the account.',
        validateAccountError: 'In order to finish setting up your bank account, you must validate your account. Please check your email to validate your account, and return here to finish up!',
        hasPhoneLoginError: 'To add a verified bank account please ensure your primary login is a valid email and try again. You can add your phone number as a secondary login.',
        hasBeenThrottledError: 'There was an error adding your bank account. Please wait a few minutes and try again.',
        buttonConfirm: 'Got it',
        error: {
            noBankAccountAvailable: 'Sorry, no bank account is available',
            taxID: 'Please enter a valid Tax ID Number',
            website: 'Please enter a valid website',
            zipCode: 'Please enter a valid zip code',
            phoneNumber: 'Please enter a valid phone number',
            companyName: 'Please enter a valid legal business name',
            addressCity: 'Please enter a valid city',
            addressStreet: 'Please enter a valid street address that is not a PO Box',
            addressState: 'Please select a valid state',
            incorporationDate: 'Please enter a valid date',
            incorporationState: 'Please enter a valid state',
            industryCode: 'Please enter a valid industry classification code. Must be 6 digits.',
            restrictedBusiness: 'Please confirm company is not on the list of restricted businesses',
            routingNumber: 'Please enter a valid Routing Number',
            accountNumber: 'Please enter a valid Account Number',
            companyType: 'Please enter a valid Company Type',
            tooManyAttempts: 'Due to a high number of login attempts, this option has been temporarily disabled for 24 hours. Please try again later or manually enter details instead.',
            address: 'Please enter a valid address',
            dob: 'Please enter a valid date of birth',
            age: 'Must be over 18 years old',
            ssnLast4: 'Please enter valid last 4 digits of SSN',
            firstName: 'Please enter valid first name',
            lastName: 'Please enter valid last name',
            noDefaultDepositAccountOrDebitCardAvailable: 'Please add a default deposit bank account or debit card',
            validationAmounts: 'The validation amounts you entered are incorrect. Please double-check your bank statement and try again.',
        },
    },
    addPersonalBankAccountPage: {
        alreadyAdded: 'This account has already been added.',
        chooseAccountLabel: 'Account',
    },
    attachmentView: {
        unknownFilename: 'Unknown filename',
    },
    pronouns: {
        heHimHis: 'He/him',
        sheHerHers: 'She/her',
        theyThemTheirs: 'They/them',
        zeHirHirs: 'Ze/hir',
        selfSelect: 'Self-select',
        callMeByMyName: 'Call me by my name',
    },
    cameraPermissionsNotGranted: 'Camera permissions not granted',
    messages: {
        noPhoneNumber: 'Please enter a phone number including the country code e.g +447814266907',
        maxParticipantsReached: 'You\'ve reached the maximum number of participants for a group chat.',
    },
    onfidoStep: {
        acceptTerms: 'By continuing with the request to activate your Expensify wallet, you confirm that you have read, understand and accept ',
        facialScan: 'Onfido’s Facial Scan Policy and Release',
        tryAgain: 'Try again',
        verifyIdentity: 'Verify identity',
        genericError: 'There was an error while processing this step. Please try again.',
    },
    additionalDetailsStep: {
        headerTitle: 'Additional details',
        helpText: 'We need to confirm the following information before we can process this payment.',
        helpLink: 'Learn more about why we need this.',
        legalFirstNameLabel: 'Legal first name',
        legalMiddleNameLabel: 'Legal middle name',
        legalLastNameLabel: 'Legal last name',
    },
    termsStep: {
        headerTitle: 'Terms and fees',
        haveReadAndAgree: 'I have read and agree to receive ',
        electronicDisclosures: 'electronic disclosures',
        agreeToThe: 'I agree to the',
        walletAgreement: 'Wallet agreement',
        enablePayments: 'Enable payments',
        termsMustBeAccepted: 'Terms must be accepted',
        feeAmountZero: '$0',
        monthlyFee: 'Monthly fee',
        inactivity: 'Inactivity',
        electronicFundsInstantFee: '1.5%',
        electronicFundsInstantFeeMin: 'Min $0.25',
        noOverdraftOrCredit: 'No overdraft/credit feature.',
        electronicFundsWithdrawal: 'Electronic Funds Withdrawal',
        instant: 'Instant',
        standard: 'Standard',
        shortTermsForm: {
            expensifyPaymentsAccount: 'The Expensify Payments Account is issues by The Bancorp Bank.',
            perPurchase: 'Per purchase',
            atmWithdrawal: 'ATM withdrawal',
            cashReload: 'Cash reload',
            inNetwork: 'In-network',
            outOfNetwork: 'out-of-network',
            atmBalanceInquiry: 'ATM balance inquiry',
            inOrOutOfNetwork: 'In-network or out-of-network',
            customerService: 'Customer service',
            automatedOrLive: 'Automated or live agent',
            afterTwelveMonths: 'After 12 months with no transactions',
            weChargeOneFee: 'We charge 1 type of fee.',
            fdicInsurance: 'Your funds are eligible for FDIC insurance.',
            generalInfo: 'For general information about prepaid accounts, visit',
            conditionsDetails: 'Find details and conditions for all fees and services by visiting',
            conditionsPhone: 'or calling +1 833-400-0904.',
        },
        longTermsForm: {
            listOfAllFees: 'All Expensify Payments account fees:',
            typeOfFeeHeader: 'Type of fee',
            feeAmountHeader: 'Fee amount',
            moreDetailsHeader: 'More details',
            openingAccountTitle: 'Opening an account',
            openingAccountDetails: 'There is no fee to create an account.',
            monthlyFeeDetails: 'There is no monthly fee',
            customerServiceTitle: 'Customer service',
            customerServiceDetails: 'There are no customer service fees.',
            inactivityDetails: 'There is no inactivity fee.',
            sendingFundsTitle: 'Sending funds to another account holder',
            sendingFundsDetails: 'There is no fee to send funds to another account holder using your balance, '
                + 'bank account, or debit card.',
            electronicFundsStandardDetails: 'There is no fee to transfer funds from your Expensify Payments Account '
                + 'to your bank account using the standard option. This transfer usually completes within 1-3 business'
                + ' days.',
            electronicFundsInstantDetails: 'There is a fee to transfer funds from your Expensify Payments Account to '
                + 'your linked debit card using the instant transfer option. This transfer usually completes within'
                + 'several minutes. The fee is 1.5% of the transfer amount (with a minimum fee of $0.25).',
            fdicInsuranceBancorp: 'Your funds are eligible for FDIC insurance. Your funds will be held at or '
                + 'transferred to The Bancorp Bank, an FDIC-insured institution. Once there, your funds are insured up '
                + 'to $250,000 by the FDIC in the event The Bancorp Bank fails. See',
            fdicInsuranceBancorp2: 'for details.',
            contactExpensifyPayments: 'Contact Expensify Payments by calling +1 833-400-0904, by email at',
            contactExpensifyPayments2: 'or sign in at',
            generalInformation: 'For general information about prepaid accounts, visit',
            generalInformation2: 'If you have a complaint about a prepaid account, call the Consumer Financial '
                + 'Protection Bureau at 1-855-411-2372 or visit',
            printerFriendlyView: 'View printer-friendly version',
            automated: 'Automated',
            liveAgent: 'Live Agent',
        },
    },
    activateStep: {
        headerTitle: 'Enable payments',
        activated: 'Your Expensify Wallet is ready to use.',
        checkBackLater: 'We\'re still reviewing your information. Please check back later.',
    },
    companyStep: {
        headerTitle: 'Company information',
        subtitle: 'Almost done! For security purposes, we need to confirm some information:',
        legalBusinessName: 'Legal business name',
        companyWebsite: 'Company website',
        taxIDNumber: 'Tax ID number',
        taxIDNumberPlaceholder: '9 digits, no hyphens',
        companyType: 'Company type',
        incorporationDate: 'Incorporation date',
        incorporationState: 'Incorporation state',
        industryClassificationCode: 'Industry classification code',
        confirmCompanyIsNot: 'I confirm that this company is not on the',
        listOfRestrictedBusinesses: 'list of restricted businesses',
        incorporationDatePlaceholder: 'Start date (yyyy-mm-dd)',
        companyPhonePlaceholder: 'Phone Number (xxx)xxx-xxxx',
    },
    requestorStep: {
        headerTitle: 'Personal information',
        subtitle: 'Please provide your personal information.',
        learnMore: 'Learn more',
        isMyDataSafe: 'Is my data safe?',
        onFidoConditions: 'By continuing with the request to add this bank account, you confirm that you have read, understand and accept ',
        onFidoFacialScan: 'Onfido’s Facial Scan Policy and Release',
        isControllingOfficer: 'I am authorized to use my company bank account for business spend',
        isControllingOfficerError: 'You must be a controlling officer with authorization to operate the business bank account.',
    },
    validationStep: {
        headerTitle: 'Validate',
        buttonText: 'Finish setup',
        maxAttemptsReached: 'Validation for this bank account has been disabled due to too many incorrect attempts.',
        description: 'A day or two after you add your account to Expensify we send three (3) transactions to your account. They have a merchant line like "Expensify, Inc. Validation"',
        descriptionCTA: 'Please enter each transaction amount in the fields below. Example: 1.51',
        reviewingInfo: 'Thanks! We\'re reviewing your information, and will be in touch shortly. Please check your chat with Concierge ',
        forNextSteps: ' for next steps to finish setting up your bank account.',
        letsChatCTA: 'Yes, let\'s chat!',
        letsChatText: 'Thanks for doing that! We have a couple more things to work out, but it’ll be easier over chat. Ready to chat?',
        letsChatTitle: 'Let\'s chat!',
    },
    beneficialOwnersStep: {
        additionalInformation: 'Additional information',
        checkAllThatApply: 'Check all that apply, otherwise leave blank.',
        iOwnMoreThan25Percent: 'I own more than 25% of ',
        someoneOwnsMoreThan25Percent: 'Somebody else owns more than 25% of ',
        additionalOwner: 'Additional beneficial owner',
        removeOwner: 'Remove this beneficial owner',
        addAnotherIndividual: 'Add another individual who owns more than 25% of ',
        agreement: 'Agreement:',
        termsAndConditions: 'terms and conditions',
        certifyTrueAndAccurate: 'I certify that the information provided is true and accurate',
        error: {
            termsAndConditions: 'Must accept terms and conditions',
            certify: 'Must certify information is true and accurate',
        },
    },
    reimbursementAccountLoadingAnimation: {
        oneMoment: 'One Moment',
        explanationLine: 'We’re taking a look at your information. You will be able to continue with next steps shortly.',
    },
    session: {
        offlineMessageRetry: 'Looks like you\'re offline. Please check your connection and try again.',
        offlineMessage: 'Looks like you\'re offline.',
    },
    workspace: {
        common: {
            card: 'Issue corporate cards',
            workspace: 'Workspace',
            settings: 'General settings',
            reimburse: 'Reimburse receipts',
            bills: 'Pay bills',
            invoices: 'Send invoices',
            travel: 'Book travel',
            members: 'Manage members',
            bankAccount: 'Connect bank account',
            issueAndManageCards: 'Issue and manage cards',
            reconcileCards: 'Reconcile cards',
            growlMessageOnSave: 'Your workspace settings were successfully saved!',
        },
        new: {
            newWorkspace: 'New workspace',
            getTheExpensifyCardAndMore: 'Get the Expensify Card and more',
            genericFailureMessage: 'An error occurred creating the workspace, please try again.',
        },
        people: {
            genericFailureMessage: 'An error occurred removing a user from the workspace, please try again.',
            removeMembersPrompt: 'Are you sure you want to remove the selected members from your workspace?',
            removeMembersTitle: 'Remove members',
            selectAll: 'Select all',
            error: {
                cannotRemove: 'You cannot remove yourself or the workspace owner.',
            },
        },
        card: {
            header: 'Unlock free Expensify Cards',
            headerWithEcard: 'Cards are ready!',
            noVBACopy: 'Connect a bank account to issue unlimited Expensify Cards for your workspace members and access all of these incredible benefits:',
            VBANoECardCopy: 'Add a work email address to issue unlimited Expensify Cards for your workspace members, as well as all of these incredible benefits:',
            conciergeCanHelp: 'Concierge can help you add a work email address to enable the Expensify Card.',
            VBAWithECardCopy: 'Enjoy all these incredible benefits:',
            benefit1: 'Up to 2% cash back',
            benefit2: 'Digital and physical cards',
            benefit3: 'No personal liability',
            benefit4: 'Customizable limits',
            chatWithConcierge: 'Chat with Concierge',
        },
        reimburse: {
            captureReceipts: 'Capture receipts',
            fastReimbursementsHappyMembers: 'Fast reimbursements = happy members!',
            viewAllReceipts: 'View all receipts',
            reimburseReceipts: 'Reimburse receipts',
            unlockNextDayReimbursements: 'Unlock next-day reimbursements',
            captureNoVBACopyBeforeEmail: 'Ask your workspace members to forward receipts to ',
            captureNoVBACopyAfterEmail: ' and download the Expensify App to track cash expenses on the go.',
            unlockNoVBACopy: 'Connect a bank account to reimburse your workspace members online.',
            fastReimbursementsVBACopy: 'You\'re all set to reimburse receipts from your bank account!',
        },
        bills: {
            manageYourBills: 'Manage your bills',
            askYourVendorsBeforeEmail: 'Ask your vendors to forward their invoices to ',
            askYourVendorsAfterEmail: ' and we\'ll scan them for you to pay.',
            viewAllBills: 'View all bills',
            unlockOnlineBillPayment: 'Unlock online bill payment',
            unlockNoVBACopy: 'Connect your bank account to pay bills online for free!',
            hassleFreeBills: 'Hassle-free bills!',
            VBACopy: 'You\'re all set to make payments from your bank account!',
        },
        invoices: {
            invoiceClientsAndCustomers: 'Invoice clients and customers',
            invoiceFirstSectionCopy: 'Send beautiful, professional invoices directly to your clients and customers right from within the Expensify app.',
            viewAllInvoices: 'View all invoices',
            unlockOnlineInvoiceCollection: 'Unlock online invoice collection',
            unlockNoVBACopy: 'Connect your bank account to accept online payments for invoices - by ACH or credit card - to be deposited straight into your account.',
            moneyBackInAFlash: 'Money back, in a flash!',
            unlockVBACopy: 'You\'re all set to accept payments by ACH or credit card!',
            viewUnpaidInvoices: 'View unpaid invoices',
            sendInvoice: 'Send invoice',
        },
        travel: {
            unlockConciergeBookingTravel: 'Unlock Concierge travel booking',
            noVBACopy: 'Connect your bank account to let workspace members book their flights, hotels, and cars by starting a chat with Concierge.',
            packYourBags: 'Pack your bags!',
            VBACopy: 'Members with the Expensify card can chat with Concierge to book travel!',
            bookTravelWithConcierge: 'Book travel with Concierge',
        },
        invite: {
            invitePeople: 'Invite new members',
            invitePeoplePrompt: 'Invite new members to your workspace.',
            personalMessagePrompt: 'Add a personal message (optional)',
            pleaseSelectUser: 'Please select a user from contacts.',
            genericFailureMessage: 'An error occurred inviting the user to the workspace, please try again.',
            welcomeNote: ({workspaceName}) => `You have been invited to ${workspaceName}! Download the Expensify mobile app to start tracking your expenses.`,
        },
        editor: {
            nameInputLabel: 'Name',
            nameInputHelpText: 'This is the name you will see on your workspace.',
            nameIsRequiredError: 'You need to define a name for your workspace',
            currencyInputLabel: 'Default currency',
            currencyInputHelpText: 'All expenses on this workspace will be converted to this currency.',
            save: 'Save',
            genericFailureMessage: 'An error occurred updating the workspace, please try again.',
            avatarUploadFailureMessage: 'An error occurred uploading the avatar, please try again.',
        },
        bankAccount: {
            continueWithSetup: 'Continue with setup',
            youreAlmostDone: 'You\'re almost done setting up your bank account, which will let you issue corporate cards, reimburse expenses, collect invoices, and pay bills all from the same bank account.',
            streamlinePayments: 'Streamline payments',
            oneMoreThing: 'One more thing!',
            allSet: 'You\'re all set!',
            accountDescriptionNoCards: 'This bank account will be used to reimburse expenses, collect invoices, and pay bills all from the same account.\n\nConcierge can help you add a work email address to enable the Expensify Card.',
            accountDescriptionWithCards: 'This bank account will be used to issue corporate cards, reimburse expenses, collect invoices, and pay bills all from the same account.',
            chatWithConcierge: 'Chat with Concierge',
            letsFinishInChat: 'Let\'s finish in chat!',
            almostDone: 'Almost done!',
        },
    },
    requestCallPage: {
        title: 'Request a call',
        subtitle: 'Have questions, or need help?',
        description: 'Our team of guides are on hand to help you each step of the way. Type in your name and phone number, and we’ll give you a call back.',
        callMe: 'Call me',
        growlMessageOnSave: 'Call requested.',
        errorMessageInvalidPhone: 'That doesn’t look like a valid phone number. Try again with the country code. e.g. +15005550006',
        growlMessageEmptyName: 'Please provide both a first and last name so our guides know how to address you!',
        growlMessageNoPersonalPolicy: 'I wasn’t able to find a personal policy to associate this Guides call with, please check your connection and try again.',
        callButton: 'Call',
        callButtonTooltip: 'Get live help from our team',
    },
    emojiPicker: {
        skinTonePickerLabel: 'Change default skin tone',
    },
};
