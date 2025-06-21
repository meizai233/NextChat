"use client";
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
        <main className="flex-1">{children}</main>
      </SidebarProvider>
    </div>
  );
}
