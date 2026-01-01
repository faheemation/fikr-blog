# 🔧 Fixing Google Sign-In Issues

## Common Issues & Solutions

### Issue 1: Redirects to login page after Google auth

**Cause:** Auth callback not handling the OAuth flow properly

**Fix:** 
1. Updated `app/auth/callback/route.ts` to properly handle OAuth
2. Run this SQL to auto-create profiles:

```sql
-- Run in Supabase SQL Editor
-- Copy contents of: supabase/migrations/005_auto_create_profiles.sql
```

### Issue 2: "Invalid redirect URI" error

**Fix in Google Cloud Console:**
1. Go to Credentials → Your OAuth Client
2. Make sure Authorized redirect URIs includes:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
3. For local testing, also add:
   ```
   http://localhost:3000/auth/callback
   ```

### Issue 3: Works in production but not locally

**Fix in Supabase:**
1. Go to Authentication → URL Configuration
2. Add to "Redirect URLs":
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000
   ```

### Issue 4: User created but no profile

**Fix:** Run the auto-create profile trigger:
```sql
-- This is in: supabase/migrations/005_auto_create_profiles.sql
```

---

## Testing Checklist

After fixes:

1. **Clear browser cookies** (important!)
2. Go to http://localhost:3000/login
3. Click "Continue with Google"
4. Select Google account
5. Should redirect to homepage (or dashboard if admin)
6. Check navigation - should show your name/profile

---

## Verify in Supabase

### Check if user was created:
```sql
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;
```

### Check if profile was created:
```sql
SELECT id, email, full_name, role 
FROM profiles 
ORDER BY created_at DESC 
LIMIT 5;
```

### If profile is missing, create manually:
```sql
-- Replace USER_ID and EMAIL with actual values
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'USER_ID_FROM_AUTH_USERS',
  'user@email.com',
  'User Name',
  'user'
);
```

---

## Debug Mode

To see what's happening:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try Google sign-in
4. Look for errors in console
5. Check Network tab for failed requests

Common errors:
- `redirect_uri_mismatch` → Fix Google Console settings
- `invalid_client` → Check Supabase OAuth credentials
- `CORS error` → Check Supabase URL configuration

---

## Still Not Working?

1. **Check Supabase Logs:**
   - Go to Supabase Dashboard → Logs → Auth
   - Look for errors during OAuth flow

2. **Verify OAuth Setup:**
   ```sql
   -- Check if profiles table has correct structure
   \d profiles
   
   -- Check if trigger exists
   SELECT trigger_name FROM information_schema.triggers 
   WHERE trigger_name = 'on_auth_user_created';
   ```

3. **Test Email Auth:**
   - If email/password works but Google doesn't
   - Issue is specifically with OAuth setup
   - Double-check Google Console configuration

---

## Quick Fix Steps

1. Run `005_auto_create_profiles.sql` in Supabase
2. Clear browser cookies
3. Try Google sign-in again
4. Check if profile appears in navigation

If still stuck, check browser console for specific error messages!
