export interface SocialLoginData {
  provider: string;
  role: string;
  userInfo?: any; // OAuth user data (email, name, picture, etc.)
}