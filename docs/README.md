# Volunteer Management System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Database Structure](#database-structure)
3. [Models and Relationships](#models-and-relationships)
4. [API Endpoints](#api-endpoints)
5. [Frontend Pages](#frontend-pages)
6. [Authentication](#authentication)
7. [Features](#features)

## System Overview

The Volunteer Management System is a web application built with Laravel (backend) and React (frontend). It provides a platform for managing volunteer opportunities, applications, and user profiles.

### Tech Stack
- Backend: Laravel 10.x
- Frontend: React 18.x with Vite
- Database: MySQL
- Authentication: Laravel Sanctum
- Styling: Tailwind CSS

## Database Structure

### Main Tables

1. **users**
   - UUID primary key
   - Basic user information (name parts, email)
   - Password and remember token
   - Timestamps

2. **volunteers**
   - UUID primary key
   - Foreign key to users
   - Profile details (bio, phone, address)
   - Birth date
   - Timestamps

3. **companies**
   - UUID primary key
   - Foreign key to users
   - Company details (name, description, location)
   - Verification status
   - Contact information
   - Timestamps

4. **posts**
   - UUID primary key
   - Foreign key to companies
   - Title and description
   - Location
   - Deadline
   - Active status
   - Timestamps

5. **applications**
   - UUID primary key
   - Foreign keys to posts and volunteers
   - Status (pending, accepted, rejected)
   - Message
   - Timestamps

## Models and Relationships

### User Model
- Has one Volunteer or Company profile
- Has methods for role checking (isVolunteer, isCompany)
- Has methods for application permissions

### Volunteer Model
- Belongs to User
- Has many Applications
- Has many Skills
- Has many Experiences
- Has many Educations

### Company Model
- Belongs to User
- Has many Posts
- Has many Applications through Posts

### Post Model
- Belongs to Company
- Has many Applications
- Belongs to many Skills
- Has methods for status checking

### Application Model
- Belongs to Post
- Belongs to Volunteer
- Has status management

## API Endpoints

### Authentication

#### POST /api/register
- Register new volunteer
- Validate user information
- Return authentication token

#### POST /api/login
- Authenticate user
- Return token and user data

#### POST /api/logout
- Invalidate current token

### Posts

#### GET /api/posts
- List all active posts
- Smart recommendations for volunteers
- Include company and skills data

#### GET /api/posts/feed
- Personalized feed for volunteers
- Based on skill matching
- Pagination support

#### POST /api/posts
- Create new post (Company only)
- Validate post data
- Attach skills

#### PUT /api/posts/{id}
- Update existing post
- Validate changes
- Update skills

#### GET /api/posts/company
- Get company's posts
- Include application data

#### GET /api/posts/statistics
- Get post statistics
- Monthly post counts
- Application statistics

### Applications

#### GET /api/applications
- List user's applications
- Filter by status
- Include post data

#### POST /api/applications
- Submit new application
- Validate eligibility
- Check deadlines

#### PUT /api/applications/{id}
- Update application status
- Validate permissions
- Send notifications

#### GET /api/applications/statistics
- Get application statistics
- Status distribution
- Monthly trends

## Frontend Pages

### Dashboard
- Overview of system statistics
- Recent applications and posts
- Key metrics display:
  - Total users count
  - Active posts count
  - Total companies
  - Total applications
- Growth indicators for each metric
- Recent activity tracking

### Authentication Pages
#### Login
- User authentication form
- Email and password validation
- Remember me functionality
- Error handling display

#### Register
- Volunteer registration form
- Personal information collection
- Form validation
- Account creation process

### Posts Management
#### Posts List (Index)
- Display all available posts
- Filtering and search functionality
- Pagination support
- Quick action buttons

#### Post Details (Show)
- Detailed post information
- Application status
- Company details
- Related skills
- Application submission form

#### Post Creation
- Form for creating new posts
- Skill selection
- Validation handling
- Preview capability

#### Post Edit
- Post modification form
- Current data pre-filling
- Validation handling
- Update confirmation

### Profile Management
- Personal information management
- Skills and experience editing
- Education history
- Application history view

### Company Management
- Company profile management
- Post management interface
- Application review system
- Company statistics

### Skills Management
- Skill category browsing
- Skill selection interface
- Skill level management
- Skill matching system

## Authentication

### Features
- Token-based authentication with Sanctum
- Role-based access control
- Volunteer-only registration
- Secure password handling

### Security Measures
- Input validation
- CSRF protection
- Rate limiting
- Request validation
- Permission checking

## Features

### Volunteer Features
- Complete profile management
- Application submission and tracking
- Personalized post recommendations
- Application statistics

### Company Features
- Post creation and management
- Application review
- Company statistics
- Post analytics

### API Features
- RESTful architecture
- Consistent response format
- Proper error handling
- Resource-based endpoints
- Smart recommendations
- Statistical analysis

## Getting Started

### Prerequisites
- PHP 8.1+
- Node.js 16+
- MySQL 8.0+
- Composer
- NPM

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   npm install
   ```
3. Configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Run migrations:
   ```bash
   php artisan migrate
   ```
5. Start development servers:
   ```bash
   php artisan serve
   npm run dev
   ``` 