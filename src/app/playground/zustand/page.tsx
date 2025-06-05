// src/components/Counter.tsx
"use client";

import { useCounterStore } from "@store/counter";
import Abc from "./abc";
import AbcClient from "./client";

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          -
        </button>
        <Abc />
        <AbcClient />
        <button
          onClick={increment}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={reset}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
