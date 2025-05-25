"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import { theme } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import SessionSidebar from "../ui/SessionSidebar";
import ChatPage from "./page";

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

// 整体布局样式补充
const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  background: "#f7f9fc",
  display: "flex",
};

// 待办 填充children

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              // algorithm: theme.darkAlgorithm,
              token: {
                colorPrimary: "#4096ff",
                borderRadius: 8,
              },
            }}
          >
            <Layout className="">
              <SessionSidebar />
              <Layout className="h-screen w-full">
                <ChatPage />
              </Layout>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
