# 🚨 CRITICAL SETUP - DO THIS FIRST!

## Step 1: Run Database Migrations

Open Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

Run these files IN ORDER:

### 1. Run CRITICAL-RUN-FIRST.sql
```sql
-- Copy and paste contents of supabase/CRITICAL-RUN-FIRST.sql
```

### 2. Run update-images.sql
```sql
-- Copy and paste contents of supabase/update-images.sql
```

---

## Step 2: Create Your Admin Account

### Option A: Signup on Website (Recommended)
1. Go to http://localhost:3000/login
2. Click "Sign up"
3. Create account with your email
4. Run this SQL:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### Option B: Create via SQL
```sql
-- Use the template in supabase/add-authors.sql
-- Section: "Add author with login capability"
```

---

## Step 3: Test Everything

### Test 1: Login
- [ ] Go to http://localhost:3000/login
- [ ] Login with your admin account
- [ ] Should redirect to /dashboard

### Test 2: Authors
- [ ] Go to Dashboard → Authors
- [ ] Click "Add Author"
- [ ] Fill in name, email, bio, picture
- [ ] Click "Add Author"
- [ ] Author should appear in list

### Test 3: Create Post
- [ ] Go to Dashboard → Posts → New Post
- [ ] Select an author from dropdown
- [ ] Fill in title, content
- [ ] Click "Publish"
- [ ] Post should appear on homepage

### Test 4: View Post
- [ ] Go to homepage
- [ ] Click on a post
- [ ] Should see full post with author info
- [ ] Comments section should be visible

### Test 5: Comments (as regular user)
- [ ] Logout
- [ ] Signup as new user
- [ ] Go to a blog post
- [ ] Add a comment
- [ ] Comment should appear

### Test 6: Likes
- [ ] Click the like button on a post
- [ ] Like count should increase
- [ ] Click again to unlike

---

## Common Issues & Fixes

### Issue: "Not authorized" when creating post
**Fix:** Run CRITICAL-RUN-FIRST.sql to update RLS policies

### Issue: Author dropdown is empty
**Fix:** Add authors via Dashboard → Authors

### Issue: Can't access dashboard
**Fix:** Make sure your account has role = 'admin'
```sql
SELECT role FROM profiles WHERE email = 'your-email@example.com';
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

### Issue: Images not showing
**Fix:** Run update-images.sql to add Unsplash images

### Issue: Comments not showing
**Fix:** Check browser console for errors, verify RLS policies

---

## Verification Checklist

Run these queries to verify everything is set up:

```sql
-- Check your admin account
SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';

-- Check posts exist
SELECT COUNT(*) as post_count FROM posts;

-- Check RLS policies
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('posts', 'comments', 'likes')
ORDER BY tablename;

-- Check authors
SELECT id, full_name, email FROM profiles ORDER BY full_name;
```

---

## Next Steps After Setup

Once everything is working:

1. **Add Real Content**
   - Add your team members as authors
   - Create your first real blog post
   - Add author bios and photos

2. **Customize**
   - Update About page content
   - Update Contact page
   - Add your social media links

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Configure custom domain

---

## Need Help?

If something isn't working:
1. Check browser console for errors
2. Check Supabase logs
3. Verify all SQL migrations ran successfully
4. Make sure .env.local has correct credentials
