# 🔧 Cloudinary Upload Troubleshooting

## Issue: Images uploading but not displaying

This usually means one of these issues:

### 1. Upload Preset Not Created ⚠️

**Check if you created the upload preset:**
1. Go to https://cloudinary.com/console/settings/upload
2. Look for preset named: `fikr_blog_unsigned`
3. If it doesn't exist, create it:
   - Name: `fikr_blog_unsigned`
   - Signing mode: **Unsigned** (CRITICAL!)
   - Folder: `fikr-blog`
   - Save

### 2. Environment Variables Not Loaded

**Restart your dev server:**
```bash
# Press Ctrl+C to stop
npm run dev
```

Environment variables only load on server start!

### 3. Browser Console Errors

**Check for errors:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try uploading an image
4. Look for errors like:
   - "Invalid upload preset"
   - "Unauthorized"
   - "CORS error"

### 4. Verify Configuration

**Check `.env.local`:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dudg7uiqd
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=fikr_blog_unsigned
```

Make sure:
- ✅ No typos
- ✅ No extra spaces
- ✅ Exact preset name matches Cloudinary

---

## Quick Fix Steps

1. **Create Upload Preset** (if not done)
   - https://cloudinary.com/console/settings/upload
   - Add preset: `fikr_blog_unsigned`
   - Mode: Unsigned
   - Folder: `fikr-blog`

2. **Restart Server**
   ```bash
   npm run dev
   ```

3. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

4. **Test Upload**
   - Go to Dashboard → Authors
   - Try uploading an image
   - Check browser console for errors

---

## Still Not Working?

**Send me:**
1. Browser console errors (F12 → Console)
2. Screenshot of Cloudinary upload presets page
3. Confirm you restarted the dev server

I'll help debug! 🔍
