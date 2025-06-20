✅ useSWR + Suspense 会冲突 → 改为 Suspense 外包一层
✅ loading.tsx 和页面动态路由预取机制不同
✅ Zustand store 在 SSR 时不能用全局单例
✅ 使用 dynamic + fallback 实现 SSR-friendly 骨架屏
