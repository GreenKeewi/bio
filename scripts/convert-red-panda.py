"""Convert the high-resolution source into colored ASCII and a no-JS preview.

Requires Pillow. Run from the repository root: python scripts/convert-red-panda.py
The browser consumes only the ASCII output, never the source photograph.
"""

import base64
import json
import struct
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
COLUMNS, ROWS = 240, 180
SIZE = 1920
GLYPHS = ".,:;+=xX$&#@"

source = Image.open(ROOT / "assets/red-panda/source.png").convert("RGBA")
pixels = source.resize((COLUMNS, ROWS), Image.Resampling.LANCZOS)
palette, color_ids, cells = [], {}, []
preview = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
draw = ImageDraw.Draw(preview)
font_path = Path("C:/Windows/Fonts/consola.ttf")
font = ImageFont.truetype(str(font_path) if font_path.exists() else "DejaVuSansMono.ttf", 13)

for row in range(ROWS):
    for column in range(COLUMNS):
        red, green, blue, alpha = pixels.getpixel((column, row))
        if alpha < 64:
            cells.append(0)
            continue
        luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
        glyph_id = min(len(GLYPHS) - 1, round((1 - luminance) * (len(GLYPHS) - 1)))
        # White facial fur remains legible on the white page. The natural orange
        # and brown colors are preserved, with a modest ink-like darkening.
        color = tuple(min(208, round(channel * 0.84 / 16) * 16) for channel in (red, green, blue))
        if color not in color_ids:
            color_ids[color] = len(palette)
            palette.append("#" + "".join(f"{channel:02x}" for channel in color))
        cells.append(((color_ids[color] + 1) << 4) | glyph_id)
        draw.text((column * SIZE / COLUMNS, row * SIZE / ROWS), GLYPHS[glyph_id], font=font, fill=(*color, alpha), anchor="lt")

output = ROOT / "public/art"
output.mkdir(parents=True, exist_ok=True)
preview.save(output / "red-panda-ascii.png", optimize=True)
(output / "red-panda-ascii.json").write_text(json.dumps({
    "columns": COLUMNS,
    "rows": ROWS,
    "glyphs": GLYPHS,
    "palette": palette,
    "cells": base64.b64encode(struct.pack(f"<{len(cells)}H", *cells)).decode("ascii"),
}, separators=(",", ":")))
print(f"Converted {source.width}x{source.height} source to {COLUMNS}x{ROWS} colored ASCII; {len(palette)} ink colors.")
