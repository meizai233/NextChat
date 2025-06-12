"use client";

import { Inbox, Plus, Sun, Moon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useChatStore } from "@/app/store/chatStore";
import { useCallback, useState, useEffect } from "react";

import { useInitUserAndSessions } from "@/app/hooks/useInitUserAndSessions";
import { useConfirm } from "./chat-ui/confirm-dialog-provider";
import { RenameForm } from "@/components/rename-form";
import { useDialog } from "./chat-ui/dialog-provider";
import { SidebarButton } from "./chat-ui/siderbar-button";
import { IconButton } from "./ui/icon-buttom";

import { useTheme } from "next-themes"; // 新增

export function AppSidebar() {
  useInitUserAndSessions();

  const sessions = useChatStore((s) => s.sessions);
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const createSession = useChatStore((s) => s.createSession);
  const deleteSession = useChatStore((s) => s.deleteSession);
  const renameSession = useChatStore((s) => s.renameSession);
  const setCurrentSessionId = useChatStore((s) => s.setCurrentSessionId);

  const confirm = useConfirm();
  const showDialog = useDialog();

  // next-themes 主题切换相关
  const { theme, setTheme, resolvedTheme } = useTheme();
  // resolvedTheme 是当前主题（考虑系统优先级）

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await confirm({
        title: "确认删除",
        description: "确定要删除该会话吗？",
        confirmText: "删除",
        cancelText: "取消",
      });
      if (confirmed) {
        deleteSession(id);
      }
    },
    [confirm, deleteSession]
  );

  const handleRename = useCallback(
    async (id: string, oldTitle: string) => {
      const result = await showDialog({
        title: "重命名会话",
        component: RenameForm,
        props: {
          initialValue: oldTitle,
        },
      });

      if (result?.newTitle) {
        renameSession(id, result.newTitle);
      }
    },
    [showDialog, renameSession]
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-2">
            <span className="text-base font-semibold">Suda-chat</span>
            <div className="flex items-center gap-2">
              {/* 新增切换主题按钮 */}
              <IconButton
                icon={mounted && resolvedTheme === "light" ? Moon : Sun}
                variant="ghost"
                size="md"
                strokeWidth={2.2}
                onClick={toggleTheme}
                aria-label="切换主题"
              />
              {/* 新增创建会话按钮 */}
              <IconButton
                icon={Plus}
                variant="primary"
                size="md"
                strokeWidth={2.2}
                onClick={createSession}
                aria-label="新建会话"
              />
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarButton
                    key={item.id}
                    icon={Inbox}
                    label={item.title}
                    active={item.id === currentSessionId}
                    onClick={() => setCurrentSessionId(item.id)}
                    onRename={(e) => {
                      handleRename(item.id, item.title);
                    }}
                    onDelete={(e) => {
                      handleDelete(item.id);
                    }}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
