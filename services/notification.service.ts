import { userApi } from "@/lib/user.api";

export interface Notification {
  _id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

export const NotificationService = {
  getAll: async (): Promise<Notification[]> => {
    const response = await userApi.get<Notification[]>("/notification");
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await userApi.patch(`/notification/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await userApi.patch("/notification/read-all");
  },

  delete: async (id: string): Promise<void> => {
    await userApi.delete(`/notification/${id}`);
  },
};
