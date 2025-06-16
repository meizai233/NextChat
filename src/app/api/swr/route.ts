// app/api/user/route.js
export async function GET() {
  return Response.json({
    name: "张三",
    age: 25,
  });
}
