// app/error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("捕获到全局错误:", error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>出错啦！</h2>
        <p>{error.message}</p>
        <button onClick={reset}>重试</button>
      </body>
    </html>
  );
}
