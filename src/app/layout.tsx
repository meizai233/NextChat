import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css"; // 确保导入全局样式

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
