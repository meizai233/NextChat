"use client";
import { useEffect, useState } from "react";

// 简易缓存
const cache = new Map();

// 如果cache里没有key 则请求 请求完之后缓存
// 因为要写在react里 key变化就请求

export function useSWR(key, fetcher, options = {}) {
  const [data, setData] = useState(() => cache.get(key));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!key) return;

    // 如果已经缓存，直接返回
    if (cache.has(key)) {
      setData(cache.get(key));
      return;
    }
    fetcher(key).then((res) => {
      cache.set(key, res);
      setData(res);
    });
  }, [key]);

  return { data, error };
}
