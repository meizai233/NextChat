"use client";

import useSWR from "swr";
import { fetchUser } from "./fetchUser";

export default function UserProfile() {
  const { data: user } = useSWR("user", fetchUser, {
    suspense: true,
  });

  return (
    <div className="rounded border bg-gray-50 p-4">
      <h2 className="text-xl font-bold">👤 用户信息</h2>
      <p>姓名：{user.name}</p>
      <p>邮箱：{user.email}</p>
    </div>
  );
}
