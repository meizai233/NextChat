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
