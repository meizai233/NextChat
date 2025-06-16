// 模拟请求数据
export async function fetchUser() {
  // 模拟 1.5s 延迟
  await new Promise((res) => setTimeout(res, 1500));
  return {
    name: "Tom",
    email: "tom@example.com",
  };
}
