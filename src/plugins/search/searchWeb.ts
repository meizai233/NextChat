export async function searchWeb({
  query,
  __pluginKeys: keys,
}: {
  query: string;
  __pluginKeys: Record<string, string>;
}) {
  const apiKey = keys?.SEARCH_API_IO_KEY;
  if (!apiKey) {
    return {
      success: false,
      errorCode: "MISSING_API_KEY",
      error: "缺少 SearchAPI.io 的 API Key",
      meta: { missingKeys: ["SEARCH_API_IO_KEY"] },
    };
  }

  try {
    const res = await fetch(
      `https://www.searchapi.io/api/v1/search?engine=google&q=${encodeURIComponent(query)}&api_key=${apiKey}`,
    );
    if (!res.ok) {
      return {
        success: false,
        errorCode: "EXECUTION_ERROR",
        error: "搜索时发生错误",
      };
    }

    const data = await res.json();

    return {
      success: true,
      data:
        data.organic_results?.map((item: any) => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        })) || [],
    };
  } catch (e: any) {
    return {
      success: false,
      errorCode: "EXECUTION_ERROR",
      error: e.message || "搜索时发生错误",
      stack: e.stack || "",
    };
  }
}
