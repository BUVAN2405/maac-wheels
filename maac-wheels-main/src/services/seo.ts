import { WORKSHOP_DETAILS } from '../data/catalog.ts';
import { ServiceItem, ServiceFAQ } from '../types.ts';

export const NEARBY_TOWNS: string[] = [
  'Kumbakonam',
  'Koranattukkaruppur (612501)',
  'Darasuram',
  'Swamimalai',
  'Thiruvidaimarudur',
  'Papanasam',
  'Thanjavur',
  'Mayiladuthurai'
];

export const MASTER_SEO_KEYWORDS: string[] = [
  // Money keywords (ready to buy) - from business-keywords.txt + user request
  'car accessories in kumbakonam',
  'best car accessories in kumbakonam',
  'top car accessories in kumbakonam',
  'car accessories kumbakonam',
  'car accessories shop in kumbakonam',
  'best car accessories shop in kumbakonam',
  'top car accessories shop in kumbakonam',
  'car accessories shop kumbakonam',
  'best auto part shop in kumbakonam',
  'best auto part shop in kubakonam',
  'kumbakona',
  'kumbakonam',
  'car service center in kumbakonam',
  'best car service center in kumbakonam',
  'top car service center in kumbakonam',
  'car service center kumbakonam',
  'tyre shop in kumbakonam',
  'best tyre shop in kumbakonam',
  'top tyre shop in kumbakonam',
  'tyre shop kumbakonam',
  'car wash in kumbakonam',
  'best car wash in kumbakonam',
  'top car wash in kumbakonam',
  'car wash kumbakonam',

  // Near me / local intent
  'car accessories near me',
  'car accessories near kumbakonam',
  'car accessories in koranattukkaruppur',
  'car accessories near koranattukkaruppur',
  'car accessories 612501',
  'car accessories shop near me',
  'car accessories shop near kumbakonam',
  'car accessories shop in koranattukkaruppur',
  'car accessories shop near koranattukkaruppur',
  'car accessories shop 612501',
  'car service center near me',
  'car service center near kumbakonam',
  'car service center in koranattukkaruppur',
  'car service center near koranattukkaruppur',
  'car service center 612501',
  'tyre shop near me',
  'tyre shop near kumbakonam',
  'tyre shop in koranattukkaruppur',
  'tyre shop near koranattukkaruppur',
  'tyre shop 612501',
  'car wash near me',
  'car wash near kumbakonam',
  'car wash in koranattukkaruppur',
  'car wash near koranattukkaruppur',
  'car wash 612501',

  // Service long-tail
  'car accessories price in kumbakonam',
  'seat covers in kumbakonam',
  'best seat covers in kumbakonam',
  'seat covers price in kumbakonam',
  'seat covers near me',
  'alloy wheels in kumbakonam',
  'best alloy wheels in kumbakonam',
  'alloy wheels price in kumbakonam',
  'alloy wheels near me',
  'car detailing in kumbakonam',
  'best car detailing in kumbakonam',
  'car detailing price in kumbakonam',
  'car detailing near me',
  'ceramic coating in kumbakonam',
  'paint protection film ppf in kumbakonam',
  'car sun films in kumbakonam',
  'car audio system in kumbakonam',
  'bi led headlights and fog lamps in kumbakonam',
  'oe genuine steering wheels in kumbakonam',
  'car body kits in kumbakonam',
  'rubbing and polishing in kumbakonam',

  // Nearby towns
  'car accessories in swamimalai',
  'car accessories shop near swamimalai',
  'car accessories in thiruvidaimarudur',
  'car accessories shop near thiruvidaimarudur',
  'car accessories in papanasam',
  'car accessories shop near papanasam',
  'car accessories in thanjavur',
  'car accessories shop near thanjavur',
  'car accessories in mayiladuthurai',
  'car accessories shop near mayiladuthurai',
  'car accessories in darasuram',
  'car accessories shop near darasuram',

  // Tamil / mixed
  'கார் ஆக்சசரீஸ் கும்பகோணம்',
  'கார் ஆக்சசரீஸ் kumbakonam',
  'கார் ஆக்சசரீஸ் near me',

  // Brand / navigational
  'maac wheels',
  'maac wheels kumbakonam',
  'maac wheels and accessories',
  'maac wheels reviews',
  'maac wheels contact number',
  'maac wheels address',
  'maac wheels location',

  // Questions
  'which is the best car accessories in kumbakonam',
  'car accessories in kumbakonam cost',
  'how to choose car accessories',
  'car accessories open now in kumbakonam'
];

export const HOMEPAGE_FAQS: ServiceFAQ[] = [
  {
    question: 'Which is the best car accessories shop in Kumbakonam?',
    answer:
      'MAAC Wheels and Accessories on NH 36 Bypass, Koranattukkaruppur, Kumbakonam (612501) handles custom leather seat covers, 10H ceramic coating, self-healing PPF, sun films, car audio systems, forged alloy wheels, Bi-LED headlights, OE steering upgrades, and body kits under one roof with coupler-to-coupler installation.'
  },
  {
    question: 'What does car accessories installation cost in Kumbakonam?',
    answer:
      'Pricing depends on your vehicle model, variant, and selected brand grade (such as 10H graphene vs. 9H ceramic, or specific alloy wheel rim size). Message us on WhatsApp at +91 63698 58746 with your car make and year for a clear itemized quote before any work begins.'
  },
  {
    question: 'How should I choose the right car accessories for my vehicle?',
    answer:
      'Start with essentials that suit Tamil Nadu roads and summer heat: heat-rejection sun films, Bi-LED projector headlights for night visibility, airbag-safe seat covers, and zero wire-cut audio couplers. Our workshop technicians verify PCD wheel offsets and OEM wiring compatibility before recommending parts.'
  },
  {
    question: 'What are the timings and location of MAAC Wheels in Kumbakonam?',
    answer:
      'Our workshop at NH 36, Bypass, Koranattukkaruppur, Kumbakonam, Tamil Nadu 612501 is open Monday to Saturday from 9:30 AM to 8:30 PM, and Sunday from 10:00 AM to 4:00 PM. Call +91 63698 58746 for same-day slot availability.'
  }
];

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: object[];
}

