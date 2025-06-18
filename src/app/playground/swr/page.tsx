// app/page.tsx (or page.jsx)
"use client";

import { Suspense } from "react";
import { useSWRWithSuspense } from "./useSWR";

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Wan Yan" }), 1500);
  });
}

function Profile() {
  const { data } = useSWRWithSuspense("user", fetchUser);
  return <h1>My name is {data.name}</h1>;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Profile />
    </Suspense>
  );
}
