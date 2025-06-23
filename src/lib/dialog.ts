import { ComponentType } from "react";

interface DialogOptions {
  title: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

export async function showDialog(options: DialogOptions): Promise<void> {
  const { title, component: Component, props = {} } = options;

  // 这里可以实现自定义的对话框逻辑
  // 暂时返回一个空的 Promise
  return new Promise((resolve) => {
    resolve();
  });
}
