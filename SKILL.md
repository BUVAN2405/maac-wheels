---
name: anti-slop-ui
description: Build or rebuild websites and UI so they look professionally designed instead of generic AI output. Use whenever the user asks to build, generate, redesign, or fix any website, landing page, dashboard, web app UI, or frontend copy, and whenever they say a UI or text looks "slop", "generic", "AI-looking", or "template-like". Picks fonts, palette, layout, and copy based on the TYPE of website (photography studio, restaurant, SaaS, education, real estate, e-commerce, portfolio, etc.). Stack default is React + Vite + Tailwind CSS.
---

# Anti-Slop UI

Goal: output that looks designed by a person with taste, for one specific client, not an average of the internet.

## Step 0: Intake (do this before writing any code)

Work out these from the user's request. Ask at most ONE question, only if the site type is truly unclear. Otherwise state assumptions in one line and build.

1. **Site type** (see the type table below)
2. **Mood in 3 words** (e.g. "warm, editorial, calm")
3. **Real content available**: services, prices, location, story, photos, phone/WhatsApp. If none, use clearly marked placeholders, never invented marketing fluff.
4. **One reference site** to borrow structure and rhythm from (not to copy)

## Step 1: Pick fonts by website type

Choose ONE row. Use 2 families max (display + body), plus mono only if needed. All are on Google Fonts. Load only the weights used.

| Site type | Display / heading | Body | Feel |
|---|---|---|---|
| Photography / wedding / studio | Cormorant Garamond, Playfair Display, or Fraunces | DM Sans or Jost | Elegant, editorial, quiet |
| Restaurant / cafe / bakery | Fraunces, DM Serif Display, or Recoleta-style (Gloock) | Nunito Sans or Karla | Warm, appetizing |
| Luxury / jewelry / fashion | Bodoni Moda, Cormorant, or Italiana | Jost or Manrope | Refined, high contrast |
| SaaS / B2B / dashboard | Geist, Plus Jakarta Sans, or Manrope | Same family or Inter Tight | Clean, precise, trustworthy |
| Fintech / banking / legal | IBM Plex Serif or Source Serif 4 for headings | IBM Plex Sans | Serious, stable |
| Education / coaching / UPSC / academy | Source Serif 4, Merriweather, or Bitter | Public Sans or Noto Sans | Credible, readable |
| Healthcare / clinic | Figtree or Lexend | Same family | Calm, accessible |
| Real estate | Playfair Display or Libre Baskerville | Manrope or Outfit | Premium, trustworthy |
| E-commerce (general) | Outfit, Sora, or Space Grotesk | DM Sans | Crisp, product-first |
| Automotive / 3D / accessories / sports | Barlow Condensed, Oswald, or Rajdhani | Barlow or Exo 2 | Bold, fast, technical |
| Gaming / tech / futuristic | Space Grotesk, Orbitron (sparingly), or Chakra Petch | JetBrains Mono for accents | Edgy, sharp |
| Portfolio (developer) | Space Grotesk, Syne, or Bricolage Grotesque | DM Sans + JetBrains Mono | Personal, confident |
| Portfolio (creative / agency) | Bricolage Grotesque, Syne, or Instrument Serif | Instrument Sans | Expressive |
| Kids / toys / playful | Baloo 2, Fredoka, or Nunito | Nunito | Friendly, rounded |
| Non-profit / civic / government | Source Serif 4 or Merriweather | Noto Sans | Plain, trustworthy |
| Blog / magazine / news | Newsreader, Lora, or Fraunces | Source Sans 3 | Editorial, readable |
| Tamil / multilingual content | Noto Sans Tamil / Noto Serif Tamil, Catamaran, or Mukta Malar | Same as heading | Always test Tamil glyphs |

Font rules:
- Never default to Inter or Roboto for display text. Inter is acceptable as body only when the type table calls for a neutral UI font.
- Pair contrast, not similarity: serif + sans, or condensed + wide, or geometric + humanist.
- Type scale: base 16px, ratio about 1.25. Body line height 1.6, headings 1.1 to 1.25. Max line length 60 to 75 characters.
- Self-host or use `font-display: swap`. Always give a fallback stack.
- Set heading letter-spacing slightly negative on large sizes (`-0.02em`), slightly positive on small caps/labels.

## Step 2: Tokens (define before any component)

Put these in `tailwind.config` (or CSS variables). After that, forbid arbitrary values like `text-[13px]` or `bg-[#7c3aed]`.

