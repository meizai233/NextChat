import { SmileOutlined, PaperClipOutlined, SettingOutlined, SendOutlined } from "@ant-design/icons";
import { Layout, Input } from "antd";
import React, { ChangeEvent, useCallback } from "react";
const { TextArea } = Input;

// 底部样式 - 输入区域
const footerStyle: React.CSSProperties = {
  background: "#ffffff",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid #eaeaea",
  zIndex: 10,
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.02)",
};

// 定义组件 props 接口
// 待办 这个modelName需要有一个映射关系
interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  onSend: () => void;
  modelName?: string;
}

const InputPanel: React.FC<InputPanelProps> = ({ value, onChange, isLoading = false, onSend, modelName = "GPT-4" }) => {
  // 处理键盘事件
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  // 处理文本变化
  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // 处理发送按钮点击
  const handleSendClick = useCallback(() => {
    if (!isLoading) {
      onSend();
    }
  }, [isLoading, onSend]);

  return (
    <Layout.Footer className="w-full flex-col" style={footerStyle}>
      {/* 上半部分 */}
      <div className="w-full flex items-center justify-between mb-2 h-8">
        {/* 左侧图标 */}
        <div className="flex space-x-4">
          <SmileOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" aria-label="Emoji picker" />
          <PaperClipOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" aria-label="Attach file" />
          <SettingOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" aria-label="Settings" />
        </div>
        {/* 右侧模型名称和发送图标 */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">{modelName}</span>
          <SendOutlined
            className={`${isLoading ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-700 cursor-pointer"} text-xl`}
            onClick={handleSendClick}
            aria-label="Send message"
          />
        </div>
      </div>
      {/* 下半部分：输入框 */}
      <TextArea
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        rows={2}
        disabled={isLoading}
        placeholder="请输入消息..."
        className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Message input"
      />
    </Layout.Footer>
  );
};

export default InputPanel;
