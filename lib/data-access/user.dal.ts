import { http } from "@/lib/data-access/http.dal";

export const userDAL = {
  getProfile: () =>
    http("/user/profile", {
      method: "GET",
      role: "user",
    }),

  updateProfile: (data:any) =>
    http("/user/profile", {
      method: "PUT",
      role: "user",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),

  getDashboard: () =>
    http("/users/dashboard", {
      method: "GET",
      role: "user",
    }),
};
