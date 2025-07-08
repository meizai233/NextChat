type PluginStepStreamOptions = {
  currentSessionId: string | null;
  onMessage: (msg: any) => void;
};

// todo 这里应该做一层封装 首先处理onmessage的msg 拿到msg之后 根据msg的finishReason进行不同的处理
export function startPluginStepStream({
  currentSessionId,
  onMessage,
}: PluginStepStreamOptions) {
  const es = new EventSource(
    `/api/chat/stream?currentSessionId=${currentSessionId}`,
  );

  es.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      onMessage(msg);
    } catch (error) {
      console.error("解析 SSE 数据出错", error);
    }
  };

  es.onerror = (e) => {
    console.warn("SSE 连接错误或断开", e);
    es.close();
  };

  // 提供一个关闭函数
  return () => {
    es.close();
  };
}
