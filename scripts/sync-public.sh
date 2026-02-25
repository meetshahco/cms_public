#!/bin/zsh

# Multi-Repo Sync Script
# Created by Antigravity for Meet Shah

echo "🚀 Starting Public Sync Process..."

# 1. Save current state
ORIGINAL_BRANCH=$(git branch --show-current)
git stash save "Sync-Stash-$(date +%s)"

# 2. Prepare release branch
echo "📦 Preparing release-public branch..."
git checkout main
git branch -D release-public 2>/dev/null
git checkout -b release-public

# 3. Remove Portfolio-specific folders
echo "✂️ Removing portfolio routes..."
rm -rf src/app/about
rm -rf src/app/work
rm -rf src/app/contact
rm -rf src/context

# 4. Swap Home Page
echo "🏠 Swapping Home Page..."
rm src/app/page.tsx
mv src/app/simple-cms/page.tsx src/app/page.tsx
rm -rf src/app/simple-cms

# 5. Remove Portfolio-specific components
echo "🧩 Removing personal components..."
rm src/components/AboutMe.tsx
rm src/components/Hero.tsx
rm src/components/Navbar.tsx
rm src/components/ProjectGallery.tsx
rm src/components/PlaneOverlay.tsx
rm src/components/HomeContainer.tsx
rm src/components/FooterClient.tsx
rm src/components/Footer.tsx
rm src/components/ProjectCard.tsx
rm src/components/ProjectDetails.tsx
rm src/components/GlobalLoader.tsx

# 6. Sanitize Middleware (remove portfolio redirects/logic)
echo "🔒 Sanitizing Middleware..."
# We'll keep the middleware but the sync ensures / maps to the new landing page.

# 7. Update Metadata / Package.json
echo "📝 Updating manifest..."
sed -i '' 's/"name": "meet-shah-portfolio"/"name": "simple-cms"/g' package.json

# 8. Commit and Push
echo "⬆️ Pushing to public repository..."
git add -A
git commit -m "Public Release: Standalone CMS demo"
git push public release-public:main --force

# 9. Cleanup
echo "🧹 Cleaning up..."
git checkout $ORIGINAL_BRANCH
git branch -D release-public
git stash pop

echo "✅ Sync Complete! Public repo updated."
