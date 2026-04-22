import { userApi } from "@/lib/user.api";

export interface Project {
  _id: string;
  userId: string;
  projectName: string;
  description?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  projectName: string;
  description?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  url?: string;
}

export const ProjectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await userApi.get<Project[]>("/project");
    return response.data;
  },

  create: async (data: CreateProjectDto): Promise<Project> => {
    const response = await userApi.post<Project>("/project", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateProjectDto>,
  ): Promise<Project> => {
    const response = await userApi.put<Project>(`/project/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await userApi.delete(`/project/${id}`);
  },
};
