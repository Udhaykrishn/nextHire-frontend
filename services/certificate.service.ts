import { userApi } from "@/lib/user.api";

export interface Certificate {
  _id: string;
  userId: string;
  certificateName: string;
  issuingOrganization?: string;
  issueDate?: string | Date;
  expirationDate?: string | Date;
  certificateUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCertificateDto {
  certificateName: string;
  issuingOrganization?: string;
  issueDate?: string | Date;
  expirationDate?: string | Date;
  certificateUrl?: string;
}

export const CertificateService = {
  getAll: async (): Promise<Certificate[]> => {
    const response = await userApi.get<Certificate[]>("/certificate");
    return response.data;
  },

  create: async (data: CreateCertificateDto): Promise<Certificate> => {
    const response = await userApi.post<Certificate>("/certificate", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateCertificateDto>,
  ): Promise<Certificate> => {
    const response = await userApi.put<Certificate>(`/certificate/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await userApi.delete(`/certificate/${id}`);
  },
};
