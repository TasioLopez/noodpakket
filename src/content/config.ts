import { defineCollection, z } from 'astro:content';

/**
 * Base schema for all content collections
 */
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  datePublished: z.date().optional(),
  dateModified: z.date().optional(),
  author: z.string().optional().default('Noodpakket Center'),
  relatedPages: z.array(z.string()).optional(),
  silo: z.enum(['noodpakketten', 'situaties', 'gidsen', 'vergelijking', 'kennisbank']),
});

/**
 * FAQ item schema
 */
const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

/**
 * Content Collections definition
 */
const noodpakkettenCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    checklist: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
    faqs: z.array(faqSchema).optional(),
  }),
});

const situatiesCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    checklist: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
    faqs: z.array(faqSchema).optional(),
  }),
});

const gidsenCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    steps: z.array(z.object({
      title: z.string(),
      content: z.string(),
      image: z.string().optional(),
    })).optional(),
    tips: z.array(z.string()).optional(),
    faqs: z.array(faqSchema).optional(),
  }),
});

const vergelijkingCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    products: z.array(z.object({
      name: z.string(),
      brand: z.string().optional(),
      description: z.string(),
      pros: z.array(z.string()).optional(),
      cons: z.array(z.string()).optional(),
      price: z.string().optional(),
      rating: z.number().min(1).max(5).optional(),
      image: z.string().optional(),
    })).optional(),
    faqs: z.array(faqSchema).optional(),
  }),
});

const kennisbankCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    definition: z.string().optional(),
    faqs: z.array(faqSchema).optional(),
  }),
});

export const collections = {
  noodpakketten: noodpakkettenCollection,
  situaties: situatiesCollection,
  gidsen: gidsenCollection,
  vergelijking: vergelijkingCollection,
  kennisbank: kennisbankCollection,
};


