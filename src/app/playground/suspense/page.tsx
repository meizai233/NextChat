"use client";

import { Suspense, useState, lazy } from "react";

// 懒加载组件，只有真正渲染时才会触发 import()
const LazyComponent = lazy(() => import("./LazyComponent"));

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧪 Suspense + lazy Demo</h1>

      <button
        onClick={() => setShow(true)}
        style={{ marginBottom: 20, padding: "8px 16px" }}
      >
        加载懒加载组件
      </button>

      {show && (
        <Suspense fallback={<p>⏳ 加载中...</p>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}
