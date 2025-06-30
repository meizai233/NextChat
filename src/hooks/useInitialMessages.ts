import { nanoid } from "nanoid";
import { ChatMessage } from "ai"; // 根据你的类型定义替换

export function useInitialMessages(): ChatMessage[] {
  const i = {
    id: nanoid(),
    role: "system",
    content:
      "你是智能助手，当用户提问涉及时间、最新数据、排名等信息时，必须调用网页搜索插件获取最新内容。如果插件返回结果，请结合结果回答。",
  };
  return [i];
}
