// lib/useSWRWithSuspense.js
import { useEffect, useState } from "react";

const cache = new Map();
const promiseCache = new Map();
const subscribers = new Map();

function notify(key) {
  const subs = subscribers.get(key) || new Set();
  subs.forEach((fn) => fn());
}

export function mutate(key, newData) {
  cache.set(key, newData);
  notify(key);
}

export function useSWRWithSuspense(key, fetcher) {
  // 1. 找cache
  // 2. 找promiseCache，若有值 则抛出；没有值，则fetch
  // 2.1 有值，如果pending则suspense接住
  // 2.2 fetch.then后 cache.set 并通知所有订阅的组件更新

  const cachedData = cache.get(key);

  if (cachedData === undefined) {
    let promise = promiseCache.get(key);

    if (!promise) {
      promise = fetcher(key).then((res) => {
        cache.set(key, res);
        promiseCache.delete(key);
        notify(key);
        return res;
      });
      promiseCache.set(key, promise);
    }

    // 重点：抛出 Promise 触发 Suspense fallback
    throw promise;
  }

  const [data, setData] = useState(cachedData);

  useEffect(() => {
    const update = () => setData(cache.get(key));
    if (!subscribers.has(key)) {
      subscribers.set(key, new Set());
    }
    subscribers.get(key).add(update);

    return () => {
      subscribers.get(key).delete(update);
    };
  }, [key]);

  const revalidate = () => {
    const p = fetcher(key).then((res) => {
      cache.set(key, res);
      notify(key);
      return res;
    });
    promiseCache.set(key, p);
    return p;
  };

  return {
    data,
    mutate: (d) => mutate(key, d),
    revalidate,
  };
}
