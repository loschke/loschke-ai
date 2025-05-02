import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import { getBlogPosts } from '../utils/blog';
import { getAudioBlogPosts, getDeepDivePosts } from '../utils/podcast';

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
    "faq",  // FAQ-Übersichtsseite
    "podcast",  // Podcast-Hauptseite
    "podcast/blog",  // Audio-Blog Übersicht
    "podcast/deepdives",  // DeepDives Übersicht
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

// Funktion zum Generieren der FAQ-URLs
async function getFaqUrls(): Promise<string[]> {
    const urls: string[] = ["faq"];
    
    try {
        // FAQ-Kategorien direkt aus der Datei lesen
        const categoriesData = JSON.parse(
            await fs.readFile('src/data/faq/categories.json', 'utf-8')
        );
        
        // Debug-Ausgabe
        console.log('FAQ Categories:', categoriesData);
        
        // Für jede Kategorie eine URL hinzufügen
        for (const category of categoriesData) {
            urls.push(`faq/${category.id}`);
        }
        
        // Debug-Ausgabe
        console.log('FAQ URLs:', urls);
    } catch (error) {
        console.error('Error reading FAQ categories:', error);
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
    
    // Nur Blog-Posts und Kategorien zurückgeben, keine Tags
    // Explizit alle URLs filtern, die "tag" enthalten
    const allUrls = [...blogUrls, ...categoryUrls];
    const filteredUrls = allUrls.filter(url => !url.includes('/tag/'));
    
    return { 
        urls: filteredUrls,
        audioMap
    };
}

// Funktion zum Generieren der Podcast-URLs
async function getPodcastUrls(): Promise<{ urls: string[], audioMap: Map<string, string> }> {
    // Audio-Blog-Posts
    const audioBlogPosts = await getAudioBlogPosts();
    const audioBlogUrls = audioBlogPosts.map(post => `podcast/blog/${post.slug}`);
    
    // DeepDive-Posts
    const deepDivePosts = await getDeepDivePosts();
    const deepDiveUrls = deepDivePosts.map(post => `podcast/deepdives/${post.slug}`);
    
    // Audio-Metadaten für beide Podcast-Typen sammeln
    const audioMap = new Map<string, string>();
    
    // Audio-Blog-Metadaten
    audioBlogPosts.forEach(post => {
        const postUrl = `podcast/blog/${post.slug}`;
        if (post.data.audio) {
            audioMap.set(postUrl, `blog/${post.data.audio}`);
        }
    });
    
    // DeepDive-Metadaten
    deepDivePosts.forEach(post => {
        const postUrl = `podcast/deepdives/${post.slug}`;
        // @ts-ignore - DeepDive Schema
        if (post.data.audioFile) {
            // @ts-ignore - DeepDive Schema
            audioMap.set(postUrl, `deepdives/${post.data.audioFile}`);
        }
    });
    
    // Alle Podcast-URLs kombinieren
    const allUrls = [...audioBlogUrls, ...deepDiveUrls];
    
    return {
        urls: allUrls,
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
    const faqUrls = await getFaqUrls();
    const blogResult = await getBlogUrls();
    const podcastResult = await getPodcastUrls();
    const blogUrls = blogResult.urls;
    const podcastUrls = podcastResult.urls;
    
    // Audio-Metadaten kombinieren
    const audioMap = new Map([...blogResult.audioMap, ...podcastResult.audioMap]);
    
    // Alle URLs kombinieren
    const allUrls = [...staticUrls, ...aiFrameworkUrls, ...promptBibliothekUrls, ...faqUrls, ...blogUrls, ...podcastUrls];
    
    // XML generieren
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
       xmlns:xhtml="http://www.w3.org/1999/xhtml"
       xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
       xmlns:audio="http://www.google.com/schemas/sitemap-audio/1.1">
    ${allUrls.map(page => {
        const hasAudio = audioMap.has(page);
        const audioFile = hasAudio ? audioMap.get(page) : null;
        
        // Überprüfen, ob es sich um ein DeepDive oder Audio-Blog handelt
        const isDeepDive = audioFile ? audioFile.startsWith('deepdives/') : false;
        
        // Für jeden Eintrag einen Titel und eine Beschreibung generieren
        const audioTitle = isDeepDive 
            ? `Podcast-Episode: ${page.replace('podcast/deepdives/', '')}`
            : `Audio-Zusammenfassung: ${page.replace(/^(podcast\/)?blog\//, '')}`;
            
        const audioDesc = isDeepDive
            ? 'Podcast-Episode zum Thema'
            : 'Audio-Zusammenfassung des Artikels';
        
        return `
    <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === "" ? "daily" : "monthly"}</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>${hasAudio ? `
        <audio:audio>
            <audio:content_loc>${baseUrl}/audio/${audioFile}</audio:content_loc>
            <audio:title>${audioTitle}</audio:title>
            <audio:description>${audioDesc}</audio:description>
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
