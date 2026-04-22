import { RoleConfig } from "../types";

export const roleConfig: Record<string, RoleConfig> = {
  admin: {
    showSocialSignup: false,
    showForgotPassword: false,
  },
  user: {
    showSocialSignup: true,
    showForgotPassword: true,
  },
  recruiter: {
    showSocialSignup: false,
    showForgotPassword: true,
  },
};
