# Deploy to GitHub Pages

## Quick Setup

Follow these steps to deploy your portfolio to GitHub Pages:

### Step 1: Add Homepage to package.json

The `homepage` field tells GitHub Pages where to serve your app from.

Add this line to your `package.json` (after the "version" line):

```json
"homepage": "https://mediumwarrior67.github.io/portfolio/",
```

**Replace `mediumwarrior67` with your GitHub username.**

Your package.json should look like:
```json
{
  "name": "portfolio",
  "homepage": "https://mediumwarrior67.github.io/portfolio/",
  "private": true,
  "version": "0.0.0",
  ...
}
```

### Step 2: Build & Deploy

Run this command to build and deploy:

```bash
npm run deploy
```

This will:
1. Build your app (`npm run build`)
2. Push the `dist` folder to the `gh-pages` branch on GitHub

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source", select **"Deploy from a branch"**
5. Select branch: **`gh-pages`**
6. Click **Save**

Your site should now be live at: `https://mediumwarrior67.github.io/portfolio/`

⏳ **Note:** It may take a few minutes for GitHub Pages to deploy. Refresh the page after a minute or two.

## Troubleshooting

### Blank Page?
- Make sure `base: '/portfolio/'` is in your `vite.config.js`
- Verify the repository name is `portfolio` (or update the path accordingly)
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Can't find gh-pages branch?
- Make sure you ran `npm run deploy` successfully
- Check GitHub Actions to see if there were any errors
- The branch will appear automatically after the first deploy

### Need to redeploy after changes?
Just run:
```bash
npm run deploy
```

## Future Updates

Every time you make changes:

1. Commit your changes:
```bash
git add .
git commit -m "Update portfolio"
git push
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

Done! Your changes will be live in a few minutes.

## Discord OAuth Note

⚠️ **Important**: When deploying to GitHub Pages, update your Discord redirect URI:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click your application
3. Go to OAuth2 → General
4. Update the redirect URL to: `https://mediumwarrior67.github.io/portfolio/`
5. Click **Save Changes**
6. Update your `DISCORD_CLIENT_ID` in the code if needed

Then run `npm run deploy` again.
