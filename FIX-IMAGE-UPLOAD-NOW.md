# ⚠️ CRITICAL: Image Upload Not Working?

## Most Common Issue: Upload Preset Not Created

**You MUST create the upload preset in Cloudinary first!**

### Quick Fix (2 minutes):

1. **Go to Cloudinary Dashboard**
   - https://cloudinary.com/console/settings/upload

2. **Scroll to "Upload presets" section**

3. **Click "Add upload preset"**

4. **Fill in EXACTLY:**
   ```
   Preset name: fikr_blog_unsigned
   Signing mode: Unsigned ⚠️ (CRITICAL - must be Unsigned!)
   Folder: fikr-blog
   ```

5. **Click Save**

6. **Restart your dev server:**
   ```bash
   # Press Ctrl+C to stop current server
   npm run dev
   ```

7. **Test again!**

---

## How to Verify It's Working

### Test Upload:
1. Go to http://localhost:3000/dashboard/authors
2. Click "Add Author"
3. You should see a drag & drop area for profile picture
4. Try uploading an image

### If Upload Fails:
1. Open browser console (F12)
2. Look for error message
3. Common errors:
   - **"Invalid upload preset"** → Preset not created or wrong name
   - **"Unauthorized"** → Signing mode is not "Unsigned"
   - **Nothing happens** → Dev server not restarted

---

## Screenshot: What Upload Preset Should Look Like

In Cloudinary, your upload preset should show:
- ✅ Name: `fikr_blog_unsigned`
- ✅ Mode: Unsigned
- ✅ Folder: `fikr-blog`
- ✅ Status: Enabled

---

## Still Not Working?

**Check these:**

1. ✅ Upload preset created in Cloudinary?
2. ✅ Preset name is EXACTLY `fikr_blog_unsigned`?
3. ✅ Signing mode is "Unsigned"?
4. ✅ Dev server restarted after creating preset?
5. ✅ Browser cache cleared (Ctrl+Shift+R)?

**If all checked and still failing:**
- Open browser console (F12)
- Try uploading
- Copy the error message
- Share it with me!

---

## Environment Variables (Already Set ✅)

Your `.env.local` is correct:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dudg7uiqd
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=fikr_blog_unsigned
```

The issue is almost certainly the upload preset not being created in Cloudinary!
