export const API_ROUTES = {
  AUTH: {
    USER: {
      LOGIN: "/auth/user/login",
      SIGNUP: "/auth/user/signup",
      LOGOUT: "/auth/user/logout",
      REFRESH: "/auth/user/refresh",
      GOOGLE: "/auth/user/google",
      OTP_VERIFY: "/auth/user/otp-verify",
      RESEND_OTP: "/auth/user/resend-otp",
      FORGOT_PASSWORD: "/auth/user/forgot-password",
      RESET_PASSWORD: "/auth/user/reset-password",
      VERIFY_RESET_TOKEN: "/auth/user/verify-reset-token",
    },
    RECRUITER: {
      LOGIN: "/auth/recruiter/login",
      SIGNUP: "/auth/recruiter/signup",
      LOGOUT: "/auth/recruiter/logout",
      REFRESH: "/auth/recruiter/refresh",
      GOOGLE: "/auth/recruiter/google",
      OTP_VERIFY: "/auth/recruiter/otp-verify",
      RESEND_OTP: "/auth/recruiter/resend-otp",
      FORGOT_PASSWORD: "/auth/recruiter/forgot-password",
      RESET_PASSWORD: "/auth/recruiter/reset-password",
      VERIFY_RESET_TOKEN: "/auth/recruiter/verify-reset-token",
    },
    ADMIN: {
      LOGIN: "/auth/admin/login",
      SIGNUP: "/auth/admin/signup",
      LOGOUT: "/auth/admin/logout",
      REFRESH: "/auth/admin/refresh",
      OTP_VERIFY: "/auth/admin/otp-verify",
      RESEND_OTP: "/auth/admin/resend-otp",
    },
  },
} as const;

export type ApiRoutes = typeof API_ROUTES;
