import { SmileOutlined, PaperClipOutlined, SettingOutlined, SendOutlined } from "@ant-design/icons";
import { Layout, Input } from "antd";
const { TextArea } = Input;

// 底部样式 - 输入区域
const footerStyle: React.CSSProperties = {
  background: "#ffffff",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid #eaeaea",
  // position: "absolute",
  // bottom: 0,
  // left: "200px",
  zIndex: 10,
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.02)",
};
export default function InputPanel(props) {
  return (
    <>
      <Layout.Footer className="w-full flex-col" style={footerStyle}>
        {/* 上半部分 */}
        <div className="w-full flex items-center justify-between mb-2 h-8">
          {/* 左侧图标 */}
          <div className="flex space-x-4">
            <SmileOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" />
            <PaperClipOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" />
            <SettingOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" />
          </div>
          {/* 右侧模型名称和发送图标 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">GPT-4</span>
            <SendOutlined className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl" />
          </div>
        </div>
        {/* 下半部分：输入框 */}
        <TextArea rows={2} placeholder="请输入消息..." className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />{" "}
      </Layout.Footer>
    </>
  );
}
