# DESIGN.md

Design direction for kroue-dev, the portfolio of Aljohn Arranguez.

> **Authorship warning.** The owner chose to have this direction written by the
> agent rather than authoring it. Agent-generated style trends toward default AI
> taste, which is the slop antislop exists to filter. Treat this file as a
> starting point to overwrite, not as settled identity. Where a choice below is
> arbitrary, it is marked `[agent choice]`.

## Brief

- **Product**: a personal portfolio, one page plus a private admin console at `/overseer`.
- **Audience**: hiring managers screening for full-stack and mobile roles, and small businesses looking for a freelance developer.
- **Job the page does**: convince a skim-reader in 30 seconds that this person ships real systems for paying clients, then give them a way to make contact.
- **Mood**: a working engineer's page. Confident, specific, slightly severe. Not a marketing site.

## Dials

`Dial: ENERGY 3 / RHYTHM 3 / MOTION 2`

Set by the owner. ENERGY 3 means the page says hello hard: oversized type, asymmetric compositions, a live 3D scene. RHYTHM 3 means sections must visibly differ from one another. MOTION 2 means scroll-reveal and transitions, not parallax or pinned choreography, and nothing that loops forever.

## Identity

- **Motif**: the angle bracket. It appears in the wordmark `<kuroe/>`, the favicon, and the `// lowercase` section kickers. One motif, repeated, in the vocabulary of the trade.
- **Surface language**: flat and square. No radius on rectangles, no ambient shadow, no glass. Depth comes from a four-step near-black ramp, not from blur or elevation.
- **Voice**: plain declaratives with concrete nouns. Names the client, the stack, the constraint. Never sells.

## Palette

One chromatic accent (violet) plus one companion (pink) used only as the gradient terminus. Everything else is a desaturated near-black ramp, which reads as neutral and does not count toward the R-29 cap.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#191825` | Page ground |
| `--surface` | `#242236` | Cards |
| `--surface-2` | `#2e2c45` | Chips, inset fields |
| `--surface-3` | `#383654` | Hover surfaces |
| `--text-primary` | `#ffffff` | Headings, key values |
| `--text-muted` | `#b8b6db` | Body copy |
| `--text-subtle` | `#9b98c6` | Meta, dates, captions |
| `--accent` | `#a58aff` | Accent for text and marks |
| `--accent-strong` | `#5b2fe0` | Accent for fills carrying white text |
| `--accent-soft` | `#ffa3fd` | Gradient terminus on headings only |

Every pairing in use is verified with the antislop contrast checker. `--accent` and `--accent-strong` are two tints of one hue, split by role: the light tint is the only one legible as small text on dark, and the dark tint is the only one that carries white text at AA.

## Typography

- **Inter** for prose. Chosen because the body copy is dense résumé detail that has to stay readable at 0.85rem on a dark ground, and Inter's tall x-height holds up there. `[agent choice]` among several neutral sans options.
- **JetBrains Mono** for labels, metadata, and the terminal. The page is about writing software, and the mono voice carries that without decoration. It is confined to short strings so it never becomes body text.
- Fluid scale via `clamp()` so type reflows with the viewport instead of carrying desktop sizes onto a phone.

## Motion

Allowed at MOTION 2: scroll-triggered reveals, clip-path section curtains, hover and focus transitions, one typewriter pass that settles.

Not allowed: anything that loops forever, parallax, scroll-pinning, or more than one reveal per element.

## Owner overrides (R-37)

The owner was shown each collision and chose to keep these. Each is recorded with the purpose that justifies it.

| Element | Rule | Owner decision and purpose |
| --- | --- | --- |
| Terminal card in About | R-05 fake terminal window | **Keep.** It is not a costume: it is a real command interpreter with `whoami`, `skills`, `experience`, `projects`, `education`, `languages`, `contact`. It is the page's interactive proof of the skill it claims. |
| 3D hero geometry and skill orb | R-04 AI orb, R-22 generic 3D | **Keep.** The orb's rings group the stack by category and its labels link to real docs, so it carries information. The hero geometry is decoration, kept as the ENERGY 3 opening gesture. |
| Violet gradient headings | R-01 purple scheme | **Keep.** Confined to section headings as a hierarchy marker, so heading level reads before the words do. Never on buttons, borders, or backgrounds. |
| `// lowercase` mono kickers | R-09 eyebrow, R-06 mono | **Keep.** They are the repeated identity motif, set lowercase in a code-comment voice rather than wide-tracked uppercase, and they name the section rather than restating the heading. |

## Decisions log (R-31)

| Decision | Reason |
| --- | --- |
| Near-black violet ground, no light theme | The page's centrepiece is a terminal, and the audience reads it in developer contexts; R-21 grants dark a legitimate reason here. |
| One accent hue at two tints | A single hue keeps the palette inside R-29 while still giving fills and text each a tint that passes AA. |
| No background pattern on any section | Grid, dots, and hatching are named slop (R-07) and the owner did not keep them; composition and the 3D scene carry the visual interest instead. |
| Stack tiers share one accent, differentiated by label and order | Four hues for four tiers broke R-29 and encoded meaning in colour alone; the label already names the tier. |
| Square rectangles, pills only for true pills | Radius is a hierarchy tool, so one shape language for cards and controls, with round reserved for the social buttons and the status dot. |
| Sections size to content, not `100vh` | A fixed viewport height becomes a slab on a phone and pushes real content below the fold. |
| Three layout states, not two | A single `lg:` breakpoint left the 768 to 1023 band as a stretched phone stack. |
| Experience uses tabs | Every résumé bullet stays on the page while the section still fits one screen, which is what lets section snapping work. |
| Project links in the card footer | They previously sat under the oversized index number and collided with it. |
| Every project expands into a full-screen case file | The owner asked to see each project's whole design. Cards show the project's own first screen as a cover; the case file groups real captures by product surface (admin console, public website, mobile), with a lightbox for full size. Real screenshots are the evidence antislop asks for in place of decorative mockups. |
| Case files live in the URL (`?project=id`) | A case file can be linked directly, and the back button closes it, which is what phone users reach for first. |
| No device chrome around captures | A desktop capture keeps only an address strip carrying the real URL it was taken from; phones get a plain border. Fake window dots and bezels would be costume. |
| Screens showing customer data are left out | NVAGo's customer list and order queue show real people's names and emails, so they were captured for review and not published. |
