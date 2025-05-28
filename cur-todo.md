themeProvider 和 sessionProvider 自己手写一个

openai 的连接实例 以及 openai 的相关方法应该放在全局 zustand 里
-> get openai 的所有模型列表 并保存在全局状态里
-> 探讨 useContext 的缺点 为什么需要状态管理库 1111
-> chatbot-ui 用 useContext 不会有啥问题吗

无登陆态 直接输入 api key 的情况：客户端输入 key 然后把 key 给后端服务器 服务器透传到 openai openai 返回 msg msg 返回给客户端
疑问【1】：每次客户端发消息 都需要发送一遍 key 吗
疑问【2】：服务端需要管理用户状态吗
疑问【3】：客户端不登录的情况下 如何让服务端不要每次都发 key

-> 看下人家的登录流程是怎样的呢？？？
