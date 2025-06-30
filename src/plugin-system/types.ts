export interface PluginApiKey {
  key: string; // API Key 的标识符
  name: string; // API Key 的显示名称
  description: string; // API Key 的描述
  placeholder?: string; // 输入框的占位符文本
  required: boolean; // 是否必需
  type?: "password" | "text"; // 输入框类型，默认为 password
}

export interface PluginApiKeyConfig {
  [pluginId: string]: PluginApiKey[];
}
