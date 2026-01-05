import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // ===== NOODPAKKETTEN COLLECTION =====
    noodpakketten: collection({
      label: 'Noodpakketten',
      slugField: 'title',
      path: 'src/content/noodpakketten/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        silo: fields.text({ 
          label: 'Silo', 
          defaultValue: 'noodpakketten',
          validation: { isRequired: true }
        }),
        
        // Content
        content: fields.mdx({ 
          label: 'Content',
          options: {
            components: {}
          }
        }),
        
        // Structured components
        checklist: fields.array(
          fields.text({ label: 'Checklist Item' }),
          { label: 'Checklist', itemLabel: (props: { value: string }) => props.value || 'Item' }
        ),
        
        tips: fields.array(
          fields.text({ label: 'Tip' }),
          { label: 'Tips', itemLabel: (props: { value: string }) => props.value || 'Tip' }
        ),
        
        // FAQs
        faqs: fields.array(
          fields.object({
            label: 'FAQ Item',
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        
        // Featured image
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/noodpakketten',
          publicPath: '/images/noodpakketten',
        }),
        
        // SEO
        keywords: fields.array(
          fields.text({ label: 'Keyword' }),
          { label: 'Keywords' }
        ),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        
        // Metadata
        datePublished: fields.date({ label: 'Date Published' }),
        dateModified: fields.date({ label: 'Date Modified' }),
        author: fields.text({ label: 'Author', defaultValue: 'Noodpakket Center' }),
        
        // Related pages
        relatedPages: fields.array(
          fields.text({ label: 'Related Page URL' }),
          { label: 'Related Pages' }
        ),
      },
    }),

    // ===== SITUATIES COLLECTION =====
    situaties: collection({
      label: 'Situaties',
      slugField: 'title',
      path: 'src/content/situaties/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        silo: fields.text({ 
          label: 'Silo', 
          defaultValue: 'situaties',
          validation: { isRequired: true }
        }),
        content: fields.mdx({ label: 'Content' }),
        checklist: fields.array(fields.text({ label: 'Checklist Item' }), { label: 'Checklist' }),
        tips: fields.array(fields.text({ label: 'Tip' }), { label: 'Tips' }),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/situaties',
          publicPath: '/images/situaties',
        }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        datePublished: fields.date({ label: 'Date Published' }),
        dateModified: fields.date({ label: 'Date Modified' }),
        author: fields.text({ label: 'Author', defaultValue: 'Noodpakket Center' }),
        relatedPages: fields.array(fields.text({ label: 'Related Page URL' }), { label: 'Related Pages' }),
      },
    }),

    // ===== GIDSEN COLLECTION =====
    gidsen: collection({
      label: 'Gidsen',
      slugField: 'title',
      path: 'src/content/gidsen/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        silo: fields.text({ 
          label: 'Silo', 
          defaultValue: 'gidsen',
          validation: { isRequired: true }
        }),
        content: fields.mdx({ label: 'Content' }),
        
        // Guide-specific: Steps
        steps: fields.array(
          fields.object({
            label: 'Step',
            schema: {
              title: fields.text({ label: 'Step Title' }),
              content: fields.text({ label: 'Step Content', multiline: true }),
              image: fields.image({
                label: 'Step Image',
                directory: 'public/images/gidsen/steps',
                publicPath: '/images/gidsen/steps',
              }),
            },
          }),
          { label: 'Steps', itemLabel: (props: { fields: { title: { value: string } } }) => props.fields.title.value || 'Step' }
        ),
        
        tips: fields.array(fields.text({ label: 'Tip' }), { label: 'Tips' }),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/gidsen',
          publicPath: '/images/gidsen',
        }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        datePublished: fields.date({ label: 'Date Published' }),
        dateModified: fields.date({ label: 'Date Modified' }),
        author: fields.text({ label: 'Author', defaultValue: 'Noodpakket Center' }),
        relatedPages: fields.array(fields.text({ label: 'Related Page URL' }), { label: 'Related Pages' }),
      },
    }),

    // ===== TOOLS COLLECTION =====
    tools: collection({
      label: 'Tools',
      slugField: 'title',
      path: 'src/content/tools/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        silo: fields.text({ 
          label: 'Silo', 
          defaultValue: 'tools',
          validation: { isRequired: true }
        }),
        
        // Tool component selection
        toolComponent: fields.select({
          label: 'Tool Component',
          options: [
            { label: 'Water Calculator', value: 'WaterCalculator' },
            { label: 'Food Calculator', value: 'FoodCalculator' },
            { label: '72-Uur Calculator', value: '72UurCalculator' },
            { label: 'Noodpakket Calculator', value: 'NoodpakketCalculator' },
            { label: 'Noodplan Generator', value: 'NoodplanGenerator' },
            { label: 'Checklist', value: 'Checklist' },
            { label: 'Evacuatieplan', value: 'Evacuatieplan' },
            { label: 'Go-Bag Builder', value: 'GoBagBuilder' },
            { label: 'Risico Meter', value: 'RisicoMeter' },
            { label: 'Maaltijd Planner', value: 'MaaltijdPlanner' },
            { label: 'Voorraadchecker', value: 'Voorraadchecker' },
          ],
          defaultValue: 'WaterCalculator',
        }),
        
        // Optional: Tool configuration
        toolConfig: fields.object({
          label: 'Tool Configuration',
          schema: {
            defaultDays: fields.number({ label: 'Default Days', defaultValue: 3 }),
            maxDays: fields.number({ label: 'Max Days', defaultValue: 30 }),
          },
        }),
        
        content: fields.mdx({ label: 'Content (optional)' }),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        datePublished: fields.date({ label: 'Date Published' }),
        dateModified: fields.date({ label: 'Date Modified' }),
        author: fields.text({ label: 'Author', defaultValue: 'Noodpakket Center' }),
      },
    }),

    // ===== VERGELIJKING COLLECTION =====
    vergelijking: collection({
      label: 'Vergelijkingen',
      slugField: 'title',
      path: 'src/content/vergelijking/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        silo: fields.text({ 
          label: 'Silo', 
          defaultValue: 'vergelijking',
          validation: { isRequired: true }
        }),
        content: fields.mdx({ label: 'Content' }),
        
        // Products
        products: fields.array(
          fields.object({
            label: 'Product',
            schema: {
              name: fields.text({ label: 'Product Name' }),
              brand: fields.text({ label: 'Brand' }),
              description: fields.text({ label: 'Description', multiline: true }),
              pros: fields.array(fields.text({ label: 'Pro' }), { label: 'Pros' }),
              cons: fields.array(fields.text({ label: 'Con' }), { label: 'Cons' }),
              price: fields.text({ label: 'Price' }),
              rating: fields.number({ label: 'Rating (1-5)', validation: { min: 1, max: 5 } }),
              image: fields.image({
                label: 'Product Image',
                directory: 'public/images/vergelijking',
                publicPath: '/images/vergelijking',
              }),
            },
          }),
          { label: 'Products', itemLabel: (props: { fields: { name: { value: string } } }) => props.fields.name.value || 'Product' }
        ),
        
        // Comparison table (optional)
        tableHeaders: fields.array(fields.text({ label: 'Header' }), { label: 'Table Headers' }),
        tableRows: fields.array(
          fields.array(fields.text({ label: 'Cell' }), { label: 'Row' }),
          { label: 'Table Rows' }
        ),
        
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        datePublished: fields.date({ label: 'Date Published' }),
        dateModified: fields.date({ label: 'Date Modified' }),
        author: fields.text({ label: 'Author', defaultValue: 'Noodpakket Center' }),
      },
    }),

    // ===== KENNISBANK COLLECTION =====
    kennisbank: collection({
      label: 'Kennisbank',
      slugField: 'title',
      path: 'src/content/kennisbank/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        silo: fields.text({ 
          label: 'Silo', 
          defaultValue: 'kennisbank',
          validation: { isRequired: true }
        }),
        content: fields.mdx({ label: 'Content' }),
        
        // Definition for glossary terms
        definition: fields.text({ 
          label: 'Definition (Short)', 
          multiline: true 
        }),
        
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        datePublished: fields.date({ label: 'Date Published' }),
        dateModified: fields.date({ label: 'Date Modified' }),
        author: fields.text({ label: 'Author', defaultValue: 'Noodpakket Center' }),
      },
    }),
  },

  // ===== SINGLETONS (Pillar Pages) =====
  singletons: {
    noodpakkettenPillar: singleton({
      label: 'Noodpakketten Pillar Page',
      path: 'src/content/pillars/noodpakketten',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Noodpakketten' }),
        description: fields.text({ label: 'Description', multiline: true }),
        introContent: fields.mdx({ label: 'Introduction Content' }),
        
        whatYoullFind: fields.array(
          fields.object({
            label: 'What You\'ll Find Item',
            schema: {
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            },
          }),
          { label: 'What You\'ll Find' }
        ),
        
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
      },
    }),
    
    situatiesPillar: singleton({
      label: 'Situaties Pillar Page',
      path: 'src/content/pillars/situaties',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Situaties' }),
        description: fields.text({ label: 'Description', multiline: true }),
        introContent: fields.mdx({ label: 'Introduction Content' }),
        whatYoullFind: fields.array(
          fields.object({
            label: 'What You\'ll Find Item',
            schema: {
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            },
          }),
          { label: 'What You\'ll Find' }
        ),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
      },
    }),
    
    gidsenPillar: singleton({
      label: 'Gidsen Pillar Page',
      path: 'src/content/pillars/gidsen',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Gidsen' }),
        description: fields.text({ label: 'Description', multiline: true }),
        introContent: fields.mdx({ label: 'Introduction Content' }),
        whatYoullFind: fields.array(
          fields.object({
            label: 'What You\'ll Find Item',
            schema: {
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            },
          }),
          { label: 'What You\'ll Find' }
        ),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
      },
    }),
    
    toolsPillar: singleton({
      label: 'Tools Pillar Page',
      path: 'src/content/pillars/tools',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Tools' }),
        description: fields.text({ label: 'Description', multiline: true }),
        introContent: fields.mdx({ label: 'Introduction Content' }),
        whatYoullFind: fields.array(
          fields.object({
            label: 'What You\'ll Find Item',
            schema: {
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            },
          }),
          { label: 'What You\'ll Find' }
        ),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
      },
    }),
    
    vergelijkingPillar: singleton({
      label: 'Vergelijking Pillar Page',
      path: 'src/content/pillars/vergelijking',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Vergelijkingen' }),
        description: fields.text({ label: 'Description', multiline: true }),
        introContent: fields.mdx({ label: 'Introduction Content' }),
        whatYoullFind: fields.array(
          fields.object({
            label: 'What You\'ll Find Item',
            schema: {
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            },
          }),
          { label: 'What You\'ll Find' }
        ),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
      },
    }),
    
    kennisbankPillar: singleton({
      label: 'Kennisbank Pillar Page',
      path: 'src/content/pillars/kennisbank',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Kennisbank' }),
        description: fields.text({ label: 'Description', multiline: true }),
        introContent: fields.mdx({ label: 'Introduction Content' }),
        whatYoullFind: fields.array(
          fields.object({
            label: 'What You\'ll Find Item',
            schema: {
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            },
          }),
          { label: 'What You\'ll Find' }
        ),
        faqs: fields.array(
          fields.object({
            schema: {
              question: fields.text({ label: 'Question' }),
              answer: fields.text({ label: 'Answer', multiline: true }),
            },
          }),
          { label: 'FAQs' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
      },
    }),
  },
});



