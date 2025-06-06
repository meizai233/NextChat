"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import { theme } from "antd";
import SessionSidebar from "../../ui/SessionSidebar";
import ChatPage from "./page";

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
