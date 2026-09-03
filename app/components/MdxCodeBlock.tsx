import type { ReactNode, ReactElement } from "react";
import Mermaid from "./Mermaid";

function getText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getText((node as ReactElement<{ children?: ReactNode }>).props.children);
  }
  return "";
}

export function Pre({ children }: { children?: ReactNode }) {
  const child = Array.isArray(children) ? children[0] : children;
  const className =
    child && typeof child === "object" && "props" in child
      ? (child as ReactElement<{ className?: string }>).props.className
      : undefined;

  if (className === "language-mermaid") {
    return <Mermaid chart={getText(children)} />;
  }

  return (
    <pre className="my-5 overflow-x-auto rounded-md border border-[var(--line)] bg-[#1a1a1c] p-4 text-[12.5px] leading-relaxed">
      {children}
    </pre>
  );
}
