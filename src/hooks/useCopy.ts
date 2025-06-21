"use client";
import { useState, useCallback } from "react";

interface UseCopyReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export function useCopy(timeout = 2000): UseCopyReturn {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // 重置复制状态
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    },
    [timeout],
  );

  return {
    isCopied,
    copyToClipboard,
  };
}
