"use client";
import { Inbox, Pencil, Plus, Trash } from "lucide-react";

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
import { useChatStore } from "@/app/store/chatStore";
import { useCallback } from "react";
import { IconButton } from "./ui/icon-buttom";

import { useInitUserAndSessions } from "@/app/hooks/useInitUserAndSessions";

export function AppSidebar() {
  useInitUserAndSessions();

  const sessions = useChatStore((s) => s.sessions);
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const createSession = useChatStore((s) => s.createSession);
  const deleteSession = useChatStore((s) => s.deleteSession);
  const renameSession = useChatStore((s) => s.renameSession);
  const setCurrentSessionId = useChatStore((s) => s.setCurrentSessionId);

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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-2">
            <span className="text-base font-semibold">Suda-chat</span>
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
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Inbox size={16} />
                        <span className="truncate">{item.title}</span>
                      </div>

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
