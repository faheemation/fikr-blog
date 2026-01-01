# 🚨 IMPORTANT: Create Upload Preset in Cloudinary

Before the image upload will work, you MUST create an upload preset in Cloudinary:

## Steps:

1. **Login to Cloudinary**: https://cloudinary.com/console
   - Use your account (Cloud Name: dudg7uiqd)

2. **Go to Settings**:
   - Click Settings (gear icon) → Upload tab
   - Or go directly to: https://cloudinary.com/console/settings/upload

3. **Add Upload Preset**:
   - Scroll to "Upload presets" section
   - Click "Add upload preset" button

4. **Configure Preset**:
   ```
   Preset name: fikr_blog_unsigned
   Signing mode: Unsigned ⚠️ (IMPORTANT!)
   Folder: fikr-blog
   ```

5. **Save**

## Why This Is Required:

- Unsigned presets allow browser uploads without exposing API secrets
- The preset name MUST match what's in `.env.local`
- Without this, uploads will fail with "Invalid upload preset" error

## After Creating Preset:

1. Restart your dev server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. Test upload:
   - Go to Dashboard → Posts → New Post
   - You'll see a drag & drop area for featured image
   - Upload an image!

---

## Verification:

Your upload preset should look like this in Cloudinary:
- Name: `fikr_blog_unsigned`
- Mode: Unsigned
- Folder: `fikr-blog`
- Status: Enabled

All uploads will go to: `https://res.cloudinary.com/dudg7uiqd/image/upload/fikr-blog/...`
