import fs from 'fs';
import path from 'path';
import { SERVICES, WORKSHOP_DETAILS } from '../src/data/catalog.ts';
import {
  MASTER_SEO_KEYWORDS,
  HOMEPAGE_FAQS,
  NEARBY_TOWNS,
  getLocalBusinessSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFAQSchema
} from '../src/services/seo.ts';

const PKG_ROOT = path.resolve(import.meta.dirname, '..');
const DIST_DIR = path.join(PKG_ROOT, 'dist');
const PUBLIC_DIR = path.join(PKG_ROOT, 'public');
const REPO_PUBLIC_DIR = path.resolve(PKG_ROOT, '..', 'public');
const BASE_URL = 'https://maacwheels.com';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceTag(
  html: string,
  pattern: RegExp,
  replacement: string
): string {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function buildPageHtml(
  template: string,
  options: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string | null;
    ogType: 'website' | 'article';
    ogImage: string;
    robots: string;
    schemas: object[];
    fallbackBodyHtml: string;
  }
): string {
  let out = template;
  const fullUrl = options.canonicalPath ? `${BASE_URL}${options.canonicalPath}` : BASE_URL;
  const fullImage = options.ogImage.startsWith('http')
    ? options.ogImage
    : `${BASE_URL}${options.ogImage}`;
  const keywordsStr = Array.from(new Set([...options.keywords, ...MASTER_SEO_KEYWORDS])).join(', ');

  out = replaceTag(out, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(options.title)}</title>`);
  out = replaceTag(
    out,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(options.description)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${escapeHtml(keywordsStr)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(options.robots)}" />`
  );

  if (options.canonicalPath) {
    out = replaceTag(
      out,
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${escapeHtml(fullUrl)}" />`
    );
  } else {
    out = replaceTag(out, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, '');
  }

  // Open Graph & Twitter tags
  out = replaceTag(
    out,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(options.title)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(options.description)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${options.ogType}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(fullUrl)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(fullImage)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(options.title)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(options.description)}" />`
  );
  out = replaceTag(
    out,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(fullImage)}" />`
  );

  // Replace JSON-LD script block
  const schemaScripts = options.schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');
  out = replaceTag(
    out,
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    schemaScripts
  );

  // Inject prerendered semantic HTML inside #root for bots/no-JS crawlers
  out = replaceTag(
    out,
    /<div\s+id="root"><\/div>/i,
    `<div id="root">${options.fallbackBodyHtml}</div>`
  );

  return out;
}

function buildHomepageFallbackHtml(): string {
  const serviceLinks = SERVICES.map(
    (s) =>
      `<li><a href="/services/${s.id}">${escapeHtml(s.title)} in Kumbakonam</a> - ${escapeHtml(s.description)}</li>`
  ).join('\n        ');

  const faqList = HOMEPAGE_FAQS.map(
    (f) => `<dt>${escapeHtml(f.question)}</dt><dd>${escapeHtml(f.answer)}</dd>`
  ).join('\n        ');

  return `
    <main>
      <h1>Car Accessories Shop in Kumbakonam</h1>
      <p>${escapeHtml(WORKSHOP_DETAILS.name)} at ${escapeHtml(WORKSHOP_DETAILS.address)}. Phone: ${escapeHtml(WORKSHOP_DETAILS.phone)}. Hours: ${escapeHtml(WORKSHOP_DETAILS.hours)}.</p>
      <h2>Workshop Services</h2>
      <ul>
        ${serviceLinks}
      </ul>
      <h2>Serving Nearby Towns</h2>
      <p>${NEARBY_TOWNS.map(escapeHtml).join(', ')}.</p>
      <p>கார் ஆக்சசரீஸ் கும்பகோணம் (Car Accessories Kumbakonam)</p>
      <h2>Common Questions</h2>
      <dl>
        ${faqList}
      </dl>
    </main>
  `.trim();
}

