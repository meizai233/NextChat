import React, { ReactNode } from "react";

interface PluginMessageProps {
  ui: ReactNode;
}

const PluginMessage: React.FC<PluginMessageProps> = ({ ui }) => {
  return <div className="plugin-message">{ui}</div>;
};

export default PluginMessage;
