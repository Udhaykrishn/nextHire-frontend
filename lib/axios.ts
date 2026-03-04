import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { redirect } from "next/navigation";

interface CreateApiOptions {
  refreshUrl: string;
  loginRedirect: string;
}

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
    _isServer?: boolean;
  }
}

export function createApiInstance({
  refreshUrl,
  loginRedirect,
}: CreateApiOptions): AxiosInstance {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const isServer = typeof window === "undefined";
      config._isServer = isServer;

      if (isServer) {
        try {
          const nextHeaders = await import("next/headers");
          const cookieStore = await nextHeaders.cookies();
          const accessToken = cookieStore.get("accessToken")?.value;
          const sessionId = cookieStore.get("session_id")?.value;

          const cookieHeader = [];
          if (sessionId) cookieHeader.push(`session_id=${sessionId}`);
          if (accessToken) cookieHeader.push(`accessToken=${accessToken}`);

          if (cookieHeader.length > 0) {
            config.headers.Cookie = cookieHeader.join("; ");
          }
        } catch (error) {
          console.error("Error reading cookies:", error);
        }
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;
      const isServer = originalRequest._isServer;

      const isPublic =
        originalRequest.url?.includes("/login") ||
        originalRequest.url?.includes("/signup") ||
        originalRequest.url?.includes("/google") ||
        originalRequest.url?.includes("/otp") ||
        originalRequest.url?.includes("/refresh");

      if (isPublic) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await api.post(refreshUrl);

          return api(originalRequest);
        } catch (refreshError) {
          if (isServer) {
            redirect(loginRedirect);
          } else {
            // Client-side: use window.location
            window.location.href = loginRedirect;
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
