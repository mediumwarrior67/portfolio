# Discord OAuth Setup Instructions

To enable Discord login on your portfolio:

## 1. Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give it a name (e.g., "Portfolio Website")
4. Click "Create"

## 2. Configure OAuth2

1. In your application, go to "OAuth2" → "General"
2. Add a redirect URL:
   - For development: `http://localhost:5173/`
   - For production: `https://yourdomain.com/`
3. Save changes

## 3. Get Your Client ID

1. In the "OAuth2" → "General" section, copy your "Client ID"
2. Open `src/components/DiscordLogin.jsx`
3. Replace `'YOUR_DISCORD_CLIENT_ID'` with your actual Client ID:

```javascript
const DISCORD_CLIENT_ID = '1234567890123456789'; // Your Client ID here
```

## 4. Configure Scopes

The app uses the `identify` scope which allows reading:
- Username
- Avatar
- Discriminator (user tag)

## 5. Test the Integration

1. Make sure your dev server is running
2. Click "Login with Discord" button
3. Authorize the application
4. You should see your Discord profile in the top-right corner

## Security Notes

- Never commit your Client ID to public repositories (use environment variables in production)
- The access token is stored in localStorage (consider using more secure storage for production)
- This is a client-side implementation suitable for portfolio sites
- For production apps, implement a backend OAuth flow

## Production Deployment

For production, use environment variables:

```javascript
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
```

Then create a `.env` file:
```
VITE_DISCORD_CLIENT_ID=your_client_id_here
```
