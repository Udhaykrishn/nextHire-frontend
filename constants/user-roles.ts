export const USER_ROLES = {
    USER: 'user',
    RECRUITER: 'recruiter',
    ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Helper type guards
export const isUserRole = (role: string): role is UserRole => {
    return Object.values(USER_ROLES).includes(role as UserRole);
};
