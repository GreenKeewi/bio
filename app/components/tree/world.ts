// Procedural ASCII tree. Pure and seeded, so the server (sign placement)
// and the browser (drawing the world) agree on every limb.

export const W = 480;
export const H = 190;

type Seg = [x0: number, y0: number, x1: number, y1: number, r0: number, r1: number];
export type Point = { x: number; y: number };

function rng(seed: number) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    random: next,
    uniform: (lo: number, hi: number) => lo + (hi - lo) * next(),
    int: (lo: number, hi: number) => lo + Math.floor(next() * (hi - lo + 1)),
    pick: <T,>(s: string | T[]) => s[Math.floor(next() * s.length)] as T | string,
    gauss: (mu: number, sd: number) => {
      const u = 1 - next();
      const v = next();
      return mu + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
  };
}

const rad = (d: number) => (d * Math.PI) / 180;

export type Skeleton = { segs: Seg[]; tips: Point[]; limbs: { built: Point; work: Point; writing: Point; links: Point } };

let cached: Skeleton | null = null;

export function skeleton(): Skeleton {
  if (cached) return cached;
  const R = rng(11);
  const segs: Seg[] = [];
  const tips: Point[] = [];
  const limb = (x: number, y: number, ang: number, ln: number, r: number, depth: number, maxd: number): Point => {
    const x1 = x + Math.cos(ang) * ln * 2;
    const y1 = y - Math.sin(ang) * ln;
    const r1 = r * 0.72;
    segs.push([x, y, x1, y1, r, r1]);
    if (depth === maxd) {
      tips.push({ x: x1, y: y1 });
      return { x: x1, y: y1 };
    }
    const n = depth < maxd - 1 ? 2 : R.random() < 0.5 ? 2 : 3;
    const spread = n === 2 ? [-0.45, 0.42] : [-0.55, 0.05, 0.5];
    for (const da of spread) {
      const a = Math.max(rad(15), Math.min(rad(165), ang + da + R.uniform(-0.18, 0.18)));
      limb(x1, y1, a, ln * R.uniform(0.6, 0.75), r1, depth + 1, maxd);
    }
    return { x: x1, y: y1 };
  };
  segs.push([240, 188, 240, 150, 15, 11]);
  segs.push([240, 150, 238, 118, 11, 9]);
  const built = limb(236, 124, rad(150), 34, 7.5, 1, 5);
  const work = limb(244, 126, rad(28), 34, 7.5, 1, 5);
  const writing = limb(239, 118, rad(96), 30, 7, 1, 5);
  const links = limb(244, 145, rad(12), 22, 4.5, 2, 5);
  for (const [ex, ey] of [[200, 189], [280, 189], [222, 189], [262, 189], [180, 189], [300, 189]]) {
    segs.push([240, 182, ex, ey, 6, 1.5]);
  }
  cached = { segs, tips, limbs: { built, work, writing, links } };
  return cached;
}

