// pages/index.js
"use client";

import { useSWR } from "./useSWR";

function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

export default function Home() {
  const { data, error } = useSWR("/api/swr", fetcher, { suspense: false });

  if (error) return <div>出错了</div>;
  if (!data) return <div>加载中...</div>;

  return <div>用户名：{data.name}</div>;
}
