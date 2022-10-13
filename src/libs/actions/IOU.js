import Onyx from 'react-native-onyx';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import CONST from '../../CONST';
import ONYXKEYS from '../../ONYXKEYS';
import ROUTES from '../../ROUTES';
import * as DeprecatedAPI from '../deprecatedAPI';
import * as Report from './Report';
import Navigation from '../Navigation/Navigation';
import Growl from '../Growl';
import * as Localize from '../Localize';
import asyncOpenURL from '../asyncOpenURL';
import Log from '../Log';
import * as API from '../API';
import * as ReportUtils from '../ReportUtils';
import * as IOUUtils from '../IOUUtils';
import * as OptionsListUtils from '../OptionsListUtils';

const iouReports = {};
Onyx.connect({
    key: ONYXKEYS.COLLECTION.REPORT_IOUS,
    callback: (iouReport, key) => {
        if (!iouReport || !key || !iouReport.ownerEmail) {
            return;
        }

        iouReports[key] = iouReport;
    },
});

/**
 * Gets the IOU Reports for new transaction
 *
 * @param {Object[]} requestParams
 * @param {Number} requestParams.reportID the ID of the IOU report
 * @param {Number} requestParams.chatReportID the ID of the chat report that the IOU report belongs to
 */
function getIOUReportsForNewTransaction(requestParams) {
    DeprecatedAPI.Get({
        returnValueList: 'reportStuff',
        reportIDList: _.pluck(requestParams, 'reportID').join(','),
        shouldLoadOptionalKeys: true,
        includePinnedReports: true,
    })
        .then((response) => {
            if (response.jsonCode !== 200) {
                Onyx.merge(ONYXKEYS.IOU, {error: true});
                return;
            }

            const chatReportsToUpdate = {};
            const iouReportsToUpdate = {};

            _.each(response.reports, (reportData) => {
                // First, the existing chat report needs to be updated with the details about the new IOU
                const paramsForIOUReport = _.findWhere(requestParams, {reportID: reportData.reportID});
                if (paramsForIOUReport && paramsForIOUReport.chatReportID) {
                    const chatReportID = paramsForIOUReport.chatReportID;
                    const chatReportKey = `${ONYXKEYS.COLLECTION.REPORT}${chatReportID}`;
                    chatReportsToUpdate[chatReportKey] = {
                        iouReportID: reportData.reportID,
                        total: reportData.total,
                        stateNum: reportData.stateNum,
                        hasOutstandingIOU: true,
                    };

                    // Second, the IOU report needs to be updated with the new IOU details too
                    const iouReportKey = `${ONYXKEYS.COLLECTION.REPORT_IOUS}${reportData.reportID}`;
                    iouReportsToUpdate[iouReportKey] = Report.getSimplifiedIOUReport(reportData, chatReportID);
                }
            });

            Onyx.mergeCollection(ONYXKEYS.COLLECTION.REPORT, chatReportsToUpdate);
            Onyx.mergeCollection(ONYXKEYS.COLLECTION.REPORT_IOUS, iouReportsToUpdate);
        })
        .finally(() => Onyx.merge(ONYXKEYS.IOU, {loading: false, creatingIOUTransaction: false}));
}

/**
 * Returns IOU Transaction Error Messages
 *
 * @param {Object} response
 * @returns {String}
 */
function getIOUErrorMessage(response) {
    if (response && response.jsonCode) {
        if (response.jsonCode === 405) {
            return Localize.translateLocal('common.error.invalidAmount');
        }

        if (response.jsonCode === 404) {
            return Localize.translateLocal('iou.error.invalidSplit');
        }

        if (response.jsonCode === 402) {
            return Localize.translateLocal('common.error.phoneNumber');
        }
    }
    return Localize.translateLocal('iou.error.other');
}

/**
 * @param {Object} response
 */
function processIOUErrorResponse(response) {
    Onyx.merge(ONYXKEYS.IOU, {
        loading: false,
        creatingIOUTransaction: false,
        error: true,
    });
    Growl.error(getIOUErrorMessage(response));
}

function startLoadingAndResetError() {
    Onyx.merge(ONYXKEYS.IOU, {loading: true, creatingIOUTransaction: true, error: false});
}

