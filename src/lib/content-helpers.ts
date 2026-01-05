/**
 * Content collection helpers
 */

export interface ContentFrontmatter {
  title: string;
  description: string;
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: string;
  relatedPages?: string[];
  silo: string;
}

/**
 * Format content for display
 */
export function formatContentDate(date: string | Date | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Extract keywords from content
 */
export function extractKeywords(text: string): string[] {
  // Simple keyword extraction (can be enhanced)
  const commonWords = ['de', 'het', 'een', 'en', 'van', 'voor', 'op', 'in', 'is', 'te', 'dat'];
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !commonWords.includes(word));

  // Get unique words and count frequency
  const wordCount: Record<string, number> = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}