- **Color**: 1 brand color, 1 accent used sparingly, 4 to 5 neutrals tinted toward the brand hue (not pure gray), plus success/warning/error. Contrast AA minimum (4.5:1 body, 3:1 large text).
- **Palette by type**: warm earth/cream for food and photography, deep navy + one bright accent for SaaS, black + gold or ivory for luxury, saturated primary + dark neutrals for automotive, soft blue/green for health.
- **Spacing**: 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- **Radius**: pick ONE personality: sharp (0 to 2px), soft (8 to 12px), or pill. Do not mix.
- **Shadow**: 2 levels max. Prefer borders over shadows for a cleaner look.

## Step 3: Hard bans (the slop tells)

Never produce these unless the client explicitly asks:
- Purple/indigo-to-blue gradients, gradient text on headings, glowing blobs
- Glassmorphism cards without a reason
- Emoji used as icons (use Lucide or Phosphor, one icon set only)
- The default stack of: centered hero with two buttons, 3 identical feature cards, 3 testimonial cards, big CTA banner
- Every section in a rounded card with a shadow
- Stock-looking gray placeholder boxes with no content
- Fade-up animation on every element
- Tailwind default `blue-500`, `indigo-600`, `slate-*` unchanged

## Step 4: Layout rules

- Every section has a distinct job AND a distinct layout. Rotate between: split text/image, full-bleed image with overlay text, asymmetric grid, horizontal timeline, big-number stats row, list with hairline dividers, bento (sparingly), sticky side heading with scrolling content.
- Start from a clear grid (12-col, max-width 1200 to 1320px). Align everything to it.
- Whitespace is a feature: section padding 96 to 160px desktop, 64 to 80px mobile.
- One primary action per screen. Secondary actions are text links, not a second filled button.
- Mobile first. Test at 375px. Thumb-reachable primary CTA.
- Prefer real photography and real product imagery. If none exists, use typography, color blocks, or simple SVG shapes instead of fake stock.

## Step 5: UX states (AI usually skips these)

Every interactive element needs: hover, focus-visible ring, active, disabled, loading. Every data view needs: loading skeleton, empty state with a next action, error state with retry. Forms need inline validation and clear success feedback. Add a visible keyboard focus style and semantic HTML (`nav`, `main`, `section`, `button` not clickable `div`).

## Step 6: Copywriting rules

Copy is the biggest slop tell. Rules:
1. **Use real facts only** from the client: services, prices, location, years, numbers, names. If missing, write `[CLIENT: add X]` instead of inventing.
2. **Banned phrases**: unlock, elevate, seamless, revolutionize, empower, supercharge, game-changer, cutting-edge, next-level, leverage, "your journey starts here", "in today's fast-paced world", "we are passionate about", "one-stop solution", "tailored solutions", "beyond expectations", "capturing your precious moments".
3. **Be specific and short**: "Wedding films delivered in 3 weeks" beats "Timeless memories, beautifully captured". Headline under 10 words. Button labels are verbs: "Book a shoot", "See pricing", "Call now".
4. **Voice**: a local business owner talking to a customer. Plain words, active voice, no hype.
5. **No em-dash spam, no triple-adjective lists, no "Not just X, but Y" pattern.**
6. For Tamil or bilingual sites, write natively, do not machine-translate marketing English. Keep the same specificity.

## Step 7: Build in passes

1. Structure and layout (greyscale, real copy)
2. Typography
3. Color and imagery
4. States, forms, responsiveness
5. Motion: only hero entrance, hover feedback, and scroll reveal on 1 or 2 key sections. Respect `prefers-reduced-motion`.

## Step 8: Audit checklist (run before delivering)

- [ ] Could this exact text appear on 1000 other sites? Rewrite it.
- [ ] Can I name the font, color, and reference behind every choice?
- [ ] Does every section have a different job and layout?
- [ ] Any banned phrase, gradient, emoji icon, or default Tailwind color left?
- [ ] Only tokens used, no arbitrary values?
- [ ] Contrast passes AA, focus rings visible, works at 375px?
- [ ] Loading, empty, error states exist?
- [ ] Fonts match the site type table and load fast?

## Output format

When delivering, start with a 3-line design brief: site type, font pairing with the reason, palette and mood. Then give the code. End with any `[CLIENT: ...]` placeholders the user must fill with real content.
