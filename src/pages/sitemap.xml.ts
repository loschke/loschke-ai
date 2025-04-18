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
    "impulse",  // Vortragsseite hinzugefügt
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

// Funktion zum Generieren der Blog-URLs und Audio-Metadaten
async function getBlogUrls(): Promise<{ urls: string[], audioMap: Map<string, string> }> {
    const blogPosts = await getBlogPosts();
    
    // Blog-Post-URLs generieren
    const blogUrls = blogPosts.map(post => `blog/${post.id.replace(/\.md$/, "")}`);
    
    // Blog-Kategorie-URLs generieren
    const categories = [...new Set(blogPosts.flatMap(post => post.data.categories || []))];
    const categoryUrls = categories.map(category => `blog/category/${category.toLowerCase()}`);
    
    // Audio-Metadaten für Posts mit Audio-Dateien sammeln
    const audioMap = new Map<string, string>();
    blogPosts.forEach(post => {
        if (post.data.audio) {
            const postUrl = `blog/${post.id.replace(/\.md$/, "")}`;
            audioMap.set(postUrl, post.data.audio);
        }
    });
    
    return { 
        urls: [...blogUrls, ...categoryUrls],
        audioMap
    };
}

// Sitemap generieren
async function generateSitemap(): Promise<string> {
    const baseUrl = 'https://loschke.ai';
    
    // Alle URLs sammeln
    const staticUrls = staticPages;
    const aiFrameworkUrls = await getAiDesignFrameworkUrls();
    const promptBibliothekUrls = getPromptBibliothekUrls();
    const blogResult = await getBlogUrls();
    const blogUrls = blogResult.urls;
    const audioMap = blogResult.audioMap;
    
    // Alle URLs kombinieren
    const allUrls = [...staticUrls, ...aiFrameworkUrls, ...promptBibliothekUrls, ...blogUrls];
    
    // XML generieren
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
       xmlns:xhtml="http://www.w3.org/1999/xhtml"
       xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
       xmlns:audio="http://www.google.com/schemas/sitemap-audio/1.1">
    ${allUrls.map(page => {
        const hasAudio = audioMap.has(page);
        const audioFile = hasAudio ? audioMap.get(page) : null;
        
        return `
    <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === "" ? "daily" : "monthly"}</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>${hasAudio ? `
        <audio:audio>
            <audio:content_loc>${baseUrl}/audio/blog/${audioFile}</audio:content_loc>
            <audio:title>Audio-Zusammenfassung: ${page.replace('blog/', '')}</audio:title>
            <audio:description>Audio-Zusammenfassung des Artikels</audio:description>
            <audio:format>audio/mpeg</audio:format>
        </audio:audio>` : ''}
    </url>`;
    }).join('')}
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
