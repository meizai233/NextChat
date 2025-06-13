// 服务端组件 suspanse里面直接包裹异步组件
// suspense 里的组件里有await 那么如何流式渲染?
// 待办 我想知道suspense如何实现流式渲染
import { Suspense } from "react";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function PostFeed() {
  await sleep(2000);
  return <h1>Hello PostFeed</h1>;
}

async function Weather() {
  await sleep(8000);
  return <h1>Hello Weather</h1>;
}

async function Recommend() {
  await sleep(5000);
  return <h1>Hello Recommend</h1>;
}

export default function Dashboard() {
  return (
    <section style={{ padding: "20px" }}>
      <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading Weather Component</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading Recommend Component</p>}>
        <Recommend />
      </Suspense>
    </section>
  );
}
