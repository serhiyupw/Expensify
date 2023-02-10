import ROUTES from '../../ROUTES';
import Permissions from '../../libs/Permissions';

/** @type {Array<object>} Routes regex used for desktop deeplinking */
export default [
    {
        // /reports/*
        pattern: `/${ROUTES.REPORT}($|(//*))`,
    },
    {
        // /settings/*
        pattern: `/${ROUTES.SETTINGS}($|(//*))`,
    },
    {
        // /setpassword/*
        pattern: '/setpassword($|(//*))',
    },
    {
        // /details/*
        pattern: `/${ROUTES.DETAILS}($|(//*))`,
    },
    {
        // /v/*
        pattern: '/v($|(//*))',
        // It was decided in the team to disable deep linking in desktop App when passwordless is enabled.
        // We want to open the magic link into its own tab
        isDisabled: betas => Permissions.canUsePasswordlessLogins(betas),
    },
    {
        // /bank-account/*
        pattern: `/${ROUTES.BANK_ACCOUNT}($|(//*))`,
    },
    {
        // /iou/*
        pattern: '/iou($|(//*))',
    },
    {
        // /enable-payments/*
        pattern: `/${ROUTES.ENABLE_PAYMENTS}($|(//*))`,
    },
    {
        // /statements/*
        pattern: '/statements($|(//*))',
    },
    {
        // /concierge/*
        pattern: `/${ROUTES.CONCIERGE}($|(//*))`,
    },
];

