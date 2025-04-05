#!/bin/bash
# Astro Update Script
# This script updates Astro from 5.0.3 to 5.6.0

# Set error handling
set -e

echo "=== Astro Update Script ==="
echo "This script will update your Astro project from 5.0.3 to 5.6.0"
echo "Make sure you have backed up your project before proceeding."
echo ""

# Prompt for confirmation
read -p "Do you want to proceed with the update? (y/n): " confirm
if [[ $confirm != "y" && $confirm != "Y" ]]; then
  echo "Update cancelled."
  exit 0
fi

echo ""
echo "=== Creating backup ==="
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_dir="../loschke-ai_backup_$timestamp"
mkdir -p "$backup_dir"
cp -r ./* "$backup_dir/"
echo "Backup created at: $backup_dir"

echo ""
echo "=== Updating Astro and dependencies ==="
# Use the automated upgrade tool
npx @astrojs/upgrade

# Update other dependencies
npm install @astrojs/node@latest @astrojs/tailwind@latest

echo ""
echo "=== Update completed ==="
echo "Your Astro project has been updated to version 5.6.0"
echo ""
echo "Next steps:"
echo "1. Review the changes in docs/astro5_update_recommendations.md"
echo "2. Test your site in development mode: npm run dev"
echo "3. Verify all pages render correctly"
echo "4. Check image optimization is working as expected"
echo "5. Test any API endpoints"
echo "6. Perform a test build: npm run build"
echo "7. Preview the build: npm run preview"

echo ""
echo "If you want to upgrade to Tailwind 4, follow the instructions in docs/astro5_update_recommendations.md"
echo ""
echo "If you encounter any issues, you can restore from the backup at: $backup_dir"