/**
 * Dynamically updates document metadata for SEO (title, meta description, keywords,
 * canonical link, Open Graph, Twitter cards, and structured JSON-LD schemas).
 */
export function setPageSEO({
  title,
  description,
  keywords = [],
  canonicalPath = '/',
  ogImage = '/assets/aistudio/logo_45b62f30.jpeg',
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  jsonLd = []
}: SEOConfig) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Meta Description, Robots & Keywords
  setMeta('description', description);
  setMeta('robots', robots);

  const combinedKeywords = Array.from(new Set([...keywords, ...MASTER_SEO_KEYWORDS])).join(', ');
  setMeta('keywords', combinedKeywords);

  // 4. Canonical URL
  const baseUrl = 'https://maacwheels.com';
  const fullUrl = `${baseUrl}${canonicalPath}`;
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // 5. Open Graph / Facebook
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', fullUrl, true);
  setMeta('og:type', canonicalPath === '/' ? 'website' : 'article', true);
  setMeta('og:site_name', WORKSHOP_DETAILS.name, true);
  setMeta('og:image', ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`, true);
  setMeta('og:locale', 'en_IN', true);

  // 6. Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`);

  // 7. Geo Tags for Kumbakonam Local SEO
  setMeta('geo.region', 'IN-TN');
  setMeta('geo.placename', 'Kumbakonam');
  setMeta('geo.position', `${WORKSHOP_DETAILS.coordinates.lat};${WORKSHOP_DETAILS.coordinates.lng}`);
  setMeta('ICBM', `${WORKSHOP_DETAILS.coordinates.lat}, ${WORKSHOP_DETAILS.coordinates.lng}`);

  // 8. Dynamic Structured Data (JSON-LD)
  const oldDynamicScripts = document.querySelectorAll('script[data-dynamic-seo="true"]');
  oldDynamicScripts.forEach((script) => script.remove());

  jsonLd.forEach((schema) => {
    const scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.setAttribute('data-dynamic-seo', 'true');
    scriptEl.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptEl);
  });
}

/**
 * Builds the Schema.org AutoPartsStore / AutoRepair JSON-LD (real verified facts only)
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoPartsStore', 'AutoRepair'],
    name: WORKSHOP_DETAILS.name,
    image: 'https://maacwheels.com/assets/aistudio/logo_45b62f30.jpeg',
    '@id': 'https://maacwheels.com/#workshop',
    url: 'https://maacwheels.com',
    telephone: WORKSHOP_DETAILS.phone,
    hasMap: WORKSHOP_DETAILS.googleMapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NH 36, Bypass, Koranattukkaruppur',
      addressLocality: 'Kumbakonam',
      addressRegion: 'Tamil Nadu',
      postalCode: '612501',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: WORKSHOP_DETAILS.coordinates.lat,
      longitude: WORKSHOP_DETAILS.coordinates.lng
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '20:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '16:00'
      }
    ],
    areaServed: [
      { '@type': 'City', name: 'Kumbakonam' },
      { '@type': 'Place', name: 'Koranattukkaruppur' },
      { '@type': 'Place', name: 'Darasuram' },
      { '@type': 'Place', name: 'Swamimalai' },
      { '@type': 'Place', name: 'Thiruvidaimarudur' },
      { '@type': 'Place', name: 'Papanasam' },
      { '@type': 'City', name: 'Thanjavur' },
      { '@type': 'City', name: 'Mayiladuthurai' }
    ]
  };
}

/**
 * Builds Schema.org Service JSON-LD for an individual service page
 */
export function getServiceSchema(service: ServiceItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in Kumbakonam`,
    serviceType: service.title,
    description: service.seoDescription || service.description,
    url: `https://maacwheels.com/services/${service.id}`,
    provider: {
      '@type': 'AutoPartsStore',
      name: WORKSHOP_DETAILS.name,
      telephone: WORKSHOP_DETAILS.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'NH 36, Bypass, Koranattukkaruppur',
        addressLocality: 'Kumbakonam',
        addressRegion: 'Tamil Nadu',
        postalCode: '612501',
        addressCountry: 'IN'
      }
    },
    areaServed: [
      { '@type': 'City', name: 'Kumbakonam' },
      { '@type': 'Place', name: 'Koranattukkaruppur' },
      { '@type': 'City', name: 'Thanjavur' },
      { '@type': 'City', name: 'Mayiladuthurai' }
    ]
  };
}

/**
 * Builds Schema.org BreadcrumbList JSON-LD
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://maacwheels.com${item.url}`
    }))
  };
}

/**
 * Builds Schema.org FAQPage JSON-LD for rich snippets
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
