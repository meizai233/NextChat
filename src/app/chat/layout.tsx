"use client";
import HeaderPanel from "@/components/HeaderPanel";
import InputPanelWrapper from "@/components/InputPanelWrapper";
import { AppSidebarSkeleton } from "@/components/chat-ui/AppSidebarSkeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

const AppSider = dynamic(() => import("@/components/AppSider"), {
  loading: () => <AppSidebarSkeleton />,
  ssr: false,
});
export default function ChatLayout({ children }) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSider />
        <main className="flex-1">
          <div className="flex h-dvh w-full min-w-0 flex-col">
            <HeaderPanel />
            {children}
            <InputPanelWrapper />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
