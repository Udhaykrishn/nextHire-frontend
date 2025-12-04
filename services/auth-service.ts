import { USER_ROLES, UserRole } from "@/constants";
import { UserAuthService } from "./auth/user.service";
import { RecruiterAuthService } from "./auth/recruiter.service";

/**
 * Get the appropriate auth service based on user role
 * @param role - The user role (user or recruiter)
 * @returns The corresponding auth service
 */
export function getAuthService(role: UserRole) {
    if (role === USER_ROLES.RECRUITER) {
        return RecruiterAuthService;
    }
    return UserAuthService;
}
