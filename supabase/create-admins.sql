-- SQL to create admin users
-- Run this in Supabase SQL Editor after users sign up

-- Example: Make a user an admin
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@example.com';

-- View all users and their roles
SELECT id, email, full_name, role, created_at 
FROM profiles 
ORDER BY created_at DESC;

-- Make multiple users admins at once
UPDATE profiles 
SET role = 'admin' 
WHERE email IN (
  'admin1@example.com',
  'admin2@example.com',
  'admin3@example.com'
);

-- Remove admin role (make user regular user)
UPDATE profiles 
SET role = 'user' 
WHERE email = 'user@example.com';
