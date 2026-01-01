# Supabase Setup Instructions

Follow these steps to set up your Supabase backend for the Fikr blog.

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in the details:
   - **Name**: `fikr-blog`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to your audience
   - **Pricing Plan**: Free tier is perfect
4. Click "Create new project" and wait ~2 minutes

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

## Step 3: Configure Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values with your actual keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 4: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute
5. Repeat for `002_rls_policies.sql`
6. Repeat for `003_storage_buckets.sql`

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - profiles
   - posts
   - comments
   - likes
   - works
   - post_views

3. Go to **Storage** in Supabase dashboard
4. You should see these buckets:
   - post-images
   - avatars
   - work-images

## Step 6: Create Your Admin Account

1. Go to **Authentication** → **Users** in Supabase
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. After creating, go to **SQL Editor** and run:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

## Step 7: Test the Connection

1. Restart your Next.js dev server:
```bash
npm run dev
```

2. Check the terminal for any errors
3. The app should now be connected to Supabase!

## Next Steps

Once setup is complete, you can:
- Create your first blog post via the dashboard
- Test authentication
- Upload images
- Add comments and likes

## Troubleshooting

**Error: "Invalid API key"**
- Double-check your `.env.local` file
- Make sure you copied the correct keys
- Restart your dev server

**Error: "relation does not exist"**
- Make sure you ran all 3 migration files in order
- Check the SQL Editor for any errors

**Storage not working**
- Verify the storage buckets were created
- Check the storage policies in migration 003

Need help? Check the Supabase docs: https://supabase.com/docs
