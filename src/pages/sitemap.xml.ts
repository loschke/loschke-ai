import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import { getBlogPosts } from '../utils/blog';

// Statische Seiten
const staticPages = [
    "",  // homepage
    "contact",
    "impressum",
    "datenschutz",
    "how-to-prompt-guide",  // Hinzugefügt
    "blog",  // Blog-Übersichtsseite
    "guides",
    "projekte",  // Projektseite hinzugefügt
];

// Funktion zum Generieren der AI Design Framework URLs
async function getAiDesignFrameworkUrls(): Promise<string[]> {
    const urls: string[] = ["ai-design-framework"];
    
    // Hauptkategorien
    const categories = ['concept', 'context', 'composition', 'creativity'];
    
    // Kategorie-URLs hinzufügen
    for (const category of categories) {
        urls.push(`ai-design-framework/${category}`);
    }
    
    // Order/Category Kombinationen
    const categoryMap = {
        '1': 'concept',
        '2': 'context',
        '3': 'composition',
        '4': 'creativity'
    };
    
    // Für jede Order/Kategorie-Kombination
    for (const [order, categoryName] of Object.entries(categoryMap)) {
        try {
            // Kategorie-Daten lesen
            const categoryData = JSON.parse(
                await fs.readFile(`src/data/${categoryName}/${categoryName}.json`, 'utf-8')
            );
            
            // Für jede Unterkategorie eine URL hinzufügen
            for (const subcatKey of Object.keys(categoryData.categories || {})) {
                urls.push(`ai-design-framework/${order}/${subcatKey}`);
            }
        } catch (error) {
            console.error(`Error reading category data for ${categoryName}:`, error);
        }
    }
    
    return urls;
}

// Funktion zum Generieren der Prompt-Bibliothek URLs
function getPromptBibliothekUrls(): string[] {
    const urls: string[] = ["prompt-bibliothek"];
    
    // Kategorien für die Prompt-Bibliothek
    const categories = [
        'marketing', 'pr', 'project', 'sales', 'education', 
        'leader', 'creative', 'support', 'strategy', 'keynote'
    ];
    
    // Kategorie-URLs hinzufügen
    for (const category of categories) {
        urls.push(`prompt-bibliothek/${category}`);
    }
    
    return urls;
}

// Funktion zum Generieren der Blog-URLs
async function getBlogUrls(): Promise<string[]> {
    const blogPosts = await getBlogPosts();
    
    // Blog-Post-URLs generieren
    const blogUrls = blogPosts.map(post => `blog/${post.id}`);
    
    // Blog-Kategorie-URLs generieren
    const categories = [...new Set(blogPosts.flatMap(post => post.data.categories || []))];
    const categoryUrls = categories.map(category => `blog/category/${category.toLowerCase()}`);
    
    // Blog-Tag-URLs generieren
    const tags = [...new Set(blogPosts.flatMap(post => post.data.tags || []))];
    const tagUrls = tags.map(tag => `blog/tag/${tag.toLowerCase()}`);
    
    return [...blogUrls, ...categoryUrls, ...tagUrls];
}

// Sitemap generieren
async function generateSitemap(): Promise<string> {
    const baseUrl = 'https://loschke.ai';
    
    // Alle URLs sammeln
    const staticUrls = staticPages;
    const aiFrameworkUrls = await getAiDesignFrameworkUrls();
    const promptBibliothekUrls = getPromptBibliothekUrls();
    const blogUrls = await getBlogUrls();
    
    // Alle URLs kombinieren
    const allUrls = [...staticUrls, ...aiFrameworkUrls, ...promptBibliothekUrls, ...blogUrls];
    
    // XML generieren
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
       xmlns:xhtml="http://www.w3.org/1999/xhtml"
       xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${allUrls.map(page => `
    <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === "" ? "daily" : "monthly"}</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`).join('')}
</urlset>`;
}

export const GET: APIRoute = async () => {
    return new Response(
        await generateSitemap(),
        {
            status: 200,
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600"
            }
        }
    );
};
