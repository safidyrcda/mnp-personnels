-- Create tables for the application
-- This script initializes the database schema

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "name" TEXT,
  "role" TEXT NOT NULL DEFAULT 'user',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Personnel table
CREATE TABLE IF NOT EXISTS "Personnel" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "matricule" TEXT NOT NULL UNIQUE,
  "nom" TEXT NOT NULL,
  "nomComplet" TEXT NOT NULL,
  "posteAbr" TEXT NOT NULL,
  "departement" TEXT NOT NULL,
  "direction" TEXT NOT NULL,
  "photoUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "Personnel_matricule_idx" ON "Personnel"("matricule");
