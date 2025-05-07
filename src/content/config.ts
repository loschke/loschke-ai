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
        audio: z.string().optional(), // Audio file for blog post

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
        category: z.string(), // einfuehrung, framework, komponenten
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

// Podcast DeepDives schema definition
const podcastDeepDives = defineCollection({
    type: 'content',
    schema: z.object({
        // Basic information
        title: z.string().min(1).max(100),
        description: z.string().min(10).max(250),
        
        // Date and duration
        pubDate: z.coerce.date(),
        duration: z.string(), // Format: MM:SS or HH:MM:SS
        
        // Media
        audioFile: z.string(), // Path to audio file under public/audio/deepdives/
        thumbnail: z.string().optional(), // Path to thumbnail under public/images/podcast/thumbnails/
        episodeNumber: z.number().int().positive().optional(), // Episode number for display in badge
        
        // Content status
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        
        // SEO
        seo: seoSchema.default({}),
    }),
});

// Designaufgaben schema definition
const designaufgaben = defineCollection({
    type: 'content',
    schema: z.object({
        // Basic information
        title: z.string().min(1),
        description: z.string(),
        
        // Kategorisierung im 4K-Framework
        category: z.string().default('4k-framework'),
        
        // Reihenfolge für das sequentielle Lernen
        order: z.number().default(0),
        
        // Taxonomy
        tags: z.array(z.string()).default([]),
        
        // SEO
        seo: seoSchema.default({}),
    }),
});

// Export the collections
export const collections = {
    blog,
    'how-to-prompt-guide': howToPromptGuide,
    'aufgaben': aufgaben,
    'podcast': podcastDeepDives,
    'designaufgaben': designaufgaben,
};
