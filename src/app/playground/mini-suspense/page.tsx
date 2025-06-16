"use client";

import React from "react";

// 这个函数做了啥? 管理fn 在这个fn return的promise没有resolve时 throw该promise?
// 一句话描述: 执行异步函数 如果pending throw promise; 如果reject throw err; 如果resolved throw val
// 进一步优化: 增加cache层，多次读取懒加载comp时直接 返回cache值
function createResource(asyncFn) {
  const cache = new Map();

  return {
    read(key) {
      // 如果cache有值(直接返回)
      // 如果cache的值状态未解决 直接throw掉
      if (cache.has(key)) {
        const { status, value } = cache.get(key);
        if (status === "resolved") return value;
        if (status === "rejected") throw value;
        throw value;
      } else {
        // 如果cache没有值 执行一下
        const promise = asyncFn(key).then(
          (res) => {
            cache.set(key, { status: "resolved", value: res });
          },
          (err) => cache.set(key, { status: "rejected", value: err }),
        );
        throw promise;
      }
    },
  };
}

// 捕获到throw的promise并展示fallback
class MySuspense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: null,
    };
  }
  componentDidCatch(err) {
    console.log("catch!");
    if (this.props.children.type) {
      const thenable = this.props.children.type._result;
      this.setState({ pending: thenable }, () => {
        thenable.then((res) => {
          this.setState({ pending: null });
        });
      });
    }
  }
  render() {
    return this.state.pending ? (
      <div>Loading because of catch</div>
    ) : (
      this.props.children
    );
  }
}
// 传参本身是async 外面包一层 让里面的promise全都throw一下
const userResource = createResource(
  (id) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ name: "张三", id }), 2000);
    }),
);

// 为什么是这样使用的??? 在read里手动
function Profile() {
  // 模拟一个异步函数 要执行完这个函数才能return
  const user = userResource.read(1); // ❗️这里 read 可能会 throw
  return <div>用户名：{user.name}</div>;
}

export default function App() {
  return (
    <MySuspense fallback={<div>加载中...</div>}>
      <Profile />
    </MySuspense>
  );
}
