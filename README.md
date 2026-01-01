# Fikr Blog

A modern, premium blog platform built with Next.js 15, Supabase, and Tailwind CSS.

## ✨ Features

- 📝 Rich markdown editor with image uploads
- 🎨 Beautiful, responsive design
- 🔐 Secure authentication with Supabase
- 💬 Comments system
- 🏷️ Categories and tags
- 📱 Mobile-friendly dashboard
- 🖼️ Cloudinary image hosting
- 🌍 Multi-language support (English & Malayalam)

## 🚀 Tech Stack

- **Framework:** Next.js 15
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Images:** Cloudinary
- **Deployment:** Vercel

## 🛠️ Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. Run database migrations in Supabase

5. Start development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment

This project is deployed on Vercel's free tier. See `deployment-guide.md` for details.

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines first.
