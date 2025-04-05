import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';

// Statische Seiten
const staticPages = [
    "",  // homepage
    "contact",
    "impressum",
    "datenschutz",
    "how-to-prompt-guide"  // Hinzugefügt
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

// Sitemap generieren
async function generateSitemap(): Promise<string> {
    const baseUrl = 'https://loschke.ai';
    
    // Alle URLs sammeln
    const staticUrls = staticPages;
    const aiFrameworkUrls = await getAiDesignFrameworkUrls();
    const promptBibliothekUrls = getPromptBibliothekUrls();
    
    // Alle URLs kombinieren
    const allUrls = [...staticUrls, ...aiFrameworkUrls, ...promptBibliothekUrls];
    
    // XML generieren
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
