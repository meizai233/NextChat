import { NextRequest } from "next/server";

import { subscribeStepMessages } from "@/lib/chat-event-bus";
import saveObjectToFile from "@/utils/saveObjectToFile";

// SSE 推送
// 创建一个readableStream，该stream在创建时订阅stepMsg并且把msg一直往该可读流写
// 然后 new Response() 把这个流发回去

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const currentSessionId = url.searchParams.get("currentSessionId");
  if (!currentSessionId)
    return new Response("Missing currentSessionId", { status: 400 });

  // 创建一个 readableStream
  const stream = new ReadableStream({
    // 当对象被构造时立刻调用该方法
    start(controller) {
      // send方法将msg塞到队列
      const send = (msg: any) => {
        const payload = `data: ${JSON.stringify(msg)}\n\n`;
        controller.enqueue(new TextEncoder().encode(payload));
      };

      // 创建一个subscribe 方法 在llm onStepFinish时 把msg推送过来 触发cb msg send到readableStream中，该readableSteram作为sse的payload给到客户端
      const unsubscribe = subscribeStepMessages(currentSessionId, (msg) => {
        saveObjectToFile(msg, "msg2");
        send(msg);
      });
      // 这啥意思 监听abort事件 断开后取消订阅 那如何发送给客户端
      req.signal.addEventListener("abort", () => {
        unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
