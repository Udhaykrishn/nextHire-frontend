import { NextRequest } from "next/server";

export function authChecker(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value;
    const sessionId = req.cookies.get("session_id")?.value;

    if (!accessToken || !sessionId) return null;

    try {
        const payload = JSON.parse(Buffer.from(accessToken.split(".")[1], "base64").toString());
        return { role: payload.role || "USER" };
    } catch {
        return null;
    }
}
