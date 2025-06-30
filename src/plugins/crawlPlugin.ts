import fetch from "node-fetch";

export async function crawlWebPage(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`请求失败，状态码: ${res.status}`);
    }
    const html = await res.text();

    // 简单提取正文（你可以用更复杂的库，比如 jsdom、cheerio）
    // 这里示例：用正则抽取所有 <p> 标签内容拼接
    const matches = html.match(/<p[^>]*>(.*?)<\/p>/g) || [];
    const text = matches
      .map((p) => p.replace(/<[^>]+>/g, "").trim()) // 去标签，留文本
      .filter(Boolean)
      .join("\n\n");

    return text.slice(0, 3000); // 限制返回长度，避免太大
  } catch (err) {
    return `网页爬取失败: ${err.message}`;
  }
}
