export interface SocialLoginData {
  provider: string;
  role: string;
  userInfo?: Record<string, unknown>; // OAuth user data (email, name, picture, etc.)
}