/**
 * Creates IOUSplit Transaction
 *
 * @param {Object} params
 * @param {Number} params.amount
 * @param {String} params.comment
 * @param {String} params.currency
 * @param {String} params.debtorEmail
 */
function createIOUTransaction(params) {
    startLoadingAndResetError();
    DeprecatedAPI.CreateIOUTransaction(params)
        .then((response) => {
            if (response.jsonCode !== 200) {
                processIOUErrorResponse(response);
                return;
            }

            getIOUReportsForNewTransaction([response]);
            Navigation.navigate(ROUTES.getReportRoute(response.chatReportID));
        });
}

/**
 * @param {Array} participants
 * @param {String} currentUserLogin
 * @param {Int} amount
 * @param {String} comment
 * @param {String} currency
 * @param {String} locale
 *
 * @return {Object}
 */
function createSplitsAndOnyxData(participants, currentUserLogin, amount, comment, currency, locale) {
    const currentUserEmail = OptionsListUtils.addSMSDomainIfPhoneNumber(currentUserLogin);

    // getChatByParticipants should be created in this PR https://github.com/Expensify/App/pull/11439/files
    // const existingGroupChatReport = ReportUtils.getChatByParticipants(participants);
    const existingGroupChatReport = false;
    const groupChatReport = existingGroupChatReport || ReportUtils.buildOptimisticChatReport(_.pluck(participants, 'login'));
    const groupCreatedReportAction = existingGroupChatReport ? {} : ReportUtils.buildOptimisticCreatedReportAction(currentUserEmail);
    const groupIOUReportAction = ReportUtils.buildOptimisticIOUReportAction(
        lodashGet(groupChatReport, 'maxSequenceNumber', 0) + 1,
        CONST.IOU.REPORT_ACTION_TYPE.SPLIT,
        Math.round(amount * 100),
        comment,
        participants,
    );

    const optimisticData = [
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT}${groupChatReport.reportID}`,
            value: {
                ...groupChatReport,
                pendingFields: {
                    createChat: existingGroupChatReport ? null : CONST.RED_BRICK_ROAD_PENDING_ACTION.ADD,
                },
            },
        },
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${groupChatReport.reportID}`,
            value: {
                ...groupCreatedReportAction,
                [groupIOUReportAction.sequenceNumber]: groupIOUReportAction,
            },
        },
    ];

    const successData = [
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT}${groupChatReport.reportID}`,
            value: {pendingFields: {createChat: null}},
        },
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${groupChatReport.reportID}`,
            value: {
                0: {pendingAction: null},
                [groupIOUReportAction.sequenceNumber]: {pendingAction: null},
            },
        },
    ];

    const failureData = [
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT}${groupChatReport.reportID}`,
            value: {pendingFields: {createChat: null}},
        },
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${groupChatReport.reportID}`,
            value: {
                0: {pendingAction: null},
                [groupIOUReportAction.sequenceNumber]: {pendingAction: null},
            },
        },
    ];

    // Loop through participants creating individual chats, iouReports and reportActionIDs as needed
    const splitAmount = IOUUtils.calculateAmount(participants, amount);
    const splits = [{email: currentUserEmail, amount: IOUUtils.calculateAmount(participants, amount, true)}];

    _.each(participants, (participant) => {
        const email = OptionsListUtils.addSMSDomainIfPhoneNumber(participant.login);
        if (email === currentUserEmail) {
            return;
        }

        // getChatByParticipants should be created in this PR https://github.com/Expensify/App/pull/11439/files
        // const existingOneOnOneChatReport = ReportUtils.getChatByParticipants([currentUserEmail, email]);
        const existingOneOnOneChatReport = false;
        const oneOnOneChatReport = existingOneOnOneChatReport || ReportUtils.buildOptimisticChatReport([email]);
        let oneOnOneIOUReport;
        if (oneOnOneChatReport.iouReportID) {
            oneOnOneIOUReport = iouReports[`${ONYXKEYS.COLLECTION.REPORT_IOUS}${oneOnOneChatReport.iouReportID}`];
            oneOnOneIOUReport.total += splitAmount;
        } else {
            oneOnOneIOUReport = ReportUtils.buildOptimisticIOUReport(
                currentUserEmail,
                email,
                splitAmount,
                oneOnOneChatReport.reportID,
                currency,
                locale,
            );
        }

        const oneOnOneCreatedReportAction = existingOneOnOneChatReport ? {} : ReportUtils.buildOptimisticCreatedReportAction(currentUserEmail);
        const oneOnOneIOUReportAction = ReportUtils.buildOptimisticIOUReportAction(
            lodashGet(oneOnOneChatReport, 'maxSequenceNumber', 0) + 1,
            CONST.IOU.REPORT_ACTION_TYPE.CREATE,
            splitAmount,
            comment,
            [participant],
            '',
            '',
            oneOnOneIOUReport.reportID,
        );

        optimisticData.push(
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT}${oneOnOneChatReport.reportID}`,
                value: {
                    ...oneOnOneChatReport,
                    pendingFields: {
                        createChat: existingOneOnOneChatReport ? null : CONST.RED_BRICK_ROAD_PENDING_ACTION.ADD,
                    },
                },
            },
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT_IOUS}${oneOnOneChatReport.reportID}`,
                value: oneOnOneIOUReport,
            },
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${oneOnOneChatReport.reportID}`,
                value: {
                    ...oneOnOneCreatedReportAction,
                    [oneOnOneIOUReportAction.sequenceNumber]: oneOnOneIOUReportAction,
                },
            },
        );

        successData.push(
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT}${oneOnOneChatReport.reportID}`,
                value: {pendingFields: {createChat: null}},
            },
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${oneOnOneChatReport.reportID}`,
                value: {
                    0: {pendingAction: null},
                    [oneOnOneIOUReportAction.sequenceNumber]: {pendingAction: null},
                },
            },
        );

        failureData.push(
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT}${oneOnOneChatReport.reportID}`,
                value: {pendingFields: {createChat: null}},
            },
            {
                onyxMethod: CONST.ONYX.METHOD.MERGE,
                key: `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${oneOnOneChatReport.reportID}`,
                value: {
                    0: {pendingAction: null},
                    [oneOnOneIOUReportAction.sequenceNumber]: {pendingAction: null},
                },
            },
        );

        splits.push({
            email,
            amount: splitAmount,
            iouReportID: oneOnOneIOUReport.reportID,
            chatReportID: oneOnOneChatReport.reportID,
            transactionID: oneOnOneIOUReportAction.originalMessage.IOUTransactionID,
            reportActionID: oneOnOneIOUReportAction.reportActionID,
        });
    });

    return {
        groupData: {
            chatReportID: groupChatReport.reportID,
            transactionID: groupIOUReportAction.originalMessage.IOUTransactionID,
            reportActionID: groupIOUReportAction.reportActionID,
        },
        splits,
        onyxData: {optimisticData, successData, failureData},
    };
}