// Cell classes: 0 empty (texture), 1 bark edge, 2 bark grain, 3 ground, 4 leaf
export function grid() {
  const { segs, tips } = skeleton();
  const R = rng(29);
  const BS = "\\";
  const cls = new Uint8Array(W * H);
  const chr: string[] = new Array(W * H).fill("");
  const cells = new Map<number, { edge: boolean; ang: number; f: number }>();

  for (const [x0, y0, x1, y1, r0, r1] of segs) {
    const mr = Math.max(r0, r1);
    const ang = Math.atan2(-(y1 - y0), (x1 - x0) / 2);
    const ax = x0 / 2, ay = y0, vx = x1 / 2 - ax, vy = y1 - ay;
    const L = vx * vx + vy * vy || 1e-9;
    for (let y = Math.max(0, Math.floor(Math.min(y0, y1) - mr - 2)); y <= Math.min(H - 1, Math.ceil(Math.max(y0, y1) + mr + 2)); y++) {
      for (let x = Math.max(0, Math.floor(Math.min(x0, x1) - 2 * mr - 2)); x <= Math.min(W - 1, Math.ceil(Math.max(x0, x1) + 2 * mr + 2)); x++) {
        const qx = x / 2;
        const t = Math.max(0, Math.min(1, ((qx - ax) * vx + (y - ay) * vy) / L));
        const dd = Math.hypot(qx - (ax + vx * t), y - (ay + vy * t));
        const rr = (r0 + (r1 - r0) * t) / 2 + 0.35;
        if (dd <= rr) {
          const k = y * W + x;
          const prev = cells.get(k);
          const edge = dd > rr - 0.75;
          if (!prev || (prev.edge && !edge)) cells.set(k, { edge, ang, f: dd / rr });
        }
      }
    }
  }

  for (const [k, { edge, ang }] of cells) {
    const a = (((ang * 180) / Math.PI) % 180 + 180) % 180;
    if (edge) {
      let ch: string;
      if (a > 60 && a < 120) ch = cells.has(k - 1) ? ")" : "(";
      else if (a <= 60) ch = "/";
      else ch = BS;
      if (a < 20 || a > 160) ch = cells.has(k - W) ? "-" : "_";
      cls[k] = 1;
      chr[k] = ch;
    } else {
      let ch: string;
      if (R.random() < 0.75) {
        const base = a < 25 || a > 155 ? "=~-_" : a < 70 ? "//'/" : a < 110 ? "||:!" : `${BS}${BS}\`${BS}`;
        ch = R.random() < 0.05 ? (R.pick("o@0") as string) : (R.pick(base) as string);
      } else ch = R.pick(" .:") as string;
      cls[k] = 2;
      chr[k] = ch;
    }
  }

  const free = (x: number, y: number) => x >= 0 && x < W && y >= 0 && y < H && cls[y * W + x] === 0;
  for (const t of tips) {
    const n = R.int(2, 9);
    for (let i = 0; i < n; i++) {
      const x = Math.round(t.x + R.gauss(0, 4));
      const y = Math.round(t.y + R.gauss(0, 1.6));
      if (free(x, y)) {
        cls[y * W + x] = 4;
        chr[y * W + x] = R.pick("*%o&,'") as string;
      }
    }
    for (let j = 0; j < 2; j++) {
      let x = Math.round(t.x);
      let y = Math.round(t.y);
      const dx = R.random() < 0.5 ? -1 : 1;
      const len = R.int(2, 5);
      for (let i = 0; i < len; i++) {
        y -= 1;
        x += dx * (R.random() < 0.67 ? 1 : 0);
        if (free(x, y)) {
          cls[y * W + x] = 1;
          chr[y * W + x] = dx > 0 ? "/" : BS;
        }
      }
    }
  }
  for (let i = 0; i < 60; i++) {
    const x = R.int(0, W - 1);
    const y = R.int(20, H - 1);
    if (free(x, y)) {
      cls[y * W + x] = 4;
      chr[y * W + x] = R.pick(",'.`") as string;
    }
  }
  for (let x = 0; x < W; x++) {
    for (const y of [187, 188, 189]) {
      if (free(x, y) && R.random() < 0.5) {
        cls[y * W + x] = 3;
        chr[y * W + x] = R.pick("_.,-~") as string;
      }
    }
  }

  // background texture for every empty cell
  const ramp = " .,:-~=";
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const k = y * W + x;
      if (cls[k] !== 0) continue;
      const v = (Math.sin(x * 0.07 + y * 0.11) + Math.cos(y * 0.13 - x * 0.05) + Math.sin((x + y) * 0.021)) / 3;
      const d = ((v + 1) / 2) * 0.9 + R.uniform(-0.15, 0.15) - 0.1;
      chr[k] = ramp[Math.max(0, Math.min(ramp.length - 1, Math.floor(d * ramp.length)))];
    }
  }
  return { cls, chr };
}

const TAGS = ["t", "e", "b", "g", "l"];

export function worldHTML() {
  const { cls, chr } = grid();
  const rows: string[] = [];
  for (let y = 0; y < H; y++) {
    let row = "";
    let cur = -1;
    let buf = "";
    for (let x = 0; x < W; x++) {
      const k = y * W + x;
      const c = cls[k];
      const ch = chr[k] === "<" ? "&lt;" : chr[k] === "&" ? "&amp;" : chr[k];
      if (c !== cur) {
        if (buf) row += `<${TAGS[cur]}>${buf}</${TAGS[cur]}>`;
        cur = c;
        buf = "";
      }
      buf += ch;
    }
    row += `<${TAGS[cur]}>${buf}</${TAGS[cur]}>`;
    rows.push(row);
  }
  return rows.join("\n");
}
