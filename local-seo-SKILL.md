---
name: local-seo
description: Professional local SEO for small businesses and shop websites, especially in Kumbakonam, Thanjavur, Trichy and other Tamil Nadu towns. Use whenever the user wants SEO, keywords, "rank on top", "show first on Google", meta titles/descriptions, Google Business Profile, schema markup, sitemap, or SEO for dynamic React/Vite/Next.js pages. Also use when the user pastes a shop name, address, services or a website URL and wants keywords, page copy, tags or an SEO audit, even if they never say "SEO" (e.g. "make my site come first in Kumbakonam", "add keywords to my pages").
---

# Local SEO (Tamil Nadu small business focus)

Goal: help a local business rank in Google search and the Maps pack for "service + town" searches, using the same process a professional agency follows. Be honest: nobody can guarantee #1 or a timeline. Local results usually move in 4–12 weeks.

## Workflow

### 1. Intake (extract, don't interrogate)
From whatever the user pasted (text, Google Maps listing, URL, or code), extract:
- Business name, category, services/products, USP
- Address, area/street, town, pincode, phone, hours, website, social links
- Target towns (default: home town + nearby towns, see the "Towns and keyword patterns" section at the end)
- Tech stack (static, WordPress, React/Vite SPA, Next.js)

Ask only for what is missing and essential (usually services and the real address). Never invent phone numbers, addresses, coordinates, reviews or ratings.

### 2. Keyword research (professional method)
1. **Seeds:** 4–6 head terms for the category (e.g. "wedding photographer", "car accessories").
2. **Modifiers:** town, area, pincode, "best", "near me", price/cost, service names, nearby towns.
3. **Language:** add Tamil and Tanglish variants (Tamil script plus town name in Tamil). Many local searches are in Tamil.
4. **Validate** (if web search is available): check Google autocomplete style suggestions and "People also ask" via search; drop terms that make no sense for the business.
5. **Group by intent:** transactional ("book", "price", "best X in town"), local ("near me", area), service long-tail, informational (blog/FAQ), brand.
6. **Map one primary keyword to one page.** Related keywords support it. Never target the same primary keyword on two pages (cannibalization).

Deliver keywords as a grouped table: keyword, intent, target page.

### 3. On-page placement (per page)
| Place | Rule |
|---|---|
| Title (≤60 chars) | Primary keyword first, town, then brand |
| Meta description (≤155) | Keyword, area, benefit, phone/CTA |
| H1 | One per page: primary keyword + town |
| H2/H3 | Services, areas served, FAQ questions |
| First 100 words | Keyword + town + area, naturally |
| URL | Short slug, e.g. `/wedding-photography-in-kumbakonam` |
| Images | Descriptive file name + alt text (`wedding-photography-kumbakonam-1.webp`) |
| Internal links | Keyword-rich anchor text from home to each service page |
| Footer/Contact | NAP identical everywhere |
| Schema | LocalBusiness (+ FAQPage where real FAQs exist) JSON-LD |

Write natural copy. Keyword density is not a goal; never stuff or hide keywords.

### 4. Dynamic pages and technical SEO
This is where most developer-built sites fail.
- **Rendering:** A plain client-side React/Vite SPA serves an empty HTML shell. Recommend Next.js (SSR/SSG) or prerendering so titles, H1 and content are in the initial HTML. If the site must stay a SPA, add prerendering for all public routes.
- **Per-route metadata:** unique title, description, canonical, Open Graph per route. React: `react-helmet-async`. Next.js: `generateMetadata`.
- **Sitemap + robots:** generate `sitemap.xml` from the same route/data list that builds the dynamic pages; reference it in `robots.txt`; submit in Google Search Console.
- **Routing:** real URLs (`/service/slug`), not hash routes or query-only pages. Return a real 404 for unknown slugs.
- **Speed (Core Web Vitals):** WebP/AVIF images with width/height, lazy-load below the fold, compress, fonts `display=swap`. Target LCP < 2.5 s on mobile.
- **Mobile + HTTPS:** click-to-call button, Maps link, readable tap targets.
- **Dynamic template pattern** (service × town pages): only create a page if it has unique, useful content. Thin duplicate pages with only the town name swapped can hurt rankings.

