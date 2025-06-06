import { AppSidebar } from "@/components/AppSider";
import HeaderPanel from "@/components/HeaderPanel";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatLayout({ children }) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex h-dvh w-full min-w-0 flex-col">
            <HeaderPanel />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
