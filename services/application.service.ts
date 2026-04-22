import { userApi } from "@/lib/user.api";

export interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  status: "applied" | "interviewing" | "rejected" | "offered" | "withdrawn";
  appliedAt: string;
  updatedAt: string;
}

export const ApplicationService = {
  getAll: async (): Promise<Application[]> => {
    const response = await userApi.get<Application[]>("/application");
    return response.data;
  },

  getById: async (id: string): Promise<Application> => {
    const response = await userApi.get<Application>(`/application/${id}`);
    return response.data;
  },

  withdraw: async (id: string): Promise<void> => {
    await userApi.post(`/application/${id}/withdraw`);
  },
};
