# Fix GitHub Actions Permissions Error

## The Issue
GitHub Actions can't push to your repository because of insufficient permissions.

## Solution - Enable Workflow Permissions

1. **Go to your repository settings:**
   - Navigate to: https://github.com/mediumwarrior67/portfolio/settings/actions

2. **Under "Workflow permissions" section, select:**
   - ✅ **"Read and write permissions"**
   - ✅ **"Allow GitHub Actions to create and approve pull requests"** (optional)

3. **Click "Save"**

## Then Deploy

Push a new commit to trigger the workflow:

```bash
git add .
git commit -m "Fix GitHub Actions permissions"
git push origin main
```

Go to: https://github.com/mediumwarrior67/portfolio/actions

Watch for the workflow to complete (should see a green checkmark).

Then visit: https://mediumwarrior67.github.io/portfolio/

---

## Alternative: Use Personal Access Token (If above doesn't work)

1. Create a Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Give it a name: "GitHub Pages Deploy"
   - Select scopes:
     - ✅ `repo` (full control)
     - ✅ `workflow`
   - Click **"Generate token"**
   - **Copy the token** (you won't see it again!)

2. Add it as a secret in your repo:
   - Go to: https://github.com/mediumwarrior67/portfolio/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `GITHUB_TOKEN_DEPLOY`
   - Value: (paste the token you copied)
   - Click **"Add secret"**

3. Update your workflow to use it:
   - In `.github/workflows/deploy.yml`, change line `github_token: ${{ secrets.GITHUB_TOKEN }}`
   - To: `github_token: ${{ secrets.GITHUB_TOKEN_DEPLOY }}`

4. Push and watch it deploy!

```bash
git add .
git commit -m "Use personal access token for deployment"
git push origin main
```
