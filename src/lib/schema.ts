import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema, generateHowToSchema } from './seo';

export type SchemaType = 'BreadcrumbList' | 'FAQPage' | 'Article' | 'HowTo' | 'Product' | 'WebSite';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleConfig {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface HowToConfig {
  name: string;
  description: string;
  steps: HowToStep[];
}

export interface ProductConfig {
  name: string;
  description: string;
  brand?: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

/**
 * Generate JSON-LD schema script tag
 */
export function generateSchemaScript(schema: object): string {
  return JSON.stringify(schema, null, 2);
}

/**
 * Generate breadcrumb schema
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return generateBreadcrumbSchema(items);
}

/**
 * Generate FAQ schema
 */
export function createFAQSchema(faqs: FAQItem[]) {
  return generateFAQSchema(faqs);
}

/**
 * Generate Article schema
 */
export function createArticleSchema(config: ArticleConfig) {
  return generateArticleSchema(config);
}

/**
 * Generate HowTo schema
 */
export function createHowToSchema(config: HowToConfig) {
  return generateHowToSchema(config);
}

/**
 * Generate WebSite schema with search action
 */
export function createWebSiteSchema(searchUrl?: string) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Noodpakket Center',
    url: 'https://noodpakketcenter.nl',
  };

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}

/**
 * Generate Product schema for comparison pages
 */
export function createProductSchema(config: ProductConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: config.name,
    description: config.description,
    ...(config.brand && { brand: { '@type': 'Brand', name: config.brand } }),
    ...(config.image && {
      image: config.image.startsWith('http') ? config.image : `https://noodpakketcenter.nl${config.image}`,
    }),
    ...(config.offers && {
      offers: {
        '@type': 'Offer',
        price: config.offers.price,
        priceCurrency: config.offers.priceCurrency,
        availability: `https://schema.org/${config.offers.availability}`,
      },
    }),
  };
}

/**
 * Generate Organization schema
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Noodpakket Center',
    url: 'https://noodpakketcenter.nl',
    logo: 'https://noodpakketcenter.nl/images/logo.png',
    sameAs: [],
  };
}


