import { nanoid } from "nanoid";
export function createUserData(newUserId) {
  return {
    id: newUserId || nanoid(), // 自定义 ID 或让 DB 默认生成
    createdAt: new Date(),
    updatedAt: new Date(),
    // 可以添加其他字段
  };
}
