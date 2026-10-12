# Red panda source and ASCII conversion

`source.png` is an original 1254 × 1254 transparent image generated with the built-in image-generation tool on 2026-10-11. It stays outside `public/`; visitors load the ASCII output, not the source photograph.

Prompt: A high-resolution photorealistic wildlife cutout of a real red panda sitting, with the entire body and curled ring-striped tail visible. Slight three-quarter angle looking toward the viewer, rust-orange fur, creamy white face markings, dark legs, soft natural light, detailed individual fur strands, natural proportions. Genuinely transparent background, no floor, shadow, scenery, text, or props.

Run `python scripts/convert-red-panda.py` with Pillow installed to regenerate:

- `public/art/red-panda-ascii.json`: 240 × 180 cells, luminance-based ASCII glyphs, 224 colours, packed cell data.
- `public/art/red-panda-ascii.png`: high-resolution static ASCII fallback, including for JavaScript-disabled browsers.

The client paints real coloured glyphs into a cached canvas, then moves strips of that painting at 24 fps. The motion is a gentle head sway and breathing effect; it does not request a generated video. There are no visible playback controls. Reduced motion stays still, and hidden/offscreen pages stop repainting.

The preview converter uses Consolas on Windows and DejaVu Sans Mono elsewhere. Fonts are used to rasterize the fallback and are not distributed with this artwork. The web canvas uses the browser's monospace fallback.
