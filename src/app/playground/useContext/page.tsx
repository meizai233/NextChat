"use client";

import React, { useMemo } from "react";
import { useState, useContext, createContext } from "react";

// 创建 Context
const AppContext = createContext(null);

// Header 组件只关心 user
const Header = React.memo(function Header() {
  const { user } = useContext(AppContext);
  console.log("🔁 Header re-rendered");
  return <div>👤 Welcome, {user.name}</div>;
});

// Sidebar 组件只关心 theme
function Sidebar() {
  const { theme } = useContext(AppContext);
  console.log("🔁 Sidebar re-rendered");
  return <div>🎨 Theme: {theme}</div>;
}

// Main 用于触发修改 theme
function Main({ setTheme }) {
  return (
    <div>
      <button onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}>Toggle Theme</button>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ name: "Alice" });

  // 不优化的 contextValue（每次 render 都是新对象）
  // const contextValue = { theme, user };

  const contextValue = useMemo(() => ({ theme, user }), [theme, user]);

  return (
    <AppContext.Provider value={contextValue}>
      <Header />
      <Sidebar />
      <Main setTheme={setTheme} />
    </AppContext.Provider>
  );
}
export default App;

// 问题分析: useContext对象{a,b}中的b变化，所有子组件都会rerender
// 优化1: 组件使用React.memo，没有用到useContext的组件不会rerender，useContext(a)的组件在b变化时依然rerender
