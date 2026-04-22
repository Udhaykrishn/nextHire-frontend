export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    USER_LOGIN: "/user/auth/login",
    USER_SIGNUP: "/user/auth/signup",
    RECRUITER_LOGIN: "/recruiter/auth/login",
    RECRUITER_SIGNUP: "/recruiter/auth/signup",
    ADMIN_LOGIN: "/admin/auth/login",
  },
  PROTECTED: {
    USER_DASHBOARD: "/users/dashboard",
    RECRUITER_DASHBOARD: "/recruiter/dashboard",
    ADMIN_DASHBOARD: "/admin/dashboard",
  },
} as const;

const getEnvValue = (key: string, defaultValue: string) => process.env[key] || defaultValue;

export const COOKIE_NAMES = {
  at: getEnvValue("NEXT_PUBLIC_COOKIE_ACCESS_TOKEN", "accessToken"),
  sid: getEnvValue("NEXT_PUBLIC_COOKIE_SESSION_ID", "session_id"),
} as const;
