import { Layout, Input } from "antd";
import {
  EditOutlined,
  ClockCircleOutlined,
  MoreOutlined,
  BellOutlined,
} from "@ant-design/icons";
// 头部样式 - 浅色简洁设计
const headerStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "0 20px",
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

export default function HeaderPanel() {
  return (
    <Layout.Header style={headerStyle}>
      {/* 左侧：标题和编辑图标 */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-800">Chat App</h1>
        <EditOutlined className="cursor-pointer text-gray-500 hover:text-gray-700" />
      </div>

      {/* 右侧：搜索框和图标 */}
      <div className="flex items-center space-x-4">
        <Input.Search placeholder="Search" allowClear className="w-64" />
        <ClockCircleOutlined className="cursor-pointer text-gray-500 hover:text-gray-700" />
        <MoreOutlined className="cursor-pointer text-gray-500 hover:text-gray-700" />
        <BellOutlined className="cursor-pointer text-gray-500 hover:text-gray-700" />
      </div>
    </Layout.Header>
  );
}
