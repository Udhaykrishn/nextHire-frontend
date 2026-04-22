import { createApiInstance } from "./axios";

export const recruiterApi = createApiInstance({
  refreshUrl: "/auth/recruiter/refresh",
  loginRedirect: "/recruiter/auth/login",
});
