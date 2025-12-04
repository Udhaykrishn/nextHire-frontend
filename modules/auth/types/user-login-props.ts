import { ForgotPasswordData } from "./forgot-password-payload";
import { LoginFormData } from "./login-props.type";
import { SocialLoginData } from "./soical-login-props.type";

export interface UseLoginProps {
  role?: string;
  onLogin?: (data: LoginFormData) => void;
  onForgotPassword?: (data: ForgotPasswordData) => void;
  onSocialLogin?: (data: SocialLoginData) => void;
}