Snippet to offer (adapt to stack):
```jsx
<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`https://example.com/${slug}`} />
  <script type="application/ld+json">{JSON.stringify(schema)}</script>
</Helmet>
```

### 5. Local / off-page (usually decides who is #1)
1. **Google Business Profile:** claim and verify; exact primary category; all services; hours; 10+ real photos; weekly posts; Q&A; WhatsApp/phone.
2. **Reviews:** ask every customer with the direct review link (send on WhatsApp); reply to all. Never buy or fake reviews.
3. **Citations (NAP consistency):** Justdial, Sulekha, IndiaMart, Facebook, Instagram, Bing Places, Apple Maps, local directories. Same name/address/phone format everywhere.
4. **Local backlinks:** local associations, event/wedding or trade groups, local news, suppliers, partners.
5. **Content:** portfolio/gallery with alt text, area pages, FAQ, blog posts around real customer questions, Tamil content.
6. **Tracking:** Search Console (queries, pages, positions), GBP insights. Monthly: improve pages ranking 4–15, fix coverage errors.

### 6. Output format
Unless the user asks otherwise, produce:
1. Extracted business details (so the user can correct them)
2. Grouped keyword table with target pages
3. Title / meta / H1 for each page
4. Code or config for the user's stack (Helmet or Next metadata, sitemap, JSON-LD)
5. Prioritized action checklist (week 1, week 2–4, ongoing)

Offer files (e.g. `.json` schema, `sitemap` script, `.xlsx` keyword sheet) only when asked.

### 7. Audit mode (user gives a URL or code)
Fetch or read the site, then check: rendered HTML contains title/H1/content; unique meta per page; canonical; sitemap/robots; schema validity; image alt text; NAP consistency; speed risks; mobile usability; broken internal links. Report findings ranked by impact, with the exact fix for each.

## Guardrails
- No guaranteed rankings, no fixed timelines, no "always on top" promises.
- No keyword stuffing, hidden text, doorway pages, fake reviews, fake addresses or purchased link schemes (they risk penalties and a suspended Business Profile).
- Don't fabricate business facts or coordinates; use clear placeholders (e.g. `ADD_LAT`).
- Prefer the user's language level: short, practical, step-by-step; explain jargon in one line.

---

## Towns and keyword patterns

## Kumbakonam (pincode 612001, Thanjavur district)
Nearby towns for "near" / area-served keywords: Swamimalai, Thiruvidaimarudur, Papanasam, Darasuram, Thanjavur, Mayiladuthurai, Tiruvaiyaru, Needamangalam (verify relevance with the business's real service area).
Tamil town names: கும்பகோணம் (Kumbakonam), தஞ்சாவூர் (Thanjavur), திருச்சி (Trichy), மயிலாடுதுறை (Mayiladuthurai), சென்னை (Chennai).
Local flavour that supports content: temples and festivals (Mahamaham), brass/bronze vessels, silk sarees, degree coffee, wedding and event season.

## Keyword pattern bank
- `{service} in {town}` / `best {service} in {town}` / `top {service} in {town}`
- `{service} near me` / `{service} near {area}` / `{service} {pincode}`
- `{service} price in {town}` / `{service} cost`
- `{tamil term} {tamil town}` and `{tamil term} {town}` (mixed)
- `{brand} {town}` / `{brand} reviews` / `{brand} contact number` / `{brand} address`
- Questions: `which is the best {service} in {town}`, `how to choose {service}`, `{service} open now`

## Category seeds (starting points)
Photography: wedding photographer, candid photography, pre wedding shoot, photo studio, videographer
Restaurant: restaurant, veg restaurant, biryani, tiffin, family restaurant
Jewellery: jewellery shop, gold jewellery, silver jewellery
Textiles: silk sarees, saree shop, textiles, boutique
Mobile/electronics: mobile shop, mobile service center, laptop service
Clinic: clinic, dental clinic, hospital, diagnostic center
Salon: beauty parlour, bridal makeup, unisex salon
Auto: car accessories, car service center, tyre shop, car wash
Real estate: plots for sale, property dealers, flats for sale
Coaching: coaching center, tnpsc coaching, upsc coaching, tuition center
IT: web design company, website developer, digital marketing agency, seo services
