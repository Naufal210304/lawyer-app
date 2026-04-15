-- Migration to add phone_number and profile_pic fields to users table
-- Run this in phpMyAdmin or MySQL client

ALTER TABLE users ADD COLUMN phone_number VARCHAR(20) DEFAULT NULL;
ALTER TABLE users ADD COLUMN profile_pic VARCHAR(255) DEFAULT NULL;