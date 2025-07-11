import { useState, useRef } from "react";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}
interface UseChatOptions {
  onFinish?: (
    message: ChatMessage,
    meta: { usage?: any; finishReason?: string },
  ) => void;
}

type Status = "idle" | "loading" | "done";

// 需要实现什么?
// 传入一些配置 然后export一些方法 在调用该方法时触发发起对话

export function useChat(options?: UseChatOptions) {
  // input 输入内容
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [status, setStatus] = useState<Status>("idle");
  const controllerRef = useRef<AbortController | null>(null);

  // 这是干啥的
  const lastUserInputRef = useRef<string>("");

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;
    setError(null);
    setInput("");
    setStatus("loading");

    // 生成用户消息
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userInput,
    };

    // 合并之前的消息
    setMessages((prev) => [...prev, userMessage]);
    lastUserInputRef.current = userInput;

    // 生成助手消息
    const assistantId = crypto.randomUUID();
    let assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantMessage]);

    // 如何发起请求？
    // 创建一个abortController发起/终止请求
    // res.body是一个可读流，getReader读取
    try {
      const controller = new AbortController();
      controllerRef.current = controller;

      const res = await fetch("/api/chat-v2", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // 循环读取reader
      // todo 如果一直没有done 好像会陷入死循环
      // 什么情况下不会done？read()后
      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: fullText } : msg,
          ),
        );
      }

      setStatus("done");

      options?.onFinish?.(
        {
          id: assistantId,
          role: "assistant",
          content: fullText,
        },
        { finishReason: "stop" }, // 如果你有 finishReason 可以加进去
      );
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("请求被中止");
      } else {
        setError(err);
        setStatus("idle");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: "出错了" } : msg,
          ),
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const stop = () => {
    controllerRef.current?.abort();
    setStatus("idle");
  };

  const reload = () => {
    const last = lastUserInputRef.current;
    if (last) sendMessage(last);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return {
    input,
    handleSubmit,
    messages,
    error,
    status,
    reload,
    stop,
    handleInputChange,
  };
}
