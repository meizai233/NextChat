"use client";

import { useState } from "react";
import Sider from "antd/es/layout/Sider";

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
      <div>
        <h1>Session Sidebar</h1>
        <p>Here you can manage your sessions.</p>
      </div>
    </Sider>
  );
}
