"use server";
import { user } from "@lib/db/schema"; // 你定义的 user 表
import { db } from "@lib/db";
import { createUserData } from "@/lib/utils/createUserData";

export async function initAnonymousUser(newUserId) {
  const newUser = createUserData(newUserId);

  await db.insert(user).values(newUser);
}
