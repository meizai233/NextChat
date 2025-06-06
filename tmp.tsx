// app/page.tsx
async function fetchData() {
  const res = await fetch("https://api.example.com/data", {
    cache: "force-cache", // 相当于静态生成
  });
  return res.json();
}

export default async function Page() {
  const data = await fetchData();

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
// export const getStaticProps = (async (context) => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const repo = await res.json()
//   return { props: { repo } }
// }) satisfies GetStaticProps<{
//   repo: Repo
// }>
