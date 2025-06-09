"use server";
import { getMessagesBySessionId } from "@lib/db/queries/message";

export async function getMessagesBySessionIdAction(sessionId: string) {
  debugger;
  const messages = await getMessagesBySessionId(sessionId);
  console.log("messages", messages);
  return messages;
}
