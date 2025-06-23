import { generateText, generateObject } from "ai";
import { z } from "zod";
import { config } from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env.local") });

async function generateMarketingCopy(input) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });

  // 第一步：生成营销文案
  const { text: copy } = await generateText({
    model: openai("gpt-4o"),
    prompt: `为以下内容撰写有说服力的中文营销文案：${input}。请突出产品优势，并注重情感共鸣。`,
  });

  // 第二步：对文案进行质量评估
  const { object: qualityMetrics } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      hasCallToAction: z.boolean(), // 是否包含行动号召语句
      emotionalAppeal: z.number().min(1).max(10), // 情感感染力（1~10）
      clarity: z.number().min(1).max(10), // 清晰度（1~10）
    }),
    prompt: `请评估以下中文营销文案的质量指标：
1. 是否包含清晰的行动号召语句（true/false）
2. 情感感染力评分（1~10）
3. 表达清晰度评分（1~10）

待评估文案如下：${copy}`,
  });

  // 第三步：如果质量不达标则重新生成文案
  if (
    !qualityMetrics.hasCallToAction ||
    qualityMetrics.emotionalAppeal < 7 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `请重新改写以下中文营销文案，要求：
${!qualityMetrics.hasCallToAction ? "- 增加明确的行动号召语句\n" : ""}
${qualityMetrics.emotionalAppeal < 7 ? "- 增强情感感染力\n" : ""}
${qualityMetrics.clarity < 7 ? "- 提高语言的清晰度与直接性\n" : ""}
原始文案：${copy}`,
    });
    return { copy: improvedCopy, qualityMetrics };
  }

  return { copy, qualityMetrics };
}

const result = await generateMarketingCopy("一款助你高效学习的AI助手");
console.log(result.copy);
console.log(result.qualityMetrics);
