"use client";

import { Wrench, Puzzle } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarButton } from "./chat-ui/siderbar-button";
import { SettingsForm } from "@/components/settings-form";
import { PluginsForm } from "@/components/plugins-form";
import { useState } from "react";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const [settingsTab, setSettingsTab] = useState<"api" | "plugins">("api");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full gap-0 p-0 sm:max-w-full"
      >
        <Sidebar className="w-[200px] border-r">
          <SidebarContent className="flex h-full flex-col">
            <SidebarGroup className="flex flex-1 flex-col">
              <SidebarGroupLabel className="flex items-center justify-between pr-2">
                <span className="text-base font-semibold">设置</span>
              </SidebarGroupLabel>

              <SidebarGroupContent className="flex flex-1 flex-col">
                <SidebarMenu className="flex-1">
                  <SidebarMenuItem>
                    <SidebarButton
                      icon={Wrench}
                      label="API 设置"
                      active={settingsTab === "api"}
                      onClick={() => setSettingsTab("api")}
                      hideActions
                    />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarButton
                      icon={Puzzle}
                      label="插件设置"
                      active={settingsTab === "plugins"}
                      onClick={() => setSettingsTab("plugins")}
                      hideActions
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="ml-[200px] flex-1 overflow-y-auto p-6">
          {settingsTab === "api" && (
            <SettingsForm onClose={() => onOpenChange(false)} />
          )}
          {settingsTab === "plugins" && (
            <PluginsForm onClose={() => onOpenChange(false)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
