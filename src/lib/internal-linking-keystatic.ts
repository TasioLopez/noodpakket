/**
 * Internal linking system updated for Keystatic CMS
 * This version dynamically fetches pages from Keystatic collections
 */

import { getCollection } from 'astro:content';
import type { Silo } from './internal-linking';

export interface PageLink {
  title: string;
  url: string;
  description?: string;
  silo: Silo;
}

/**
 * Get all pages in a silo from Keystatic collections (for pillar pages)
 */
export async function getAllSiloPages(silo: Silo): Promise<PageLink[]> {
  try {
    const collectionMap: Record<Silo, string> = {
      noodpakketten: 'noodpakketten',
      situaties: 'situaties',
      gidsen: 'gidsen',
      tools: 'tools',
      vergelijking: 'vergelijking',
      kennisbank: 'kennisbank',
    };

    const collectionName = collectionMap[silo];
    if (!collectionName) return [];

    const entries = await getCollection(collectionName as any);
    return entries.map((entry) => ({
      title: entry.data.title,
      url: `/${silo}/${entry.slug}`,
      description: entry.data.description,
      silo,
    }));
  } catch (error) {
    console.warn(`Failed to fetch pages for silo ${silo}:`, error);
    return [];
  }
}

/**
 * Get sibling pages within the same silo from Keystatic
 */
export async function getSiblingPages(
  silo: Silo,
  currentPage: string,
  limit = 5
): Promise<PageLink[]> {
  try {
    const allPages = await getAllSiloPages(silo);
    return allPages
      .filter((page) => {
        const pageSlug = page.url.split('/').pop();
        return pageSlug !== currentPage;
      })
      .slice(0, limit);
  } catch (error) {
    console.warn(`Failed to fetch sibling pages for ${silo}/${currentPage}:`, error);
    return [];
  }
}

/**
 * Get related tools that link across silos (keyword-based)
 * This can be enhanced to use actual tool collection data
 */
export async function getRelatedTools(keywords: string[]): Promise<PageLink[]> {
  const toolKeywords = keywords.map((k) => k.toLowerCase());
  const relatedTools: PageLink[] = [];

  try {
    const tools = await getCollection('tools');
    
    // Keyword-based matching
    for (const tool of tools) {
      const toolKeywordsLower = (tool.data.keywords || []).map((k: string) => k.toLowerCase());
      const toolTitleLower = tool.data.title.toLowerCase();
      const toolDescLower = (tool.data.description || '').toLowerCase();

      const matches = toolKeywords.some((keyword) => 
        toolKeywordsLower.includes(keyword) ||
        toolTitleLower.includes(keyword) ||
        toolDescLower.includes(keyword)
      );

      if (matches) {
        relatedTools.push({
          title: tool.data.title,
          url: `/tools/${tool.slug}`,
          description: tool.data.description,
          silo: 'tools',
        });
      }
    }

    // Fallback to hardcoded suggestions if no matches
    if (relatedTools.length === 0) {
      if (toolKeywords.some((k) => ['water', 'drinken'].includes(k))) {
        relatedTools.push({
          title: 'Water Calculator',
          url: '/tools/water-calculator',
          description: 'Bereken hoeveel water je nodig hebt',
          silo: 'tools',
        });
      }

      if (toolKeywords.some((k) => ['eten', 'voedsel', 'voeding'].includes(k))) {
        relatedTools.push({
          title: 'Voedsel Calculator',
          url: '/tools/voedsel-calculator',
          description: 'Bereken hoeveel voedsel je nodig hebt',
          silo: 'tools',
        });
      }

      if (toolKeywords.some((k) => ['noodpakket', 'checklist'].includes(k))) {
        relatedTools.push({
          title: 'Noodpakket Checklist',
          url: '/tools/noodpakket-checklist',
          description: 'Gebruik onze checklist voor je noodpakket',
          silo: 'tools',
        });
      }
    }
  } catch (error) {
    console.warn('Failed to fetch related tools:', error);
  }

  return relatedTools.slice(0, 3);
}

/**
 * Get related guides based on keywords from Keystatic
 */
export async function getRelatedGuides(
  keywords: string[],
  currentSilo: Silo,
  limit = 3
): Promise<PageLink[]> {
  if (currentSilo === 'gidsen') return [];

  try {
    const guides = await getCollection('gidsen');
    const guideKeywords = keywords.map((k) => k.toLowerCase());
    const related: PageLink[] = [];

    for (const guide of guides) {
      const guideKeywordsLower = (guide.data.keywords || []).map((k: string) => k.toLowerCase());
      const guideTitleLower = guide.data.title.toLowerCase();
      const guideDescLower = (guide.data.description || '').toLowerCase();

      const matches = guideKeywords.some((keyword) =>
        guideKeywordsLower.includes(keyword) ||
        guideTitleLower.includes(keyword) ||
        guideDescLower.includes(keyword)
      );

      if (matches) {
        related.push({
          title: guide.data.title,
          url: `/gidsen/${guide.slug}`,
          description: guide.data.description,
          silo: 'gidsen',
        });
      }
    }

    // Fallback to hardcoded if no matches
    if (related.length === 0) {
      if (guideKeywords.some((k) => ['water'].includes(k))) {
        related.push({
          title: 'Water Voorraad',
          url: '/gidsen/water-voorraad',
          silo: 'gidsen',
        });
      }

      if (guideKeywords.some((k) => ['eten', 'voedsel'].includes(k))) {
        related.push({
          title: 'Voedsel Voorraad',
          url: '/gidsen/voedsel-voorraad',
          silo: 'gidsen',
        });
      }

      if (guideKeywords.some((k) => ['noodpakket'].includes(k))) {
        related.push({
          title: 'Noodpakket Samenstellen',
          url: '/gidsen/noodpakket-samenstellen',
          silo: 'gidsen',
        });
      }
    }

    return related.slice(0, limit);
  } catch (error) {
    console.warn('Failed to fetch related guides:', error);
    return [];
  }
}

/**
 * Get pillar page URL for a silo
 */
export function getPillarPageUrl(silo: Silo): string {
  return `/${silo}`;
}



