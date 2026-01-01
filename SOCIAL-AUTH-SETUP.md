# Setting Up Social Authentication (Google & Apple)

## 🔐 Enable Google Sign-In

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted
6. Application type: **Web application**
7. Add authorized redirect URIs:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
8. Copy **Client ID** and **Client Secret**

### Step 2: Configure in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Find **Google** and enable it
3. Paste your **Client ID** and **Client Secret**
4. Save changes

---

## 🍎 Enable Apple Sign-In

### Step 1: Create Apple Service ID

1. Go to [Apple Developer](https://developer.apple.com/account/)
2. Go to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** button
4. Select **Services IDs** → Continue
5. Fill in:
   - Description: Fikr Blog
   - Identifier: `com.fikr.blog` (or your bundle ID)
6. Enable **Sign In with Apple**
7. Configure:
   - Primary App ID: Select your app
   - Web Domain: `YOUR_PROJECT_REF.supabase.co`
   - Return URLs: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
8. Save

### Step 2: Create Private Key

1. Go to **Keys** → **+** button
2. Key Name: Fikr Blog Auth Key
3. Enable **Sign In with Apple**
4. Configure: Select your Service ID
5. Download the `.p8` key file
6. Note the **Key ID**

### Step 3: Configure in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Find **Apple** and enable it
3. Fill in:
   - **Services ID**: Your identifier (e.g., `com.fikr.blog`)
   - **Team ID**: Found in Apple Developer account
   - **Key ID**: From the key you created
   - **Private Key**: Contents of the `.p8` file
4. Save changes

---

## ✅ Testing

### Test Google Sign-In
1. Go to http://localhost:3000/login
2. Click "Continue with Google"
3. Select your Google account
4. Should redirect back and be logged in

### Test Apple Sign-In
1. Go to http://localhost:3000/login
2. Click "Continue with Apple"
3. Sign in with Apple ID
4. Should redirect back and be logged in

---

## 🔧 Troubleshooting

### Google Issues

**Error: redirect_uri_mismatch**
- Make sure the redirect URI in Google Console matches exactly:
  `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

**Error: invalid_client**
- Double-check Client ID and Client Secret in Supabase

### Apple Issues

**Error: invalid_client**
- Verify Services ID matches exactly
- Check Team ID is correct

**Error: invalid_grant**
- Ensure private key is pasted correctly (entire contents of .p8 file)
- Verify Key ID matches

---

## 📝 Production Setup

### For Production Domain

When deploying to production (e.g., `fikr.blog`):

1. **Google Console:**
   - Add production redirect URI:
     `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - Add authorized domain: `fikr.blog`

2. **Apple Developer:**
   - Add production domain to Web Domain
   - Add production return URL

3. **Supabase:**
   - Update Site URL in Settings → General
   - Add production URL to redirect allow list

---

## 🎯 Quick Reference

### Supabase Redirect URI Format
```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

### Find Your Project Ref
- Go to Supabase Dashboard
- Look at URL: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`
- Or Settings → General → Reference ID

---

## 💡 Optional: Email-Only Mode

If you don't want to set up social auth yet:

1. The login page will still work with email/password
2. Users can sign up and login normally
3. Social buttons will show error if clicked
4. You can enable social auth later without code changes

---

## 🔒 Security Notes

- Never commit OAuth credentials to git
- Use environment variables for sensitive data
- Rotate keys periodically
- Monitor auth logs in Supabase Dashboard
