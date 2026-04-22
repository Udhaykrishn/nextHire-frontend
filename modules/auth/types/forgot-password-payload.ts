import { UserRole } from "@/constants";

export interface ForgotPasswordData {
  email: string;
  role: UserRole;
}
