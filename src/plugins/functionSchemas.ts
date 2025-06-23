// src/plugins/functionSchemas.ts
export const pluginFunctions = [
  {
    type: "function",
    function: {
      name: "get_current_weather",
      description: "获取某地当前天气",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "城市名称，例如 Beijing",
          },
          unit: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
            description: "温度单位",
          },
        },
        required: ["location"],
      },
    },
  },
];
