import { Layout } from "antd";

// 头部样式 - 浅色简洁设计
const headerStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "0 ",
  height: "64px",
  lineHeight: "64px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#333333",
  fontWeight: 500,
  fontSize: "16px",
  borderBottom: "1px solid #f0f0f0",
};

export default function HeaderPanel({ children }) {
  return (
    <Layout.Header style={headerStyle}>
      {children}
      header
    </Layout.Header>
  );
}
