@echo off
REM Astro Update Script for Windows
REM This script updates Astro from 5.0.3 to 5.6.0

echo === Astro Update Script ===
echo This script will update your Astro project from 5.0.3 to 5.6.0
echo Make sure you have backed up your project before proceeding.
echo.

set /p confirm=Do you want to proceed with the update? (y/n): 
if /i not "%confirm%"=="y" (
  echo Update cancelled.
  exit /b 0
)

echo.
echo === Creating backup ===
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (set mytime=%%a%%b)
set timestamp=%mydate%_%mytime%
set backup_dir=..\loschke-ai_backup_%timestamp%
mkdir "%backup_dir%"
xcopy /E /I /H /Y .\ "%backup_dir%\"
echo Backup created at: %backup_dir%

echo.
echo === Updating Astro and dependencies ===
REM Use the automated upgrade tool
call npx @astrojs/upgrade

REM Update other dependencies
call npm install @astrojs/node@latest @astrojs/tailwind@latest

echo.
echo === Update completed ===
echo Your Astro project has been updated to version 5.6.0
echo.
echo Next steps:
echo 1. Review the changes in docs/astro5_update_recommendations.md
echo 2. Test your site in development mode: npm run dev
echo 3. Verify all pages render correctly
echo 4. Check image optimization is working as expected
echo 5. Test any API endpoints
echo 6. Perform a test build: npm run build
echo 7. Preview the build: npm run preview

echo.
echo If you want to upgrade to Tailwind 4, follow the instructions in docs/astro5_update_recommendations.md
echo.
echo If you encounter any issues, you can restore from the backup at: %backup_dir%

pause
