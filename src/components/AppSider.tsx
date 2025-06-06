"use client";
import {
  Calendar,
  Home,
  Inbox,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useChatStore } from "@store/chat-store";
import { useCallback, useEffect } from "react";
import { IconButton } from "./ui/icon-buttom";
// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  // 从usestore里拿到sessions if没有则初始化 如果有则渲染
  const sessions = useChatStore((store) => store.sessions);
  const initializeSessions = useChatStore((store) => store.initializeSessions);
  const currentSessionId = useChatStore((store) => store.currentSessionId);
  const createSession = useChatStore((store) => store.createSession);
  const setCurrentSessionId = useChatStore((s) => s.setCurrentSessionId);
  const deleteSession = useChatStore((s) => s.deleteSession);
  const renameSession = useChatStore((s) => s.renameSession);

  const handleDelete = useCallback((id: string) => {
    if (confirm("确定要删除该会话吗？")) {
      deleteSession(id);
    }
  }, []);

  const handleRename = useCallback((id: string, oldTitle: string) => {
    const newTitle = prompt("请输入新的会话标题", oldTitle);
    if (newTitle && newTitle.trim()) {
      renameSession(id, newTitle.trim());
    }
  }, []);

  useEffect(() => {
    initializeSessions();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-2">
            <span className="text-base font-semibold">Suda-chat</span>
            {/* 也可放大标题 */}
            <button
              onClick={createSession}
              className="text-muted-foreground hover:text-primary cursor-pointer p-1.5 transition-colors"
            >
              <Plus size={20} strokeWidth={2.2} />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={item.id === currentSessionId}
                    asChild
                  >
                    <div
                      onClick={() => setCurrentSessionId(item.id)}
                      className="group flex w-full cursor-pointer items-center justify-between px-2 py-1"
                    >
                      {/* 左边图标 + 标题 */}
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Inbox size={16} />
                        <span className="truncate">{item.title}</span>
                      </div>

                      {/* 右边操作按钮 */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                        <IconButton
                          icon={Pencil}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRename(item.id, item.title);
                          }}
                        />

                        <IconButton
                          icon={Trash}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                        />
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
