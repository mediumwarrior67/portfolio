# GitHub Pages Troubleshooting - Blank Page Fix

## ✅ What I've Already Fixed

1. ✅ Added `"homepage": "https://mediumwarrior67.github.io/portfolio/"` to package.json
2. ✅ Confirmed `base: '/portfolio/'` is in vite.config.js
3. ✅ Added GitHub Actions workflow for automatic deployment
4. ✅ Created deploy script in package.json

## 🔧 Quick Fixes to Try (in order)

### Fix 1: Manual Deploy

Run these commands in your terminal:

```bash
cd /workspaces/portfolio
npm run build
npm run deploy
```

Then wait 2-3 minutes and refresh: https://mediumwarrior67.github.io/portfolio/

### Fix 2: Check GitHub Pages Settings

1. Go to your repo: https://github.com/mediumwarrior67/portfolio
2. Click **Settings** → **Pages** 
3. Make sure:
   - Source is set to **"Deploy from a branch"**
   - Branch is **`gh-pages`**
   - Folder is **`/ (root)`**
4. Click **Save** if you made changes
5. Wait 1-2 minutes and refresh the page

### Fix 3: Verify gh-pages Branch Exists

On GitHub:
1. Click the branch dropdown (usually says "main")
2. Look for **`gh-pages`** branch
3. If it doesn't exist, run these commands:

```bash
npm run deploy
```

This will create the gh-pages branch automatically.

### Fix 4: Update Discord OAuth (If using login)

If you're trying to use Discord login and it's not working:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click your app → **OAuth2** → **General**
3. Update the redirect URL to: `https://mediumwarrior67.github.io/portfolio/`
4. Click **Save Changes**
5. Update your Client ID in code if needed
6. Re-deploy: `npm run deploy`

### Fix 5: Clear Browser Cache

GitHub Pages can be slow to update:

- **Chrome/Edge**: Ctrl + Shift + Delete (or Cmd + Shift + Delete on Mac)
- **Firefox**: Ctrl + Shift + Delete
- Go to "All time" and clear cache
- Then visit the site in an incognito/private window

### Fix 6: Check GitHub Actions (For Auto-Deploy)

If you want automatic deployment when you push code:

1. Push your changes to GitHub:
```bash
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

2. Go to GitHub → your repo → **Actions**
3. You should see a "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (green checkmark)
5. Refresh the site

## 🆘 Still Not Working?

**Open the browser console** (F12 or Cmd+Option+I) and check for errors:

1. Look at the **Console** tab
2. Look for any red error messages
3. Common issues:
   - `404 not found` - base path is wrong
   - CORS errors - Discord OAuth config issue
   - Blank page - assets not loading from correct path

Let me know what errors you see and I'll help fix them!

## Alternative: Use GitHub Actions (Recommended)

Your GitHub Actions workflow is already set up. To use it:

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

GitHub will automatically:
1. Build your app
2. Deploy to gh-pages branch
3. Publish to your GitHub Pages URL

This is more reliable than manual deploy!

## Manual Deploy Command (If Needed)

```bash
npm run build && npm run deploy
```

This:
1. Builds the app to `/dist`
2. Pushes `/dist` to `gh-pages` branch
3. GitHub Pages serves it automatically

---

**Your Portfolio URL:** https://mediumwarrior67.github.io/portfolio/

If you've done all the above and it's still blank, paste any console errors and I'll help debug!
