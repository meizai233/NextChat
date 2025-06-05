"use client";
import { useEffect, useState } from "react";

export default function AbcClient(props) {
  const [name, setName] = useState(null);

  useEffect(() => {
    setName("abcclient");
  });
  return <>此处use client了{name}</>;
}
