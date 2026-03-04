import { NextRequest } from "next/server";

export function authChecker(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const sessionId = req.cookies.get("session_id")?.value;

  if (!accessToken) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64").toString(),
    );
    return { role: payload.role || "USER" };
  } catch {
    return null;
  }
}
