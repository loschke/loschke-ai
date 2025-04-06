// Import category placeholder images
import aiDesignPlaceholder from '../assets/blog/ai-design_category_placeholder.png';
import kiAutomationPlaceholder from '../assets/blog/ki-automation_category_placeholder.png';
import kiPraxisPlaceholder from '../assets/blog/ki-praxis_category_placeholder.png';
import kiStrategiePlaceholder from '../assets/blog/ki-strategie_category_placeholder.png';
import kiToolsPlaceholder from '../assets/blog/ki-tools_category_placeholder.png';
import kiTransformationPlaceholder from '../assets/blog/ki-transformation_category_placeholder.png';
import promptEngineeringPlaceholder from '../assets/blog/prompt-engineering_category_placeholder.png';
import defaultPlaceholder from '../../public/images/blog/default/blog-hero.png';

// Map category names to their corresponding placeholder images
export const categoryPlaceholders: Record<string, ImageMetadata> = {
  'AI-Design': aiDesignPlaceholder,
  'KI-Automation': kiAutomationPlaceholder,
  'KI-Praxis': kiPraxisPlaceholder,
  'KI-Strategie': kiStrategiePlaceholder,
  'KI-Tools': kiToolsPlaceholder,
  'KI-Transformation': kiTransformationPlaceholder,
  'Prompt Engineering': promptEngineeringPlaceholder,
};

/**
 * Returns the appropriate image for a given category
 * Falls back to default image if no matching category is found
 */
export function getCategoryImage(category?: string): ImageMetadata {
  if (!category) return defaultPlaceholder;
  
  // Try to find a direct match first
  const directMatch = Object.keys(categoryPlaceholders).find(
    k => k.toLowerCase() === category.toLowerCase()
  );
  
  if (directMatch) {
    return categoryPlaceholders[directMatch];
  }
  
  // If no direct match, try to find a partial match
  const partialMatch = Object.keys(categoryPlaceholders).find(
    k => category.toLowerCase().includes(k.toLowerCase()) || 
         k.toLowerCase().includes(category.toLowerCase())
  );
  
  return partialMatch ? categoryPlaceholders[partialMatch] : defaultPlaceholder;
}
