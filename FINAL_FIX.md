# Fix Blank Page - Switch to GitHub Actions Deployment

## The Real Issue
The old peaceiris workflow has permission problems. We're switching to GitHub's native Pages deployment.

## Step 1: Update GitHub Pages Settings (CRITICAL!)

1. Go to: https://github.com/mediumwarrior67/portfolio/settings/pages
2. Under **"Build and deployment"** section, change:
   - Source: **"GitHub Actions"** (NOT "Deploy from a branch")
   - ⚠️ If you don't see this option, refresh the page or wait a minute
3. Click **Save** if you made changes

## Step 2: Update GitHub Pages Settings - Environment

Also check: https://github.com/mediumwarrior67/portfolio/settings/actions

Under **"Workflow permissions":**
- ✅ Select **"Read and write permissions"**
- Click **Save**

## Step 3: Trigger New Deployment

Push a new commit to trigger the new workflow:

```bash
git add .
git commit -m "Switch to GitHub Actions deployment"
git push origin main
```

## Step 4: Monitor & Verify

1. Go to: https://github.com/mediumwarrior67/portfolio/actions
2. Watch for the workflow to run
3. You should see TWO jobs: "build" and "deploy"
4. Wait for both to complete (green checkmarks)
5. Then visit: https://mediumwarrior67.github.io/portfolio/

---

## What Changed

**Old:** Used peaceiris/actions-gh-pages to push to gh-pages branch ❌ (permission issues)

**New:** Uses GitHub's native deployment system with artifacts ✅ (more reliable)

The new workflow:
- Builds your app
- Creates an artifact
- Uploads to GitHub Pages via official API (no git push needed!)

This should finally work!

---

## If Still Blank

Open DevTools (F12) and check the **Console** tab for errors. The most likely remaining issue would be:
- Discord OAuth redirect URL not updated
- Asset loading issues (check Network tab)

But the deployment should work now!
