// Static ASCII backdrop for the reading pages, same field as the tree world.
import { grid, W } from "./world";

export default function Texture() {
  const { chr, cls } = grid();
  const rows: string[] = [];
  for (let y = 0; y < 80; y++) {
    let r = "";
    for (let x = 0; x < 260; x++) r += cls[y * W + x] === 0 ? chr[y * W + x] : " ";
    rows.push(r);
  }
  return <pre className="page-texture" aria-hidden="true">{rows.join("\n")}</pre>;
}
