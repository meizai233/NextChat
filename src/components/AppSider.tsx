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
import { useConfirm } from "./ui/confirm-dialog-provider";
import { RenameForm } from "@/components/rename-form";
import { useDialog } from "./ui/dialog-provider";

export function AppSidebar() {
  useInitUserAndSessions();

  const sessions = useChatStore((s) => s.sessions);
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const createSession = useChatStore((s) => s.createSession);
  const deleteSession = useChatStore((s) => s.deleteSession);
  const renameSession = useChatStore((s) => s.renameSession);
  const setCurrentSessionId = useChatStore((s) => s.setCurrentSessionId);
  // 实现思路: context comfirmProvider封装一下provider并存放一个action和state，action来修改state
  // 然后如果有设置state 根据state.open决定dialog的显隐
  // confirm方法实现: 传入option 并setConfirmState(isOpen为true)
  // 如果调用了confirm则isOpen显示
  // 为什么要用promise? 给一个promise 在确认时调用resolve 这是一个暂停等待状态 resolve之后才关闭选项
  const confirm = useConfirm();
  const showDialog = useDialog();

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
    [confirm],
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
    [showDialog],
  );

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
