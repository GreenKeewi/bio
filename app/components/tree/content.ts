import { skeleton } from "./world";
import { signHeight, type SignData, type SignRow } from "./Sign";

export type Station = {
  id: string;
  cx: number;
  cy: number;
  nav: { label: string; to: string; dir: "left" | "right" | "up" | "down" }[];
};

export type PostLink = { slug: string; title: string; date: string };

const R = Math.round;

function hangUnder(id: string, station: string, title: string, at: { x: number; y: number }, w: number, rows: SignRow[], count?: string, hang = 4): SignData {
  return { id, station, title, count, w, rows, hang, x: R(at.x - (w + 4) / 2), y: R(at.y + 3 + hang) };
}

export function buildTree(posts: PostLink[]) {
  const { limbs } = skeleton();

  const about: SignData = {
    id: "about",
    station: "start",
    title: "ABOUT",
    w: 36,
    hang: 0,
    x: 220,
    y: 128,
    rows: [
      { kind: "item", text: "hey, i'm harsh." },
      { kind: "sub", text: "15 / toronto / coding since 9" },
      { kind: "sub", text: "i build websites and apps." },
      { kind: "gap" },
      { kind: "sub", text: "have an idea? i'd love to hear it." },
      { kind: "sub", text: "harshithseeta[@]gmail[.]com" },
    ],
  };

  const links = hangUnder("links", "start", "LINKS", limbs.links, 31, [
    {
      kind: "links",
      links: [
        { text: "x.com", href: "https://x.com/harshTalksAI" },
        { text: "github", href: "https://github.com/GreenKeewi" },
        { text: "email", href: "mailto:harshithseeta@gmail.com" },
        { text: "blog", href: "/blog" },
      ],
    },
  ], "04", 3);

  const built = hangUnder("built", "built", "BUILT", limbs.built, 36, [
    { kind: "item", text: "i need investors", href: "https://ineedinvestors.vercel.app/" },
    { kind: "sub", text: "15k investors. filter, csv, mcp." },
    { kind: "item", text: "lumee", href: "https://lumee.harshs.dev" },
    { kind: "item", text: "solin", href: "https://heysolin.com" },
    { kind: "item", text: "fable", href: "https://usefable.ca" },
  ], "04", 5);

  const work = hangUnder("work", "work", "WORK", limbs.work, 32, [
    { kind: "item", text: "dreamwork", href: "https://x.com/dreamworkhq" },
    { kind: "sub", text: "gtm intern. now." },
    { kind: "item", text: "the home depot", href: "https://x.com/homedepot" },
    { kind: "item", text: "nee", href: "https://x.com/neeonline" },
  ], "03", 5);

  const writingRows: SignRow[] = [];
  posts.forEach((p, i) => {
    if (i) writingRows.push({ kind: "gap" });
    writingRows.push({ kind: "item", text: p.title.toLowerCase(), href: `/blog/${p.slug}` });
    writingRows.push({ kind: "sub", text: p.date.replace(/-/g, ".") });
  });
  const ww = Math.min(64, Math.max(30, ...posts.map((p) => p.title.length)));
  const writing = hangUnder("writing", "writing", "WRITING", limbs.writing, ww, writingRows, String(posts.length).padStart(2, "0"), 3);

  const recipes: SignData = {
    id: "recipes",
    station: "roots",
    title: "FAV RECIPES",
    count: "04",
    w: 30,
    hang: 0,
    x: 262,
    y: 166,
    rows: [
      { kind: "item", text: "gnocchi" },
      { kind: "item", text: "white sauce rigatoni" },
      { kind: "item", text: "lasagna" },
      { kind: "item", text: "tiramisu" },
    ],
  };

  const signs = [about, links, built, work, writing, recipes];
  const mid = (s: SignData) => ({ cx: s.x + (s.w + 4) / 2, cy: s.y + signHeight(s) / 2 - s.hang / 2 });
  const m = (s: SignData) => mid(s);

  const stations: Station[] = [
    {
      id: "start",
      cx: (m(about).cx + m(links).cx) / 2,
      cy: (about.y + links.y + signHeight(links)) / 2,
      nav: [
        { label: "built", to: "built", dir: "left" },
        { label: "work", to: "work", dir: "right" },
        { label: "writing", to: "writing", dir: "up" },
        { label: "roots", to: "roots", dir: "down" },
      ],
    },
    { id: "built", ...m(built), nav: [{ label: "trunk", to: "start", dir: "right" }, { label: "writing", to: "writing", dir: "up" }] },
    { id: "work", ...m(work), nav: [{ label: "trunk", to: "start", dir: "left" }, { label: "writing", to: "writing", dir: "up" }] },
    {
      id: "writing",
      ...m(writing),
      nav: [
        { label: "built", to: "built", dir: "left" },
        { label: "work", to: "work", dir: "right" },
        { label: "trunk", to: "start", dir: "down" },
      ],
    },
    { id: "roots", cx: recipes.x + 17, cy: 172, nav: [{ label: "trunk", to: "start", dir: "up" }] },
  ];
  return { signs, stations };
}
