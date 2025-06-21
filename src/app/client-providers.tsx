"use client";

import { ConfirmProvider } from "@/components/chat-ui/confirm-dialog-provider";
import { DialogProvider } from "@/components/chat-ui/dialog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { StartupLoaderRemover } from "@/hooks/StartupLoaderRemover";
import { ChatStoreInit } from "./store/chatStore";
import { ChatStoreProvider } from "./providers/chat-store-provider";

export default function ClientProviders({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: ChatStoreInit;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StartupLoaderRemover />
      <ChatStoreProvider initialState={initialState}>
        <ConfirmProvider>
          <DialogProvider>{children}</DialogProvider>
        </ConfirmProvider>
      </ChatStoreProvider>
    </ThemeProvider>
  );
}
