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

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  SESSION_ID: "session_id",
} as const;
