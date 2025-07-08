### sse推送机制：

- 在onStepFinish 拿到plugin 如果该plugin有ui 则publish发布到sessionId 把信息带过去（为什么是publish?，是多对多的关系吗？谁去订阅？）
- 在onFinish 耶publish过去
- public所做的事情，触发sessionId通道❓ 给该通道发送msg data
- 在subscribe所做的事 订阅sessionId通道❓ 订阅到该通道后 调用cb

- 整理版
- 后端在get时 创建一个readableStream，start时订阅sessionId消息流，在onStrepFinish时publish消息流（由于2个请求无法共享上下文）
- 前端在发送消息时 new EventSource消费消息流 并把对应ui组件挂载出来

为什么要用发布订阅机制？
sse是用get推送，llm模型调用是用post请求，二者不独立，无共享上下文。在post的插件调用中途把data传给get请求中的数据 how to？
我理解也可以用其他方案，比如data insert到数据库 数据库再读取，但这样没有自动钩子吧 get收不到通知（还得监听？数据库），性能损耗+实时性不高
对于生产环境的考虑，单机部署的轻量级方案就是node的发布订阅 -> 多实例部署的方案可以考虑redis的发布订阅。

### 后续可以深入的点

- streamText 如何实现流式传输的 可以关注 readable stream
- 你是如何处理 LLM 的流式响应的？
  是否使用了 Server-Sent Events 或 WebSockets？
  如何在 UI 中平滑地显示流式文本？ 会涉及到哪些方面

### zustand

- [ ] 为每个请求创建一个store 参考：https://zustand.docs.pmnd.rs/guides/nextjs
- 切片 考虑到很深的组件嵌套 props深层嵌套之类的 直接useStore

### 可以深入的点

- 哪些场景可以用到渐进式增强

- 对服务端渲染的细节 特别是 react 服务器组件 还是不够了解111
- useContext 和 useReducer 的区别 为什么需要有状态管理哭 而非 useContext 呢111
- 如何在浏览器中观察到 rsc 的传输和交互
- 流式传输是啥，如何应用实践

- 在 nextjs 中，他们的通信 msg 是 rsc，rsc 需要传递哪些信息？

- 什么情况下用服务端，什么情况下用客户端组件？

  - 客户端：离用户更近，重在交互，可以用 react 自带钩子啊生命周期啊浏览器 api 啊
  - 服务端，离数据更近，用 use 拿到数据并给到客户端 然后客户端渲染【说得太粗略了】，一些需要保密的信息比如 token，提高 fcp
  - 举例：一个大组件中的获取数据部分、静态元素、交互部分，交互部分标记 use client，其他部分标记服务端【next 底部是如何进行拆分的】

- 部分预渲染这个策略怎么手撸一个，脱离 nextjs 机制,prerender 的一些概念可以自己来实现，更有可控性

- 如何通过例子深度体验 nextjs 的工作流程（服务器组件和客户端组件）
  - 服务端和

### 最佳实践：如何搭配使用 RSC 和 Client Components
