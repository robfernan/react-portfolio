import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteSEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

const SITE_URL = 'https://robertfernandez.dev';
const DEFAULT_IMAGE = `${SITE_URL}/assets/home/banner.webp`;

const ROUTE_CONFIGS: Record<string, RouteSEOConfig> = {
  '': {
    title: 'Robert Fernandez — Cross-Platform Software Engineer & Digital Artist',
    description: 'Portfolio of Robert Fernandez: design-first software across web, desktop, mobile, Wear OS, embedded displays, and retro consoles.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Robert Fernandez — Portfolio',
          url: SITE_URL,
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Robert Fernandez',
          url: SITE_URL,
          jobTitle: 'Cross-Platform Software Engineer & Digital Artist',
          description: 'Design-first software across web, desktop, mobile, Wear OS, embedded displays, and retro consoles.',
          sameAs: [
            'https://github.com/robfernan',
            'https://linkedin.com/in/robfernan',
            'https://mungdaal321.itch.io/'
          ],
          knowsAbout: [
            'Software Engineering',
            'React',
            'TypeScript',
            'Flutter',
            'Go',
            'C++',
            'Lua',
            'SFML',
            'Love2D',
            'Aviation'
          ]
        }
      ]
    }
  },
  'works': {
    title: 'Works & Systems Showcase · Robert Fernandez',
    description: 'Explore production apps, game engines, retro console ports (PSP, Xbox, Dreamcast), and hardware interfaces built by Robert Fernandez.',
    canonicalPath: '/works',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Works & Engineering Portfolio',
      url: `${SITE_URL}/works`,
      description: 'Production systems, cross-platform apps, retro console tools, and embedded displays.',
      isPartOf: { '@type': 'WebSite', url: SITE_URL }
    }
  },
  'aviation': {
    title: 'AviationPro — Electronic Flight Bag (EFB) · Robert Fernandez',
    description: 'Interactive flight planning suite & EFB with live NOAA METAR/TAF weather decoder, crosswind calculations, density altitude, and runway analysis.',
    canonicalPath: '/aviation',
    ogType: 'website',
    ogImage: `${SITE_URL}/assets/projects/aviationpro_preview.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AviationPro EFB',
      operatingSystem: 'Web, Cross-platform',
      applicationCategory: 'TravelApplication',
      description: 'Comprehensive Electronic Flight Bag (EFB) featuring live NOAA aviation weather, runway calculations, and flight planning tools.',
      url: `${SITE_URL}/aviation`,
      author: {
        '@type': 'Person',
        name: 'Robert Fernandez'
      }
    }
  },
  'streaming': {
    title: 'Streaming & Content · MungDaal321',
    description: 'Live coding, retro development, gaming streams, and technical breakdowns with Robert Fernandez (MungDaal321).',
    canonicalPath: '/streaming',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Streaming & Community',
      url: `${SITE_URL}/streaming`,
      description: 'Live coding, retro homebrew development, and gaming broadcasts.'
    }
  },
  'resume': {
    title: 'Resume & Credentials · Robert Fernandez',
    description: 'Professional experience, technical proficiencies, education, and credentials of Robert Fernandez, Cross-Platform Software Engineer.',
    canonicalPath: '/resume',
    ogType: 'profile',
    ogImage: DEFAULT_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Robert Fernandez — Curriculum Vitae',
      url: `${SITE_URL}/resume`,
      description: 'Professional resume and qualifications of Robert Fernandez.'
    }
  }
};

/**
 * Updates or creates a <meta> tag by name or property attribute.
 */
function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates or creates the <link rel="canonical"> tag.
 */
function updateCanonical(href: string) {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', href);
}

/**
 * Injects or updates route-specific JSON-LD structured data.
 */
function updateStructuredData(schema?: Record<string, unknown>) {
  const SCRIPT_ID = 'route-structured-data';
  let script = document.head.querySelector(`#${SCRIPT_ID}`);
  
  if (!schema) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('id', SCRIPT_ID);
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

/**
 * Dynamic SEO Head Manager component.
 * Automatically synchronizes document title, canonical link, description,
 * OpenGraph attributes, and structured JSON-LD schemas for each route.
 */
export default function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    // Normalize path e.g. /aviation/weather -> 'aviation'
    const routeSegment = location.pathname.split('/')[1] || '';
    const config = ROUTE_CONFIGS[routeSegment] || {
      title: 'Robert Fernandez — Portfolio',
      description: 'Robert Fernandez builds design-first software across web, desktop, mobile, Wear OS, and retro consoles.',
      canonicalPath: location.pathname,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
    };

    const fullCanonical = `${SITE_URL}${config.canonicalPath}`;

    // 1. Update Title
    document.title = config.title;

    // 2. Update Canonical Link (CRITICAL for GSC duplicate page resolution)
    updateCanonical(fullCanonical);

    // 3. Update Standard Meta Description
    updateMetaTag('name', 'description', config.description);
    updateMetaTag('name', 'title', config.title);

    // 4. Update OpenGraph Tags
    updateMetaTag('property', 'og:title', config.title);
    updateMetaTag('property', 'og:description', config.description);
    updateMetaTag('property', 'og:url', fullCanonical);
    updateMetaTag('property', 'og:type', config.ogType || 'website');
    updateMetaTag('property', 'og:image', config.ogImage || DEFAULT_IMAGE);

    // 5. Update Twitter Meta Tags
    updateMetaTag('name', 'twitter:title', config.title);
    updateMetaTag('name', 'twitter:description', config.description);
    updateMetaTag('name', 'twitter:url', fullCanonical);
    updateMetaTag('name', 'twitter:image', config.ogImage || DEFAULT_IMAGE);

    // 6. Update Route-specific Schema.org JSON-LD
    updateStructuredData(config.schema);
  }, [location.pathname]);

  return null;
}
