- [x] 缓存机制：相同 key 不重复请求，返回缓存数据
- [x] 自动请求数据：组件渲染时请求数据
- [x] 订阅机制：多个组件使用相同 key 时共享更新
- [ ] revalidate（重新验证）机制：页面 focus 或窗口恢复时自动刷新
- [ ] suspense 支持（可选）：通过 throw promise 支持 <Suspense> fallback
- [ ] isLoading确认是否加载完
- [ ] mutate(key, newData)：手动修改数据并更新视图
- [ ] revalidate()：重新请求并刷新缓存
- [ ] 支持 loading、error 状态

### 实现过程：

useSWR所做的事情:

1. 首先给所有请求以api path为路径 加一层cache，useEffect自动fetch。
2.
