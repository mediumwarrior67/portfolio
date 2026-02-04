# How to Add Your Groq API Key to GitHub Pages

Since your API key can't be committed to the repository (for security), you need to add it as a GitHub secret for deployment.

## Option 1: Add as GitHub Secret (For GitHub Actions)

1. Go to: https://github.com/mediumwarrior67/portfolio/settings/secrets/actions

2. Click **"New repository secret"**

3. Add these values:
   - Name: `VITE_GROQ_API_KEY`
   - Value: `YOUR_GROQ_API_KEY_HERE`

4. Click **"Add secret"**

5. Update the GitHub Actions workflow to use this secret

## Option 2: Users Add Their Own Keys (Recommended for Public Portfolio)

Since this is a public portfolio where visitors can play with the chatbot, it's better to let each user add their own key:

**How it works:**
1. Visitors log in with Discord
2. They see the Settings node
3. They add their own free Groq API key from https://console.groq.com
4. It's stored locally in their browser only
5. They can use the chatbot!

This way:
- ✅ Your API key stays private
- ✅ Each visitor uses their own key
- ✅ No API rate limit issues
- ✅ More secure and scalable

The code is already set up for this! Users just need to:
1. Get a free key at console.groq.com
2. Log in to your portfolio
3. Go to Settings node
4. Paste their key
5. Start chatting!

## For Local Development

Your `.env` file is already set up and will work locally. Just don't commit it to Git (it's now in .gitignore).
