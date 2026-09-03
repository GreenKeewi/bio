"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  return <div className={`t-fade ${shown ? "is-shown" : ""} ${className}`}>{children}</div>;
}
