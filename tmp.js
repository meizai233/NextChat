function c() {
  throw new Error("我是 C 函数出的错！");
}

function b() {
  c();
}

function a() {
  try {
    b();
  } catch (err) {
    console.error("🔴 A 中捕获到了错误：", err.message);
  }
}

a();
