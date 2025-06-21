import { cookies } from "next/headers";

export async function getInitialChatState() {
  const cookieStore = await cookies(); // ✅ await！
  console.log(cookieStore, "cookieStoreeee");
  const userId = cookieStore.get("userId")?.value ?? null;
  const currentSessionId = cookieStore.get("currentSessionId")?.value ?? null;

  console.log(userId, "idddd", currentSessionId, "sssss");
  return {
    user: { userId },
    currentSession: { currentSessionId },
  };
}
