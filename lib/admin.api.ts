import { createApiInstance } from "./axios";

export const adminApi = createApiInstance({
  refreshUrl: "/auth/admin/refresh",
  loginRedirect: "/admin/auth/login",
});
