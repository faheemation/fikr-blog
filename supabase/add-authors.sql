-- ============================================
-- ADD AUTHORS TO FIKR BLOG - WORKING METHOD
-- ============================================
-- This creates both the auth user AND profile together

-- ============================================
-- METHOD 1: Add Author (They can login)
-- ============================================
-- Use this if you want the author to be able to login

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Create auth user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'ahmed.khan@fikr.blog', -- ⚠️ CHANGE THIS EMAIL
    crypt('ChangeMe123!', gen_salt('bf')), -- ⚠️ CHANGE PASSWORD
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Create profile
  INSERT INTO public.profiles (id, email, full_name, bio, avatar_url, role)
  VALUES (
    new_user_id,
    'ahmed.khan@fikr.blog', -- ⚠️ SAME EMAIL AS ABOVE
    'Ahmed Khan', -- ⚠️ CHANGE NAME
    'Technology Writer | Exploring AI and Ethics', -- ⚠️ CHANGE BIO
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', -- ⚠️ CHANGE AVATAR
    'user'
  );
  
  RAISE NOTICE 'Author added successfully: %', new_user_id;
END $$;


-- ============================================
-- METHOD 2: Simpler - Just have them signup!
-- ============================================
-- RECOMMENDED: Have authors signup at your website
-- Then update their profile with bio and avatar

-- Step 1: Author goes to http://localhost:3000/login
-- Step 2: They click "Sign up" and create account
-- Step 3: You run this to add their bio and avatar:

UPDATE profiles 
SET 
  full_name = 'Author Full Name',
  bio = 'Writer at Fikr | Technology Enthusiast',
  avatar_url = 'https://images.unsplash.com/photo-xxx?w=400&h=400&fit=crop'
WHERE email = 'their-signup-email@example.com';


-- ============================================
-- EXAMPLES - Copy and modify these
-- ============================================

-- Example 1: Add Fatima Ali
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token,
    email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated',
    'fatima.ali@fikr.blog',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(), '{"provider":"email","providers":["email"]}', '{}',
    NOW(), NOW(), '', '', '', ''
  ) RETURNING id INTO new_user_id;

  INSERT INTO public.profiles (id, email, full_name, bio, avatar_url, role)
  VALUES (
    new_user_id,
    'fatima.ali@fikr.blog',
    'Fatima Ali',
    'Philosophy Writer | Student at SIO Varam',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'user'
  );
END $$;

-- Example 2: Add Omar Hassan
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token,
    email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated',
    'omar.hassan@fikr.blog',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(), '{"provider":"email","providers":["email"]}', '{}',
    NOW(), NOW(), '', '', '', ''
  ) RETURNING id INTO new_user_id;

  INSERT INTO public.profiles (id, email, full_name, bio, avatar_url, role)
  VALUES (
    new_user_id,
    'omar.hassan@fikr.blog',
    'Omar Hassan',
    'Creative Writer | Storytelling and Culture',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    'user'
  );
END $$;


-- ============================================
-- VIEW ALL AUTHORS
-- ============================================
SELECT 
  p.id,
  p.full_name,
  p.email,
  p.bio,
  p.role,
  p.created_at
FROM profiles p
ORDER BY p.full_name;


-- ============================================
-- UPDATE EXISTING AUTHOR
-- ============================================
UPDATE profiles 
SET 
  full_name = 'Updated Name',
  bio = 'Updated Bio | New Designation',
  avatar_url = 'https://images.unsplash.com/photo-xxx?w=400&h=400&fit=crop'
WHERE email = 'author@fikr.blog';


-- ============================================
-- RECOMMENDED WORKFLOW
-- ============================================
-- 1. Have authors signup at your website (/login)
-- 2. They create their own account
-- 3. You update their profile with bio/avatar using UPDATE query above
-- 4. They appear in the author dropdown automatically!

-- This is easier and more secure than creating accounts manually
