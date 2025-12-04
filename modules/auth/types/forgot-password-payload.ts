import { Role } from "./user-role";

export interface ForgotPasswordData {
  email: string;
  role: Role;
}
