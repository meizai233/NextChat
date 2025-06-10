import React from "react";
import "./globals.css"; // 确保导入全局样式
import { ConfirmProvider } from "@/components/ui/confirm-dialog-provider";
import { DialogProvider } from "@/components/ui/dialog-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfirmProvider>
          <DialogProvider>{children}</DialogProvider>
        </ConfirmProvider>
      </body>
    </html>
  );
}
