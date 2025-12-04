import { createApiInstance } from "./axios";

export const adminApi = createApiInstance({
    refreshUrl: "/admin/auth/refresh",
    loginRedirect: "/admin/auth/login",
});
