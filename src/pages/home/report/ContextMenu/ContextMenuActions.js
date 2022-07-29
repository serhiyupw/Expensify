import _ from 'underscore';
import ExpensiMark from 'expensify-common/lib/ExpensiMark';
import lodashGet from 'lodash/get';
import * as Expensicons from '../../../../components/Icon/Expensicons';
import * as Report from '../../../../libs/actions/Report';
import Clipboard from '../../../../libs/Clipboard';
import * as ReportUtils from '../../../../libs/ReportUtils';
import ReportActionComposeFocusManager from '../../../../libs/ReportActionComposeFocusManager';
import {hideContextMenu, showDeleteModal} from './ReportActionContextMenu';
import CONST from '../../../../CONST';
import getAttachmentDetails from '../../../../libs/fileDownload/getAttachmentDetails';
import fileDownload from '../../../../libs/fileDownload';
import addEncryptedAuthTokenToURL from '../../../../libs/addEncryptedAuthTokenToURL';
import * as ContextMenuUtils from './ContextMenuUtils';
import * as Environment from '../../../../libs/Environment/Environment';
import Permissions from '../../../../libs/Permissions';

/**
 * Gets the HTML version of the message in an action.
 * @param {Object} reportAction
 * @return {String}
 */
function getActionText(reportAction) {
    const message = _.last(lodashGet(reportAction, 'message', null));
    return lodashGet(message, 'html', '');
}

const CONTEXT_MENU_TYPES = {
    LINK: 'LINK',
    REPORT_ACTION: 'REPORT_ACTION',
    EMAIL: 'EMAIL',
};

