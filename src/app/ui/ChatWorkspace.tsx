import { Layout } from "antd";

// 内容区样式 - 聊天消息区域
const contentStyle: React.CSSProperties = {
  background: "#f7f9fc",
  padding: "24px",
  overflow: "auto",
  display: "flex",
  flex: "1",
  flexDirection: "column",
  gap: "24px",
  textAlign: "left",
  lineHeight: "1.5",
  color: "#333333",
  // 移除渐变效果，保持简洁
  position: "relative",
  margin: "24px 16px 0",
};

export default function ChatWorkspace({ children }) {
  return (
    <Layout.Content style={contentStyle}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        content
      </div>
    </Layout.Content>
  );
}