/**
 * @param {Array} participants
 * @param {String} currentUserLogin
 * @param {Int} amount
 * @param {String} comment
 * @param {String} currency
 * @param {String} locale
 */
function splitBill(participants, currentUserLogin, amount, comment, currency, locale) {
    const {groupData, splits, onyxData} = createSplitsAndOnyxData(participants, currentUserLogin, amount, comment, currency, locale);

    API.write('SplitBill', {
        reportID: groupData.chatReportID,
        amount: Math.round(amount * 100),
        splits: JSON.stringify(splits),
        currency,
        comment,
        transactionID: groupData.transactionID,
        reportActionID: groupData.reportActionID,
    }, onyxData);

    Navigation.dismissModal();
}

/**
 * @param {Array} participants
 * @param {String} currentUserLogin
 * @param {Int} amount
 * @param {String} comment
 * @param {String} currency
 * @param {String} locale
 */
function splitBillAndOpenReport(participants, currentUserLogin, amount, comment, currency, locale) {
    const {groupData, splits, onyxData} = createSplitsAndOnyxData(participants, currentUserLogin, amount, comment, currency, locale);

    API.write('SplitBillAndOpenReport', {
        reportID: groupData.chatReportID,
        amount: Math.round(amount * 100),
        splits: JSON.stringify(splits),
        currency,
        comment,
        transactionID: groupData.transactionID,
        reportActionID: groupData.reportActionID,
    }, onyxData);

    Navigation.navigate(ROUTES.getReportRoute(groupData.chatReportID));
}

/**
 * Reject an iouReport transaction. Declining and cancelling transactions are done via the same Auth command.
 *
 * @param {Object} params
 * @param {Number} params.reportID
 * @param {Number} params.chatReportID
 * @param {String} params.transactionID
 * @param {String} params.comment
 */