// A list of all the context actions in this menu.
export default [
    {
        textTranslateKey: 'common.download',
        icon: Expensicons.Download,
        successTextTranslateKey: 'common.download',
        successIcon: Expensicons.Download,
        shouldShow: (type, reportAction) => {
            const message = _.last(lodashGet(reportAction, 'message', [{}]));
            const isAttachment = _.has(reportAction, 'isAttachment')
                ? reportAction.isAttachment
                : ReportUtils.isReportMessageAttachment(message);
            return isAttachment && reportAction.reportActionID;
        },
        onPress: (closePopover, {reportAction}) => {
            const message = _.last(lodashGet(reportAction, 'message', [{}]));
            const html = lodashGet(message, 'html', '');
            const attachmentDetails = getAttachmentDetails(html);
            const {originalFileName} = attachmentDetails;
            let {sourceURL} = attachmentDetails;
            sourceURL = addEncryptedAuthTokenToURL(sourceURL);
            fileDownload(sourceURL, originalFileName);
            if (closePopover) {
                hideContextMenu(true, ReportActionComposeFocusManager.focus);
            }
        },
        getDescription: () => {},
    },
    {
        textTranslateKey: 'reportActionContextMenu.copyURLToClipboard',
        icon: Expensicons.Clipboard,
        successTextTranslateKey: 'reportActionContextMenu.copied',
        successIcon: Expensicons.Checkmark,
        shouldShow: type => type === CONTEXT_MENU_TYPES.LINK,
        onPress: (closePopover, {selection}) => {
            Clipboard.setString(selection.text);
            hideContextMenu(true, ReportActionComposeFocusManager.focus);
        },
        getDescription: ContextMenuUtils.getPopoverDescription,
    },
    {
        textTranslateKey: 'reportActionContextMenu.copyEmailToClipboard',
        icon: Expensicons.Clipboard,
        successTextTranslateKey: 'reportActionContextMenu.copied',
        successIcon: Expensicons.Checkmark,
        shouldShow: type => type === CONTEXT_MENU_TYPES.EMAIL,
        onPress: (closePopover, {selection}) => {
            Clipboard.setString(selection.text.replace('mailto:', ''));
            hideContextMenu(true, ReportActionComposeFocusManager.focus);
        },
        getDescription: () => {},
    },
    {
        textTranslateKey: 'reportActionContextMenu.copyToClipboard',
        icon: Expensicons.Clipboard,
        successTextTranslateKey: 'reportActionContextMenu.copied',
        successIcon: Expensicons.Checkmark,
        shouldShow: (type, reportAction) => (type === CONTEXT_MENU_TYPES.REPORT_ACTION
            && reportAction.actionName !== CONST.REPORT.ACTIONS.TYPE.IOU
            && !ReportUtils.isReportMessageAttachment(lodashGet(reportAction, ['message', 0, 'text'], ''))),

        // If return value is true, we switch the `text` and `icon` on
        // `ContextMenuItem` with `successText` and `successIcon` which will fallback to
        // the `text` and `icon`
        onPress: (closePopover, {reportAction, selection}) => {
            const message = _.last(lodashGet(reportAction, 'message', [{}]));
            const messageHtml = lodashGet(message, 'html', '');

            const isAttachment = _.has(reportAction, 'isAttachment')
                ? reportAction.isAttachment
                : ReportUtils.isReportMessageAttachment(message);
            if (!isAttachment) {
                // This error indicates new code that uses the selection object incorrectly.
                if (selection && (selection.text || !selection.html)) {
                    throw new Error('Selection has to either exclusively bear html or be null.');
                }
                const resolvedSelection = selection || (messageHtml && {html: messageHtml});
                if (resolvedSelection) {
                    const parser = new ExpensiMark();
                    if (!Clipboard.canSetHtml()) {
                        Clipboard.setString(parser.htmlToMarkdown(resolvedSelection.html));
                    } else {
                        Clipboard.setHtml(resolvedSelection.html, parser.htmlToText(resolvedSelection.html));
                    }
                }
            } else {
                Clipboard.setString(messageHtml);
            }
            if (closePopover) {
                hideContextMenu(true, ReportActionComposeFocusManager.focus);
            }
        },
        getDescription: () => {},
    },

    {
        textTranslateKey: 'reportActionContextMenu.copyLink',
        icon: Expensicons.LinkCopy,
        shouldShow: (type, reportAction, betas) => Permissions.canUseCommentLinking(betas),
        onPress: (closePopover, {reportAction, reportID}) => {
            Environment.getEnvironmentURL()
                .then((environmentURL) => {
                    const reportActionID = parseInt(lodashGet(reportAction, 'reportActionID'), 10);
                    Clipboard.setString(`${environmentURL}/r/${reportID}/${reportActionID}`);
                });
            hideContextMenu(true, ReportActionComposeFocusManager.focus);
        },
        getDescription: () => {},
    },

    {
        textTranslateKey: 'reportActionContextMenu.markAsUnread',
        icon: Expensicons.Mail,
        successIcon: Expensicons.Checkmark,
        shouldShow: type => type === CONTEXT_MENU_TYPES.REPORT_ACTION,
        onPress: (closePopover, {reportAction, reportID}) => {
            Report.markCommentAsUnread(reportID, reportAction.sequenceNumber);
            if (closePopover) {
                hideContextMenu(true, ReportActionComposeFocusManager.focus);
            }
        },
        getDescription: () => {},
    },

    {
        textTranslateKey: 'reportActionContextMenu.editComment',
        icon: Expensicons.Pencil,
        shouldShow: (type, reportAction) => (
            type === CONTEXT_MENU_TYPES.REPORT_ACTION && ReportUtils.canEditReportAction(reportAction)
        ),
        onPress: (closePopover, {reportID, reportAction, draftMessage}) => {
            const editAction = () => Report.saveReportActionDraft(
                reportID,
                reportAction.reportActionID,
                _.isEmpty(draftMessage) ? getActionText(reportAction) : '',
            );

            if (closePopover) {
                // Hide popover, then call editAction
                hideContextMenu(false, editAction);
                return;
            }

            // No popover to hide, call editAction immediately
            editAction();
        },
        getDescription: () => {},
    },
    {
        textTranslateKey: 'reportActionContextMenu.deleteComment',
        icon: Expensicons.Trashcan,
        shouldShow: (type, reportAction) => type === CONTEXT_MENU_TYPES.REPORT_ACTION
            && ReportUtils.canDeleteReportAction(reportAction),
        onPress: (closePopover, {reportID, reportAction}) => {
            if (closePopover) {
                // Hide popover, then call showDeleteConfirmModal
                hideContextMenu(
                    false,
                    () => showDeleteModal(reportID, reportAction),
                );
                return;
            }

            // No popover to hide, call showDeleteConfirmModal immediately
            showDeleteModal(reportID, reportAction);
        },
        getDescription: () => {},
    },
];

export {
    CONTEXT_MENU_TYPES,
};
