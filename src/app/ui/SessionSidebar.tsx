"use client";

import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";

import { MenuFoldOutlined, MessageOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
// 侧边栏样式 - 浅色风格
const siderStyle: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  color: "#333333",
  padding: "10px 0",
  overflow: "auto",
  left: 0,
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #e5e7eb",
  transition: "all 0.2s ease-in-out",
};

export default function SessionSidebar(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider className="h-screen" style={siderStyle} breakpoint="lg" collapsedWidth="0" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      {/* 头部 -> logo */}
      <div className="flex flex-col h-full">
        <div className={`h-16 flex items-center ${collapsed ? "justify-center" : "justify-between"} border-b border-gray-300 px-4`}>
          {!collapsed && (
            <>
              <h2 style={{ margin: 0 }}>Chat</h2>
              <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer" }}>
                <MenuFoldOutlined />
              </div>
            </>
          )}
        </div>

        <div className="h-full flex flex-col justify-between">
          {/* 顶部菜单：聊天会话列表 */}
          <Menu mode="inline" defaultSelectedKeys={["1"]} className="border-none">
            <Menu.Item key="1" icon={<MessageOutlined />}>
              Chat Session 1
            </Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined />}>
              Chat Session 2
            </Menu.Item>
            <Menu.Item key="3" icon={<MessageOutlined />}>
              Chat Session 3
            </Menu.Item>
          </Menu>

          {/* 底部菜单：操作项 */}
          <Menu mode="inline" className="border-none">
            <Menu.Item key="4" icon={<PlusOutlined />}>
              New Chat
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
}
