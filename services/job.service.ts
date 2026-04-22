import { userApi } from "@/lib/user.api";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logo?: string;
  description: string;
  requirements: string[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  postedAt: string;
}

export const JobService = {
  getAll: async (params?: { search?: string }): Promise<Job[]> => {
    const response = await userApi.get<Job[]>("/job", { params });
    return response.data;
  },

  getById: async (id: string): Promise<Job> => {
    const response = await userApi.get<Job>(`/job/${id}`);
    return response.data;
  },

  apply: async (id: string): Promise<void> => {
    await userApi.post(`/job/${id}/apply`);
  },

  save: async (id: string): Promise<void> => {
    await userApi.post(`/job/${id}/save`);
  },
};
