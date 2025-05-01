/// <reference types="astro/client" />
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type AudioBlogPost = CollectionEntry<"blog">;
export type PodcastEntry = CollectionEntry<"podcast">;

/**
 * Fetches all audio blog posts (blog posts with audio attribute)
 * Returns sorted array by date (newest first)
 */
export async function getAudioBlogPosts(): Promise<AudioBlogPost[]> {
    console.log("🔍 getAudioBlogPosts called");
    const posts = await getCollection("blog", (post) => {
        return post.data.audio !== undefined && !post.data.draft;
    });

    console.log(`Total audio blog posts found: ${posts.length}`);
    if (posts.length > 0) {
        console.log("First post categories:", posts[0].data.categories);
    }

    // Sort posts by date (newest first)
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Fetches all podcast deepdives
 * Returns sorted array by date (newest first)
 */
export async function getDeepDivePosts(): Promise<PodcastEntry[]> {
    // @ts-ignore - New collection might not be fully recognized yet
    const posts = await getCollection("podcast", (post) => {
        return !post.data.draft;
    });

    // @ts-ignore - Sort posts by date (newest first)
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Extracts unique categories from audio blog posts
 * Returns sorted array of categories
 */
export async function getAudioBlogCategories(): Promise<string[]> {
    const posts = await getAudioBlogPosts();
    const allCategories = [...new Set(
        posts.flatMap(post => post.data.categories || [])
    )].sort();
    
    console.log("Available audio blog categories:", allCategories);
    return allCategories;
}

/**
 * Returns an empty array for compatibility
 * (Topics have been removed from the DeepDive schema)
 */
export async function getDeepDiveTopics(): Promise<string[]> {
    return [];
}

/**
 * Direct manual implementation of category filtering
 */
export async function getAudioBlogsByCategory(category: string): Promise<AudioBlogPost[]> {
    console.log("⚡️ Direct filtering for category:", category);
    
    if (!category) {
        return await getAudioBlogPosts();
    }
    
    const allPosts = await getAudioBlogPosts();
    console.log(`Starting direct filtering with ${allPosts.length} posts`);
    
    const lowerCategory = category.toLowerCase();
    console.log("Lowercased category:", lowerCategory);
    
    // Super-simple direct filtering approach
    const filtered = allPosts.filter(post => {
        if (!post.data.categories) {
            console.log(`Post ${post.slug} has no categories`);
            return false;
        }
        
        for (const cat of post.data.categories) {
            if (cat.toLowerCase() === lowerCategory) {
                console.log(`✅ Match found for ${post.slug} with category ${cat}`);
                return true;
            }
        }
        
        console.log(`❌ No match for ${post.slug} with categories ${post.data.categories.join(', ')}`);
        return false;
    });
    
    console.log(`Filtered results: ${filtered.length} posts`);
    if (filtered.length > 0) {
        console.log("First matching post:", filtered[0].slug);
    }
    
    return filtered;
}

/**
 * Filters audio blog posts by category (case-insensitive)
 * Returns posts sorted by date (newest first)
 */
export function filterAudioBlogsByCategory(posts: AudioBlogPost[], category: string): AudioBlogPost[] {
    if (!category) return posts;
    
    console.log(`💥 Original filterAudioBlogsByCategory called with category: ${category} and ${posts.length} posts`);
    
    const lowerCategory = category.toLowerCase();
    console.log("Lowercased category:", lowerCategory);
    
    // FIX: Use .some() instead of map().includes() for proper filtering with explicit debugging
    const filtered = posts.filter((post) => {
        const categories = post.data.categories || [];
        console.log(`Post ${post.slug} categories:`, categories);
        
        // Check if any category matches (case insensitive)
        const hasMatch = categories.some((c: string) => {
            const lowerC = c.toLowerCase();
            const isMatch = lowerC === lowerCategory;
            console.log(`Comparing "${lowerC}" with "${lowerCategory}" => ${isMatch}`);
            return isMatch;
        });
        
        console.log(`Post ${post.slug} matches filter? ${hasMatch}`);
        return hasMatch;
    });
    
    console.log(`Filtered ${posts.length} posts down to ${filtered.length} posts`);
    if (filtered.length > 0) {
        console.log("First few filtered posts:", filtered.slice(0, 2).map(p => p.slug));
    }
    
    return filtered.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Legacy function kept for compatibility
 * (Topics have been removed from the DeepDive schema)
 */
export function filterDeepDivesByTopic(posts: PodcastEntry[], topic: string): PodcastEntry[] {
    // Simply return all posts sorted by date
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
