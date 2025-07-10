"use client";
import { useMemo } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { useCopy } from "@/hooks/useCopy";
import { useChatStore } from "@/app/providers/chat-store-provider";
import { renderPluginUIs } from "@/utils/renderPluginUIs";
import ChatBubble from "./ChatBubble";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: Record<string, string | number | boolean>;
}

interface Props {
  content: string;
  toolInvocations?: ToolInvocation[];
}

export default function AIMessage({ content, toolInvocations }: Props) {
  const { isCopied, copyToClipboard } = useCopy();
  const steps = useChatStore((s) => s.steps);

  const handleCopy = () => {
    copyToClipboard(content);
  };

  // 使用 useMemo 缓存匹配步骤的计算结果
  const matchingSteps = useMemo(() => {
    if (!toolInvocations?.length) return [];

    return steps.filter((step) => {
      if (!step.toolResults?.length) return false;

      // 检查是否有匹配的toolCallId
      return step.toolResults.some((result) =>
        toolInvocations.some(
          (invocation) => invocation.toolCallId === result.toolCallId,
        ),
      );
    });
  }, [steps, toolInvocations]); // 只有当 steps 或 toolInvocations 变化时才重新计算

  return (
    <ChatBubble
      content={content}
      isUser={false}
      actions={[
        {
          icon: isCopied ? <CheckCheck size={16} /> : <Copy size={16} />,
          label: isCopied ? "已复制" : "复制",
          onClick: handleCopy,
        },
      ]}
    >
      {matchingSteps.map((step, index) => (
        <div key={index}>
          {step.toolResults && renderPluginUIs(step.toolResults)}
        </div>
      ))}
    </ChatBubble>
  );
}
