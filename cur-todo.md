-> 先写一个不需要登录的 类似chatbox的页面

- [x] zustand会话管理 历史记录管理
- [x] 聊天历史记录存储
  - [ ] 无限滚动加载历史消息
  - [x] 流式 AI 回复写入数据库
  - [ ] 分页查询 swr
  - [x] 聊天记录显示md格式
  - [x] 用户和chat采用不同的样式
  - [x] 回复时的加载样式
  - [ ] 流式输出时在后面加上加载样式
  - [ ] 虚拟列表？考虑历史记录很长很长时如何提高时间
  - [ ] 输出不够丝滑，而且会抖动
  - [ ] 快速定位到顶部/底部
  - [ ] 全局查找
  - [x] 全局一键换肤
  - [x] 新增
  - [x] 错误信息显示
  - [ ] 错误重试
  - [ ] 骨架屏 配合suspense 实现部分预渲染(sidebar以及chatpage那块)
  - [ ] 乐观更新 react-loading-skeleton (骨架屏效果)
  - [x] 左下角设置 配置api-key等 本地持久化缓存
  - [ ] 考虑二次封装组件(加上tailwind css 或者仿照)
- [ ] useSWR考虑渐进式引入
- [ ] 填入apikey
- [ ] 消息发送成功后自动刷新
- [ ] 自动滚动到底部
- [ ] 错误处理/Loading Skeleton
- [ ] 手写一个usechat?

openai 的连接实例 以及 openai 的相关方法应该放在全局 zustand 里
-> get openai 的所有模型列表 并保存在全局状态里
-> 探讨 useContext 的缺点 为什么需要状态管理库 1111
-> chatbot-ui 用 useContext 不会有啥问题吗

无登陆态 直接输入 api key 的情况：客户端输入 key 然后把 key 给后端服务器 服务器透传到 openai openai 返回 msg msg 返回给客户端
疑问【1】：每次客户端发消息 都需要发送一遍 key 吗
疑问【2】：服务端需要管理用户状态吗
疑问【3】：客户端不登录的情况下 如何让服务端不要每次都发 key

-> 看下人家的登录流程是怎样的呢？？？

- 拿到本地env的sk key 然后调用对方的模型
-

后续扩展方向

- [ ] 参考lobechat看下别人做的鲁棒性高的地方（问gpt
- [ ] 练手方向：带「消息队列 +事务补偿」的 Chat 项目
      前端：Next.js + SWR/Zustand

后端：Drizzle + PostgreSQL + Redis（存 stream 数据）

核心点：

用户和机器人消息必须成对存入数据库（若失败需补偿）

使用 db.transaction() 包装写入逻辑

接入消息队列（如：BullMQ）异步保存、重试、写入统计信息

- [ ] https://github.com/vercel/commerce 参考下数据一致性啥啥?
