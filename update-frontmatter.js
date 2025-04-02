import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the markdown files
const directory = 'src/content/aufgaben/bildung-schule';

// Get all markdown files in the directory
const files = fs.readdirSync(directory)
  .filter(file => file.endsWith('.md'))
  // Skip files we've already updated
  .filter(file => !['medium-exercise-1.md', 'medium-exercise-2.md', 'simple-exercise-1.md'].includes(file));

// Process each file
files.forEach(file => {
  const filePath = path.join(directory, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title from the first line
  const titleMatch = content.match(/^# (.+)/);
  const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
  
  // Determine complexity from filename
  const complexity = file.startsWith('simple-') ? 'simple' : 
                    file.startsWith('medium-') ? 'medium' : 
                    file.startsWith('advanced-') ? 'advanced' : 'medium';
  
  // Generate a description based on the content
  let description = '';
  const descriptionMatch = content.match(/### Szenario\s+(.*?)(?=\n\n)/s);
  if (descriptionMatch) {
    description = descriptionMatch[1].replace(/\n/g, ' ').trim();
    // Limit description length
    if (description.length > 150) {
      description = description.substring(0, 147) + '...';
    }
  } else {
    description = `Übungsaufgabe zum Thema ${title.split(':')[1] || title}`;
  }
  
  // Generate tags based on content and title
  const tags = [];
  if (title.toLowerCase().includes('text')) tags.push('Textarbeit');
  if (title.toLowerCase().includes('e-mail') || title.toLowerCase().includes('email')) tags.push('E-Mail');
  if (title.toLowerCase().includes('social') || title.toLowerCase().includes('media')) tags.push('Social Media');
  if (title.toLowerCase().includes('prompt')) tags.push('Prompt-Engineering');
  
  // Add default tags based on complexity
  if (complexity === 'simple') tags.push('Grundlagen');
  if (complexity === 'medium') tags.push('Fortgeschritten');
  if (complexity === 'advanced') tags.push('Experte');
  
  // Add a general tag if we don't have enough
  if (tags.length < 2) tags.push('KI-Anwendung');
  
  // Create frontmatter
  const frontmatter = `---
title: "${title}"
description: "${description}"
branch: "bildung-schule"
complexity: "${complexity}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---

`;
  
  // Add frontmatter to content if it doesn't already have it
  if (!content.startsWith('---')) {
    const updatedContent = frontmatter + content;
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Skipping ${file} - already has frontmatter`);
  }
});

console.log('All files updated!');
