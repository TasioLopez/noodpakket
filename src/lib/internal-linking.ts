/**
 * Internal linking system with silo containment rules
 */

export type Silo = 'noodpakketten' | 'situaties' | 'tools' | 'gidsen' | 'vergelijking' | 'kennisbank';

export interface PageLink {
  title: string;
  url: string;
  description?: string;
  silo: Silo;
}

export interface InternalLinkingConfig {
  currentSilo: Silo;
  currentPage: string;
  keywords: string[];
}

/**
 * Silo structure mapping
 */
const SILO_STRUCTURE: Record<Silo, string[]> = {
  noodpakketten: [
    'huis',
    'gezin',
    'kinderen',
    'baby',
    'auto',
    'bedrijf',
    'huisdieren',
    'overheid',
    'ehbo',
    '72-uur-kit',
    'go-bag',
    'winter',
    'budget',
    'voorraad',
    'wat-zit-er-in',
    'hoeveel-contant-geld',
    'hoeveel-eten',
    'hoeveel-water',
    'waar-kopen',
    'checklist',
  ],
  situaties: [
    'stroomuitval',
    'wateruitval',
    'evacuatie',
    'overstroming',
    'gaslek',
    'pandemie',
    'extreem-weer',
    'hittegolf',
    'koudegolf',
    'auto-pech',
    'nl-alert',
    'oorlog',
    'stikstof-incident',
    'brand-thuis',
    'cyberaanval',
    'wat-moet-je-in-huis-hebben-oorlog',
    'wat-inslaan-bij-oorlog',
    'hoeveel-cash-bij-nood',
    'wat-te-doen-bij-noodsituatie',
    'boodschappen-bij-nood',
  ],
  tools: [
    'noodpakket-checklist',
    'noodpakket-calculator',
    '72-uur-calculator',
    'voedsel-calculator',
    'water-calculator',
    'voorraadchecker',
    'noodplan-generator',
    'evacuatieplan',
    'go-bag-builder',
    'risico-meter',
    'maaltijdplanner-nood',
  ],
  gidsen: [
    'noodpakket-samenstellen',
    'noodvoorraad-opbouwen',
    'voedsel-voorraad',
    'lang-houdbaar-eten',
    'noodmaaltijden',
    'water-voorraad',
    'waterfilter',
    'elektriciteit-nood',
    'noodradio',
    'zaklampen',
    'powerbanks',
    'generatoren',
    'communicatieplan',
    'noodcommunicatie',
    'voorbereiding-op-winter',
    'voorbereiding-op-extreem-weer',
    'noodtas-inpakken',
    'medicatie-voorraad',
    'documenten-veiligstellen',
    'huisdieren-noodplan',
    'financiele-voorbereiding',
    'noodkoken-zonder-stroom',
    'beveiliging-thuis-nood',
    'brandveiligheid',
    'hoeveel-eten-per-persoon',
    'hoeveel-water-per-persoon',
    'eten-zonder-elektriciteit',
    'noodverwarming',
    'noodtoilet',
    'hygiene-bij-nood',
    'babyverzorging-noodsituatie',
  ],
  vergelijking: [
    'beste-noodpakketten',
    'beste-bug-out-bags',
    'beste-ehbo-kits',
    'beste-waterfilters',
    'beste-noodradio',
    'beste-powerbanks',
    'beste-zaklampen',
    'beste-generatoren',
    'budget-noodpakketten',
    'lange-houdbaarheid-eten',
    'noodmaaltijden',
    'auto-noodpakketten',
  ],
  kennisbank: [
    'noodpakket',
    'noodplan',
    '72-uur-regel',
    'preppertermijnen',
    'go-bag',
    'noodvoorraad',
    'nl-alert',
    'lang-houdbaar-eten',
    'medicatie-bij-nood',
    'noodcommunicatie',
    'evacuatieplan',
    'is-noodpakket-nodig',
    'zijn-noodpakketten-het-waard',
    'hoeveel-dagen-eten',
    'hoeveel-cash',
    'wat-moet-je-in-huis-hebben',
  ],
};

/**
 * Get sibling pages within the same silo
 */
export function getSiblingPages(silo: Silo, currentPage: string, limit = 5): PageLink[] {
  const pages = SILO_STRUCTURE[silo] || [];
  const siblings = pages
    .filter((page) => page !== currentPage)
    .slice(0, limit)
    .map((page) => ({
      title: formatPageTitle(page),
      url: `/${silo}/${page}`,
      silo,
    }));

  return siblings;
}

/**
 * Get pillar page URL for a silo
 */
export function getPillarPageUrl(silo: Silo): string {
  return `/${silo}`;
}

/**
 * Get related tools that link across silos
 */
export function getRelatedTools(keywords: string[]): PageLink[] {
  const toolKeywords = keywords.map((k) => k.toLowerCase());
  const relatedTools: PageLink[] = [];

  // Keyword-based tool suggestions
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

  return relatedTools.slice(0, 3);
}

/**
 * Get related guides based on keywords
 */
export function getRelatedGuides(keywords: string[], currentSilo: Silo, limit = 3): PageLink[] {
  if (currentSilo === 'gidsen') return [];

  const guideKeywords = keywords.map((k) => k.toLowerCase());
  const related: PageLink[] = [];

  // Simple keyword matching to relevant guides
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

  return related.slice(0, limit);
}

/**
 * Format page slug to readable title
 */
function formatPageTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all pages in a silo (for pillar pages)
 */
export function getAllSiloPages(silo: Silo): PageLink[] {
  const pages = SILO_STRUCTURE[silo] || [];
  return pages.map((page) => ({
    title: formatPageTitle(page),
    url: `/${silo}/${page}`,
    silo,
  }));
}


