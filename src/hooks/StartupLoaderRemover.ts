"use client";
import { useEffect } from "react";

export function StartupLoaderRemover() {
  useEffect(() => {
    const el = document.getElementById("global-loading");
    if (el) {
      el.style.transition = "opacity 0.3s";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 300); // 动画后移除
    }
  }, []);

  return null;
}
