import { Layout } from "antd";

// 底部样式 - 输入区域
const footerStyle: React.CSSProperties = {
  background: "#ffffff",
  // padding: "12px 24px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid #eaeaea",
  position: "fixed",
  bottom: 0,
  zIndex: 10,
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.02)",
};
export default function InputPanel(props) {
  return (
    <>
      <Layout.Footer className="w-full" style={footerStyle}>
        11
      </Layout.Footer>
    </>
  );
}
