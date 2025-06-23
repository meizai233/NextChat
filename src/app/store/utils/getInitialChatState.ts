import { cookies } from "next/headers";

export async function getInitialChatState() {
  const cookieStore = await cookies(); // ✅ await！
  const userId = cookieStore.get("userId")?.value ?? null;
  const currentSessionId = cookieStore.get("currentSessionId")?.value ?? null;

  return {
    user: { userId },
    currentSession: { currentSessionId },
  };
}
