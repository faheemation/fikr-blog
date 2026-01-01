# Cloudinary Setup Guide

## Step 1: Create Free Account (2 minutes)

1. Go to https://cloudinary.com/users/register_free
2. Sign up with email or Google
3. Verify your email

**Free Tier Includes:**
- 25GB storage
- 25GB bandwidth/month
- Unlimited transformations
- Built-in CDN

---

## Step 2: Get Your Credentials (1 minute)

1. After login, go to Dashboard
2. You'll see:
   - **Cloud Name**: `dxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `xxxxxxxxxxxxxxxxxxxx`

3. Copy these values!

---

## Step 3: Add to Environment Variables

Open `/home/faheemation/Fikr Blog/.env.local` and add:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=fikr_blog_unsigned
```

**Important:** 
- Replace `your-cloud-name` with your actual cloud name
- We'll create the upload preset in the next step

---

## Step 4: Create Upload Preset (2 minutes)

1. Go to Cloudinary Dashboard → Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Configure:
   - **Preset name**: `fikr_blog_unsigned`
   - **Signing mode**: Unsigned ⚠️ (Important!)
   - **Folder**: `fikr-blog`
   - **Format**: Auto
   - **Quality**: Auto
5. Click "Save"

**Why unsigned?**
- Allows uploads from browser without exposing API secret
- Secure for public uploads
- Limited to your preset settings

---

## Step 5: Install Package

Run this command:

```bash
npm install next-cloudinary
```

---

## Step 6: Restart Dev Server

After adding env variables:

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## Verification

Your `.env.local` should look like:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://drwjrgthonfxgwoikegx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=fikr_blog_unsigned
```

---

## Next Steps

After setup:
1. I'll add drag & drop upload to post editor
2. I'll add it to author form
3. I'll add it everywhere you need images!

**Ready?** Complete steps 1-6 above, then let me know! 🎨
