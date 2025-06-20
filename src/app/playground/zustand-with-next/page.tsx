import { ChatStoreProvider } from "./chat-store-provider";
import { CounterComponent } from "./components/CounterComponent";
import { UserComponent } from "./components/UserComponent";

// 服务器组件：设置初始状态
export default function HomePage() {
  // 服务器端可以设置不同的初始状态
  const initialState = {
    user: "张三",
    count: 5,
    messages: ["系统: 欢迎使用聊天室！"],
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Zustand + Next.js Demo</h1>

      {/* Context Provider 包装客户端组件 */}
      <ChatStoreProvider initialState={initialState}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-4">
            <h2 className="mb-4 text-xl font-semibold">用户信息</h2>
            <UserComponent />
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <h2 className="mb-4 text-xl font-semibold">计数器</h2>
            <CounterComponent />
          </div>

          {/* <div className="rounded-lg bg-yellow-50 p-4">
            <h2 className="mb-4 text-xl font-semibold">消息列表</h2>
            <MessagesComponent />
          </div>

          <div className="rounded-lg bg-purple-50 p-4">
            <h2 className="mb-4 text-xl font-semibold">控制面板</h2>
            <ControlPanel /> */}
          {/* </div> */}
        </div>
      </ChatStoreProvider>
    </div>
  );
}
