### 后续可以深入的点

- streamText 如何实现流式传输的 可以关注 readable stream
- 你是如何处理 LLM 的流式响应的？
  是否使用了 Server-Sent Events 或 WebSockets？
  如何在 UI 中平滑地显示流式文本？ 会涉及到哪些方面

### 关于 shadcn

- 为什么要选它？
  - 引入的组件是完全可读可修改的 定制化高
  - antd 的一个组件类似命令式 只需要给他一些属性 样式、动画、交互她全部包括了。shadcn 只包含最基本的交互功能+一点点 css，剩下的自己扩展即可
  - antd 需要 npm install，全部下载一大坨；shadcn 是直接把单个组件放到代码里面
