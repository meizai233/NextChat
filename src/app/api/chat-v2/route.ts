// /pages/api/chat.ts

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const chunks = ["你好", "，", "我是 AI 助手。"];
      for (let chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 300));
      }
      controller.close();
    },
  });

  return new Response(stream);
}
