import { StateCreator } from "zustand";
import { nanoid } from "nanoid";
import { ChatMessagesSlice, Message } from "../types/chat";
import { StoreState } from "../types/store"; // 假设你有一个合并所有切片类型的接口

export const createChatMessagesSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatMessagesSlice
> = (set, get) => ({
  messages: {},
  loadingStates: {},

  setMessages: (sessionId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [sessionId]: messages,
      },
    })),

  setLoading: (sessionId, isLoading) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [sessionId]: isLoading,
      },
    })),

  sendMessage: async (sessionId, content) => {
    // 1. 添加用户消息
    const userMessage: Message = {
      id: nanoid(),
      content,
      isUser: true,
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: {
        ...state.messages,
        [sessionId]: [...(state.messages[sessionId] || []), userMessage],
      },
    }));

    // 2. 设置加载状态
    get().setLoading(sessionId, true);

    try {
      // 3. 调用API获取回复
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: content,
          userId: get().userId, // 从其他切片获取用户ID
        }),
      });

      const data = await response.json();

      // 4. 添加AI回复
      const aiMessage: Message = {
        id: nanoid(),
        content: data.reply,
        isUser: false,
        timestamp: Date.now(),
      };

      set((state) => ({
        messages: {
          ...state.messages,
          [sessionId]: [...(state.messages[sessionId] || []), aiMessage],
        },
      }));
    } catch (error) {
      console.error("Failed to send message:", error);
      // 可以添加错误处理逻辑
    } finally {
      // 5. 清除加载状态
      get().setLoading(sessionId, false);
    }
  },
});
