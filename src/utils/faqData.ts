/**
 * Utility functions for loading and processing FAQ data from JSON files
 */

// Define types for FAQ data
export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  isTopQuestion?: boolean;
  keywords: string[];
  chatbotExtras?: {
    relatedQuestions: string[];
    relatedResources: {
      title: string;
      url: string;
      type?: string;
    }[];
    shortAnswer: string;
  };
}

export interface FAQData {
  sectionTitle: string;
  sectionId: string;
  sectionDescription: string;
  sectionIcon: string;
  sectionColor: string;
  sectionOrder: number;
  lastUpdated: string;
  questions: FAQQuestion[];
  seoData: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords: string[];
    canonicalUrl: string;
    structuredData: any;
  };
}

/**
 * Load all FAQ categories and their top questions
 * @returns Object containing categories and top questions
 */
export async function loadFAQData() {
  // Import all JSON files from the faq directory
  const faqFiles = import.meta.glob('/src/data/faq/*.json', { eager: true });
  
  // Load categories from categories.json
  const categoriesFile = faqFiles['/src/data/faq/categories.json'] as any;
  const categories = categoriesFile && categoriesFile.default && Array.isArray(categoriesFile.default) 
    ? [...categoriesFile.default] 
    : [];
  
  // Extract top questions from the category files
  const topQuestions: Record<string, FAQQuestion[]> = {};
  
  for (const path in faqFiles) {
    // Skip categories.json and other non-category files
    if (path.includes('categories.json') || path.includes('json-structure.md')) continue;
    
    const data = faqFiles[path] as any;
    const categoryId = data.sectionId;
    
    if (!categoryId || !data.questions) continue;
    
    // Extract top questions
    topQuestions[categoryId] = data.questions
      .filter((q: any) => q.isTopQuestion)
      .map((q: any) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        keywords: q.keywords,
        chatbotExtras: q.chatbotExtras
      }));
  }
  
  // Sort categories by order
  categories.sort((a, b) => a.order - b.order);
  
  return { categories, topQuestions };
}

/**
 * Load data for a specific FAQ category
 * @param categoryId The ID of the category to load
 * @returns Object containing the category and its questions
 */
export async function loadFAQCategory(categoryId: string) {
  // Import all JSON files from the faq directory
  const faqFiles = import.meta.glob('/src/data/faq/*.json', { eager: true });
  
  // Load categories from categories.json
  const categoriesFile = faqFiles['/src/data/faq/categories.json'] as any;
  const categories = categoriesFile && categoriesFile.default && Array.isArray(categoriesFile.default) 
    ? [...categoriesFile.default] 
    : [];
  
  // Find the category metadata
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return null;
  
  // Find the category content file
  let categoryData = null;
  for (const path in faqFiles) {
    if (path.includes(`${categoryId}.json`)) {
      categoryData = faqFiles[path] as any;
      break;
    }
  }
  
  if (!categoryData || !categoryData.questions) return null;
  
  // Return combined data
  return {
    category,
    questions: categoryData.questions,
    seoData: categoryData.seoData,
    lastUpdated: categoryData.lastUpdated
  };
}

/**
 * Load all FAQ categories for navigation
 * @returns Array of categories sorted by order
 */
export async function loadFAQCategories() {
  // Import categories directly from categories.json
  const faqFiles = import.meta.glob('/src/data/faq/*.json', { eager: true });
  const categoriesFile = faqFiles['/src/data/faq/categories.json'] as any;
  
  // Sort categories by order
  const categories = categoriesFile && categoriesFile.default && Array.isArray(categoriesFile.default) 
    ? [...categoriesFile.default].sort((a, b) => a.order - b.order) 
    : [];
  
  return categories;
}
