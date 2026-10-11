# Lumee design rules

## Direction

Use Skeu (https://www.skeu.app/) as the reference for control
construction, layering, compact sizing, hover feedback, drawers,
and motion.

Keep Lumee's editorial serif headings, warm neutral surfaces,
orange actions, and existing school artwork. Borrow the physical
clarity of its components; write Lumee's own concise, functional copy.

## Surfaces and controls

Use white text and white foreground icons on solid orange
backgrounds, including orange action buttons, in both themes.
Keep --accent-foreground white.

Reuse app/globals.css and Workspace.module.css tokens.
Never scale the whole interface with a transform or percentage.

Use a warm background, raised paper panels, inset input/control
trays, and softly raised selected controls.

| Element | Treatment |
| --- | --- |
| Floating planner | 24 px outer radius; thin tinted border; top inner highlight; short contact shadow plus restrained diffuse shadow |
| Inner task/input rows | 9–12 px radius; subtle inset shadow where the row is interactive |
| Segmented switches | 3–4 px inset tray padding; selected segment on raised paper; 30 px desktop control height |
| Task completion | 21 px circle; 1.6 px outline; --accent checked fill and --accent-foreground check |
| Schedule pickers | Raised 22 px calendar/time popovers; inset time selectors; accent selected day; 44 px calendar day targets |
| Sharing choices | Two segments in one recessed tray; title and one sentence describing the meaningful tradeoff |
| Slider | Thin inset track; 23 px rounded dark handle with top highlight and contact shadow; visible numeric value |
| Shared drawer | Warm pale yellow, dark readable text, 14 px bottom corners, slightly inset from its card |
| Buttons | Rounded existing Lumee controls; small hover lift and pressed displacement; focus remains obvious |
| Dialog | Native modal semantics, soft raised surface, short arrival transition, focus returned to the invoking control |

Use the inherited color-scheme tokens for light and dark surfaces.
Shared yellow drawers must keep readable dark text in both themes.
Do not mix pure white control interiors into dark surfaces.

## Motion and interaction

- Ordinary hover/selection transitions: 180 ms.
  Existing dialog arrival: 220 ms. Content arrival: 260 ms.
- Animate transform, opacity, and carefully scoped color/shadow
  changes. Avoid layout motion for task completion.
- Hover lift is at most 2 px; a pressed control moves 1 px or
  scales to 0.985. A completion circle may scale to 0.92 while pressed.
- A selected segment becomes raised without shifting labels.
  Disclosure controls reveal only useful scheduling or history actions.
- Task drawers animate a scoped grid row from 0fr to 1fr over
  240 ms, with a short opacity and 5 px content transition.
  Closed content is inert and hidden from assistive technology.
  The new-task scheduling drawer follows the same motion.
  Disable these transitions for reduced motion.
- Preserve keyboard focus, Escape handling, dialog focus management,
  and accessible names for every icon-only control.
- Honor prefers-reduced-motion; remove translation, scale,
  and entry animations.
- Coarse-pointer controls retain at least 44 px hit areas.
- Provide menu alternatives to drag actions.

## Copy discipline

Every visible label must help someone act, identify content,
or understand a meaningful state.

Do not add slogans, decorative headings, empty whiteboard labels,
invented analytics, or explanatory paragraphs beside obvious controls.

Keep source notes, learning content, useful navigation, errors,
and accessible names.

Place operation feedback next to the operation or in the existing
compact notifications.
