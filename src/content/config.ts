import { z, defineCollection } from 'astro:content';

// Define reusable schemas
const seoSchema = z.object({
    ogImage: z.string().optional(),
    canonicalURL: z.string().url().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    noindex: z.boolean().default(false),
});

// Define the collections
const blog = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        // Basic post information
        title: z.string().min(1).max(100),
        description: z.string().min(10).max(160),

        // Date handling
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),

        // Media
        heroImage: z.string().optional(), // Legacy support for string paths
        coverImage: image().optional(), // Using image() helper for optimization

        // Taxonomy
        categories: z.array(z.string()).min(1).default(['Allgemein']),
        tags: z.array(z.string()).default([]),

        // Content status
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        hasScalableContent: z.boolean().default(false), // Indicates articles with scalable content depth

        // Author information
        author: z.object({
            name: z.string(),
            avatar: z.string(),
            bio: z.string().optional(),
        }).default({
            name: 'Rico Loschke',
            avatar: '/images/rico-loschke_avatar.jpg',
        }),

        // Reading time (will be calculated during build)
        minutesRead: z.number().optional(),

        // SEO
        seo: seoSchema.default({}),

        // Social sharing
        socialImage: z.string().optional(),
        twitterHandle: z.string().optional(),
    }),
});

// Prompt Guide schema definition
const howToPromptGuide = defineCollection({
    type: 'content',
    schema: z.object({
        // Basic information
        title: z.string().min(1),
        description: z.string(),
        
        // Categorization
        category: z.string(), // einfuehrung, framework, komponenten, ressourcen
        subcategory: z.string().optional(),
        
        // Display order
        order: z.number().default(0),
        
        // Visual elements
        icon: z.string().optional(), // Emoji or icon name
        
        // Taxonomy
        tags: z.array(z.string()).default([]),
        
        // Additional metadata
        relatedContent: z.array(z.string()).optional(),
        
        // SEO
        seo: seoSchema.default({}),
    }),
});

// Aufgaben schema definition
const aufgaben = defineCollection({
    type: 'content',
    schema: z.object({
        // Basic information
        title: z.string().min(1),
        description: z.string(),
        
        // Categorization
        branch: z.string(), // bildung-schule, marketing, etc.
        complexity: z.enum(["simple", "medium", "advanced", "complex"]),
        
        // Taxonomy
        tags: z.array(z.string()).default([]),
        
        // Display order
        order: z.number().optional(),
        
        // SEO
        seo: seoSchema.default({}),
    }),
});

// Export the collections
export const collections = {
    blog,
    'how-to-prompt-guide': howToPromptGuide,
    'aufgaben': aufgaben,
};