function buildServiceFallbackHtml(service: (typeof SERVICES)[number]): string {
  const specs = service.specifications
    ? Object.entries(service.specifications)
        .map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`)
        .join('')
    : '';

  const faqs = service.faqs
    ? service.faqs
        .map((f) => `<dt>${escapeHtml(f.question)}</dt><dd>${escapeHtml(f.answer)}</dd>`)
        .join('')
    : '';

  const otherLinks = SERVICES.filter((s) => s.id !== service.id)
    .map((s) => `<li><a href="/services/${s.id}">${escapeHtml(s.title)} in Kumbakonam</a></li>`)
    .join('');

  return `
    <main>
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/#services-section">Services</a> &gt; ${escapeHtml(service.title)} in Kumbakonam</nav>
      <h1>${escapeHtml(service.title)} in Kumbakonam</h1>
      <p>${escapeHtml(service.fullOverview || service.description)}</p>
      ${service.longDescription ? service.longDescription.map((p) => `<p>${escapeHtml(p)}</p>`).join('') : ''}
      <h2>Technical Specifications</h2>
      <dl>${specs}</dl>
      <h2>Workshop Location</h2>
      <p>${escapeHtml(WORKSHOP_DETAILS.name)}, ${escapeHtml(WORKSHOP_DETAILS.address)}. Phone: ${escapeHtml(WORKSHOP_DETAILS.phone)}. Hours: ${escapeHtml(WORKSHOP_DETAILS.hours)}.</p>
      <h2>Frequently Asked Questions</h2>
      <dl>${faqs}</dl>
      <h2>Other Car Accessories &amp; Services in Kumbakonam</h2>
      <ul>${otherLinks}</ul>
    </main>
  `.trim();
}

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  const serviceUrls = SERVICES.map(
    (s) => `
  <url>
    <loc>${BASE_URL}/services/${s.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>${serviceUrls}
</urlset>
`;
}

function run() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

  // 1. Prerender Homepage (/)
  const homeHtml = buildPageHtml(baseTemplate, {
    title: 'Car Accessories Shop in Kumbakonam | MAAC Wheels',
    description:
      'Best car accessories & auto part shop in Kumbakonam Bypass, Koranattukkaruppur 612501. Alloys, seat covers, audio & detailing. Call +91 63698 58746.',
    keywords: MASTER_SEO_KEYWORDS,
    canonicalPath: '/',
    ogType: 'website',
    ogImage: '/assets/aistudio/logo_45b62f30.jpeg',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    schemas: [
      getLocalBusinessSchema(),
      getBreadcrumbSchema([{ name: 'Home', url: '/' }]),
      getFAQSchema(HOMEPAGE_FAQS)
    ],
    fallbackBodyHtml: buildHomepageFallbackHtml()
  });
  fs.writeFileSync(templatePath, homeHtml, 'utf-8');

  // 2. Prerender each Service Route (/services/:id/index.html)
  for (const service of SERVICES) {
    const serviceDir = path.join(DIST_DIR, 'services', service.id);
    fs.mkdirSync(serviceDir, { recursive: true });

    const schemas: object[] = [
      getLocalBusinessSchema(),
      getServiceSchema(service),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/#services-section' },
        { name: `${service.title} in Kumbakonam`, url: `/services/${service.id}` }
      ])
    ];
    if (service.faqs && service.faqs.length > 0) {
      schemas.push(getFAQSchema(service.faqs));
    }

    const serviceHtml = buildPageHtml(baseTemplate, {
      title: service.seoTitle || `${service.title} in Kumbakonam | MAAC Wheels`,
      description:
        service.seoDescription ||
        `${service.title} in Kumbakonam at MAAC Wheels, Koranattukkaruppur Bypass (612501). Call +91 63698 58746.`,
      keywords: service.seoKeywords || [],
      canonicalPath: `/services/${service.id}`,
      ogType: 'article',
      ogImage: service.image,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schemas,
      fallbackBodyHtml: buildServiceFallbackHtml(service)
    });

    fs.writeFileSync(path.join(serviceDir, 'index.html'), serviceHtml, 'utf-8');
  }

  // 3. Prerender 404.html for unknown slugs
  const notFoundHtml = buildPageHtml(baseTemplate, {
    title: 'Page Not Found | MAAC Wheels Kumbakonam',
    description: 'The requested page could not be found at MAAC Wheels and Accessories, Kumbakonam.',
    keywords: [],
    canonicalPath: null,
    ogType: 'website',
    ogImage: '/assets/aistudio/logo_45b62f30.jpeg',
    robots: 'noindex, nofollow',
    schemas: [],
    fallbackBodyHtml:
      '<main><h1>Page Not Found</h1><p>Return to <a href="/">MAAC Wheels Kumbakonam</a>.</p></main>'
  });
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');

  // 4. Generate sitemap.xml in dist/, public/, and repo root public/
  const sitemapXml = generateSitemap();
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  if (fs.existsSync(REPO_PUBLIC_DIR)) {
    fs.writeFileSync(path.join(REPO_PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  }

  console.log(`Prerendered homepage, ${SERVICES.length} service pages, 404.html, and sitemap.xml.`);
}

run();

