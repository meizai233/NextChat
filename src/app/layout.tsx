import React from "react";
import "./globals.css"; // 确保导入全局样式
import { ConfirmProvider } from "@/components/chat-ui/confirm-dialog-provider";
import { DialogProvider } from "@/components/chat-ui/dialog-provider";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <ConfirmProvider>
          <DialogProvider>{children}</DialogProvider>
        </ConfirmProvider>          </ThemeProvider>

      </body>
    </html>
  );
}
