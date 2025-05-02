import type { APIRoute } from 'astro';
import { getAudioBlogPosts, getDeepDivePosts } from '../utils/podcast';
import { SITE_URL, PODCAST_TITLE, PODCAST_DESCRIPTION, PODCAST_AUTHOR } from '../consts';

// Hilfsfunktion zum Escapen von XML-Inhalten
function escapeXML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  // Sammle alle Podcast-Episoden
  const audioBlogPosts = await getAudioBlogPosts();
  const deepDivePosts = await getDeepDivePosts();

  // Beginn des RSS-Feeds
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXML(PODCAST_TITLE)}</title>
<link>${SITE_URL}/podcast</link>
<description>${escapeXML(PODCAST_DESCRIPTION)}</description>
<language>de-de</language>
`;

  // Audio-Blog-Items
  audioBlogPosts.forEach(post => {
    if (!post.data.audio) return;
    
    xml += `<item>
<title>${escapeXML(post.data.title)}</title>
<description>${escapeXML(post.data.description)}</description>
<link>${SITE_URL}/blog/${post.slug}</link>
<enclosure url="${SITE_URL}/audio/blog/${post.data.audio}" type="audio/mpeg" length="0" />
</item>
`;
  });

  // DeepDive-Items
  deepDivePosts.forEach(post => {
    // @ts-ignore - DeepDive Schema
    if (!post.data.audioFile) return;
    
    xml += `<item>
<title>${escapeXML(post.data.title)}</title>
<description>${escapeXML(post.data.description)}</description>
<link>${SITE_URL}/podcast/deepdives/${post.slug}</link>
<enclosure url="${SITE_URL}/audio/deepdives/${post.data.audioFile}" type="audio/mpeg" length="0" />
</item>
`;
  });

  // Ende des RSS-Feeds
  xml += `</channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=3600'
    }
  });
};