function rejectTransaction({
    reportID, chatReportID, transactionID, comment,
}) {
    Onyx.merge(ONYXKEYS.TRANSACTIONS_BEING_REJECTED, {
        [transactionID]: true,
    });
    DeprecatedAPI.RejectTransaction({
        reportID,
        transactionID,
        comment,
    })
        .then((response) => {
            if (response.jsonCode !== 200) {
                Log.hmmm('Error rejecting transaction', {error: response.error});
                return;
            }

            const chatReport = response.reports[chatReportID];
            const iouReport = response.reports[reportID];
            Report.syncChatAndIOUReports(chatReport, iouReport);
        })
        .finally(() => {
            // Setting as null deletes the transactionID
            Onyx.merge(ONYXKEYS.TRANSACTIONS_BEING_REJECTED, {
                [transactionID]: null,
            });
        });
}

/**
 * Sets IOU'S selected currency
 *
 * @param {String} selectedCurrencyCode
 */
function setIOUSelectedCurrency(selectedCurrencyCode) {
    Onyx.merge(ONYXKEYS.IOU, {selectedCurrencyCode});
}

/**
 * @param {Number} amount
 * @param {String} submitterPayPalMeAddress
 * @param {String} currency
 * @returns {String}
 */
function buildPayPalPaymentUrl(amount, submitterPayPalMeAddress, currency) {
    return `https://paypal.me/${submitterPayPalMeAddress}/${(amount / 100)}${currency}`;
}

/**
 * Pays an IOU Report and then retrieves the iou and chat reports to trigger updates to the UI.
 *
 * @param {Object} params
 * @param {Number} params.chatReportID
 * @param {String} params.reportID
 * @param {String} params.paymentMethodType - one of CONST.IOU.PAYMENT_TYPE
 * @param {Number} params.amount
 * @param {String} params.currency
 * @param {String} [params.requestorPayPalMeAddress]
 * @param {String} [params.newIOUReportDetails] - Extra details required only for send money flow
 *
 * @return {Promise}
 */
function payIOUReport({
    chatReportID,
    reportID,
    paymentMethodType,
    amount,
    currency,
    requestorPayPalMeAddress,
    newIOUReportDetails,
}) {
    Onyx.merge(ONYXKEYS.IOU, {loading: true, error: false});

    const payIOUPromise = paymentMethodType === CONST.IOU.PAYMENT_TYPE.EXPENSIFY
        ? DeprecatedAPI.PayWithWallet({reportID, newIOUReportDetails})
        : DeprecatedAPI.PayIOU({reportID, paymentMethodType, newIOUReportDetails});

    // Build the url for Paypal.me if they have selected it instead of a manual settlement or Expensify Wallet
    let url;
    if (paymentMethodType === CONST.IOU.PAYMENT_TYPE.PAYPAL_ME) {
        url = buildPayPalPaymentUrl(amount, requestorPayPalMeAddress, currency);
    }

    const promiseWithHandlers = payIOUPromise
        .then((response) => {
            if (response.jsonCode !== 200) {
                switch (response.message) {
                    case 'You cannot pay via Expensify Wallet until you have either a verified deposit bank account or debit card.':
                        Growl.error(Localize.translateLocal('bankAccount.error.noDefaultDepositAccountOrDebitCardAvailable'), 5000);
                        break;
                    case 'This report doesn\'t have reimbursable expenses.':
                        Growl.error(Localize.translateLocal('iou.noReimbursableExpenses'), 5000);
                        break;
                    default:
                        Growl.error(response.message, 5000);
                }
                Onyx.merge(ONYXKEYS.IOU, {error: true});
                return;
            }

            const chatReportStuff = response.reports[chatReportID];
            const iouReportStuff = response.reports[reportID];
            Report.syncChatAndIOUReports(chatReportStuff, iouReportStuff);
        })
        .finally(() => {
            Onyx.merge(ONYXKEYS.IOU, {loading: false});
        });
    asyncOpenURL(promiseWithHandlers, url);
    return promiseWithHandlers;
}

export {
    createIOUTransaction,
    splitBill,
    splitBillAndOpenReport,
    rejectTransaction,
    payIOUReport,
    setIOUSelectedCurrency,
};
