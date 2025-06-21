import React from "react";
import "./globals.css"; // 确保导入全局样式
import ClientProviders from "./client-providers";
import { getInitialChatState } from "./store/utils/getInitialChatState";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = await getInitialChatState();

  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ai-loading-container {
                position: fixed;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: radial-gradient(ellipse at center, #ffffff 0%, #f3f4f6 100%);
                z-index: 9999;
              }

              .ai-loader {
                display: flex;
                gap: 8px;
                height: 40px;
              }

              .ai-loader div {
                width: 6px;
                background: linear-gradient(to top, #00f5c0, #00c2ff);
                border-radius: 3px;
                animation: wave 1.2s infinite ease-in-out;
              }

              .ai-loader div:nth-child(1) { animation-delay: 0s; }
              .ai-loader div:nth-child(2) { animation-delay: 0.1s; }
              .ai-loader div:nth-child(3) { animation-delay: 0.2s; }
              .ai-loader div:nth-child(4) { animation-delay: 0.3s; }
              .ai-loader div:nth-child(5) { animation-delay: 0.4s; }

              @keyframes wave {
                0%, 100% { height: 10px; }
                50% { height: 40px; }
              }

              .ai-loader-text {
                margin-top: 24px;
                text-align: center;
                font-size: 14px;
                color: #aaa;
                font-family: 'Courier New', monospace;
              }
            `,
          }}
        />
      </head>
      <body>
        {/* startup loading placeholder */}
        <div id="global-loading" className="ai-loading-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="ai-loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ai-loader-text">AI 正在思考中...</div>
          </div>
        </div>
        <ClientProviders initialState={initialState}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
