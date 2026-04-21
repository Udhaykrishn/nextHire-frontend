import { userApi } from "@/lib/user.api";

export interface Education {
  _id: string;
  userId: string;
  institutionName: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  gpa?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationDto {
  institutionName: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  gpa?: string;
}

export const EducationService = {
  getAll: async (): Promise<Education[]> => {
    const response = await userApi.get<Education[]>("/education");
    return response.data;
  },

  create: async (data: CreateEducationDto): Promise<Education> => {
    const response = await userApi.post<Education>("/education", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateEducationDto>,
  ): Promise<Education> => {
    const response = await userApi.put<Education>(`/education/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await userApi.delete(`/education/${id}`);
  },
};
