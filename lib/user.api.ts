import { createApiInstance } from "./axios";

export const userApi = createApiInstance({
  refreshUrl: "/auth/user/refresh",
  loginRedirect: "/users/auth/login",
});
