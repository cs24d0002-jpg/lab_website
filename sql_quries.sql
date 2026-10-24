--psql -U postgres -h localhost -d postgres
CREATE DATABASE IF NOT EXISTS tads_lab_website;

-- Enforce Enum Types for Roles & Material Categories
CREATE TYPE user_role AS ENUM ('Faculty', 'Student', 'Admin');
CREATE TYPE pub_division AS ENUM ('Conferences', 'Journals', 'Patents');
CREATE TYPE material_type AS ENUM ('Slides', 'Assignment', 'Tutorial', 'Scribe', 'PYQ');

-- 1. USERS TABLE (Handles Authentication & JWT Roles)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'Student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. FACULTIES TABLE (Lab Faculty Details)
CREATE TABLE IF NOT EXISTS faculties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(150) NOT NULL,
  research_area TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PUBLICATIONS TABLE (Conferences, Journals, Patents)
CREATE TABLE publications (
    id SERIAL PRIMARY KEY,
    division pub_division NOT NULL,
    title VARCHAR(500) NOT NULL,
    authors TEXT[] NOT NULL, -- Array of author names e.g., ARRAY['Dr. N. Sadagopan', 'Scholar A']
    venue VARCHAR(255) NOT NULL, -- Conference name, Journal title, or Patent Office
    year INT NOT NULL,
    doi_or_url VARCHAR(500),
    patent_number VARCHAR(100),
    indexing VARCHAR(100), -- e.g., 'IEEE Xplore', 'SCIE', 'Springer'
    status VARCHAR(50) DEFAULT 'Published',
    faculty_id INT REFERENCES faculties(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. COURSES TABLE (Handled by Faculty)
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, -- e.g., 'CS3010'
    name VARCHAR(255) NOT NULL,
    semester VARCHAR(50) NOT NULL, -- e.g., 'Odd Semester'
    academic_year VARCHAR(20) NOT NULL, -- e.g., '2025-2026'
    description TEXT,
    instructor_id INT REFERENCES faculties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. COURSE MATERIALS TABLE (Slides, Assignments, Tutorials, Scribes, PYQs)
CREATE TABLE course_materials (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type material_type NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size VARCHAR(50),
    uploaded_by INT REFERENCES users(id) ON DELETE SET NULL,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. GATE QUESTIONS TABLE (For Local LLM Solvers & Practice)
CREATE TABLE gate_questions (
    id SERIAL PRIMARY KEY,
    subject_code VARCHAR(50) NOT NULL, -- e.g., 'TOC', 'ALGO', 'OS'
    topic VARCHAR(255) NOT NULL,
    year VARCHAR(20) NOT NULL, -- e.g., 'GATE 2024'
    question_text TEXT NOT NULL,
    options JSONB, -- Stores array of string options e.g. ["Opt A", "Opt B"]
    correct_answer VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--7. STUDENTS TABLE (Lab Members & Scholars)
CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL, -- e.g., 'Ph.D. Scholar', 'M.Tech Student', 'Project Staff'
  email VARCHAR(255) UNIQUE NOT NULL,
  degree VARCHAR(100) NOT NULL,
  research_topic TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX idx_publications_division ON publications(division);
CREATE INDEX idx_course_materials_course ON course_materials(course_id);
CREATE INDEX idx_gate_subject ON gate_questions(subject_code);