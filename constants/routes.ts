export const ROUTES = {
    PUBLIC: {
        HOME: '/',
        USER_LOGIN: '/users/auth/login',
        USER_SIGNUP: '/users/auth/signup',
        RECRUITER_LOGIN: '/recruiter/auth/login',
        RECRUITER_SIGNUP: '/recruiter/auth/signup',
    },
    PROTECTED: {
        USER_DASHBOARD: '/users/dashboard',
        RECRUITER_DASHBOARD: '/recruiter/dashboard',
    },
} as const;

export const COOKIE_NAMES = {
    ACCESS_TOKEN: 'accessToken',
    SESSION_ID: 'session_id',
} as const;
