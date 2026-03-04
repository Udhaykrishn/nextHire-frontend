import axios from "axios";
import { cookies } from "next/headers";

const createServerApi = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionId = cookieStore.get("session_id")?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : "",
      sessionId ? `session_id=${sessionId}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    if (cookieHeader) {
      config.headers.set("Cookie", cookieHeader);
    }
    return config;
  });

  return api;
};

export const serverUserApi = createServerApi();
