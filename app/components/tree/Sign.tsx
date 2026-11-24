import type { ReactNode } from "react";

export type SignRow =
  | { kind: "item"; text: string; href?: string }
  | { kind: "sub"; text: string }
  | { kind: "gap" }
  | { kind: "links"; links: { text: string; href: string }[] };

export type SignData = {
  id: string;
  station: string;
  title: string;
  count?: string;
  x: number; // left edge, in world columns
  y: number; // top border row
  hang: number; // rope rows above the board
  w: number; // inner width in columns
  rows: SignRow[];
};

const pad = (n: number) => " ".repeat(Math.max(0, n));

function rowContent(r: SignRow, w: number): ReactNode {
  if (r.kind === "gap") return pad(w);
  if (r.kind === "sub") return <span className="s-sub">{`  ${r.text}`.padEnd(w)}</span>;
  if (r.kind === "item") {
    const body = r.href ? (
      <a href={r.href} {...(r.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{r.text}</a>
    ) : (
      <span className="s-item">{r.text}</span>
    );
    return (
      <>
        {body}
        {pad(w - r.text.length)}
      </>
    );
  }
  let used = 0;
  const parts: ReactNode[] = [];
  r.links.forEach((l, i) => {
    if (i) {
      parts.push("   ");
      used += 3;
    }
    parts.push(
      <a key={l.text} href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{l.text}</a>,
    );
    used += l.text.length;
  });
  parts.push(pad(w - used));
  return parts;
}

export default function Sign({ s, onFocus }: { s: SignData; onFocus?: () => void }) {
  const total = s.w + 4;
  const ropes: string[] = [];
  for (let i = 0; i < s.hang; i++) {
    const c = i === 0 ? "o" : "|";
    ropes.push(`  ${c}${pad(total - 6)}${c}  `);
  }
  const count = s.count ?? "";
  const dots = s.w - s.title.length - count.length - 2;
  return (
    <section
      className="sign"
      aria-label={s.title.toLowerCase()}
      onFocus={onFocus}
      style={{ left: `calc(${s.x} * var(--cw))`, top: `calc(${s.y - s.hang} * var(--lh))` }}
    >
      {ropes.map((r, i) => (
        <div key={i} className="s-rope" aria-hidden="true">{r}</div>
      ))}
      <div className="s-line" aria-hidden="true">{`.=${"=".repeat(s.w)}=.`}</div>
      <div className="s-line">
        <span aria-hidden="true">| </span>
        <h2 className="s-title">{s.title}</h2> <span aria-hidden="true">{".".repeat(Math.max(1, dots))}</span>{" "}
        <span className="s-count">{count}</span>
        <span aria-hidden="true">{count ? " |" : " |"}</span>
      </div>
      <div className="s-line" aria-hidden="true">{`| ${"-".repeat(s.w)} |`}</div>
      {s.rows.map((r, i) => (
        <div key={i} className="s-line">
          <span className="s-edge" aria-hidden="true">| </span>
          {rowContent(r, s.w)}
          <span className="s-edge" aria-hidden="true"> |</span>
        </div>
      ))}
      <div className="s-line" aria-hidden="true">{`'${"=".repeat(s.w + 2)}'`}</div>
    </section>
  );
}

export function signHeight(s: SignData) {
  return s.rows.length + 4;
}
