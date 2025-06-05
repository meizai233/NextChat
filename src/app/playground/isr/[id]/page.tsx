interface Post {
  id: string;
  title: string;
  content: string;
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
  ).then((res) => res.json());
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  let post = await data.json();
  return (
    <ul>
      <li key={post.id}>{post.title}</li>
    </ul>
  );
}
