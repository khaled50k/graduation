# Volunteer Management System API

A comprehensive RESTful API and React frontend for managing volunteers, companies, and job applications.

## Features

### Frontend Features
- Modern React 18 with Vite
- Responsive dashboard with real-time statistics
- Interactive post management interface
- User-friendly application system
- Profile management for volunteers and companies
- Real-time form validation
- Tailwind CSS for modern UI

### Authentication
- User registration with detailed profile information
- Secure login with token-based authentication
- Logout functionality
- Role-based access control

### Volunteer Management
- Complete volunteer profile management
- Skills tracking and management
- Experience and education history
- Application tracking and management
- Volunteer statistics and analytics

### Company Management
- Company registration and profile management
- Company verification system
- Company status management (active/inactive)
- Company statistics and analytics

### Post Management
- Job post creation and management
- Skill-based post filtering
- Post status management
- Post statistics and analytics
- Personalized post recommendations for volunteers

### Application Management
- Application submission and tracking
- Application status management
- Application statistics and analytics

## Frontend Pages

### Dashboard (/dashboard)
- System overview with key metrics
- Recent activities tracking
- Quick access to main features

### Authentication
- Login (/login)
- Register (/register) - Volunteer registration
- Password reset functionality

### Posts
- Post List (/posts)
- Post Details (/posts/{id})
- Create Post (/posts/create)
- Edit Post (/posts/{id}/edit)

### Profile
- View Profile (/profile)
- Edit Profile (/profile/edit)
- Manage Skills (/profile/skills)
- Application History (/profile/applications)

### Company
- Company Dashboard (/company)
- Manage Posts (/company/posts)
- Review Applications (/company/applications)
- Company Statistics (/company/statistics)

## API Documentation

Detailed API documentation is available in [docs/api.md](docs/api.md). The documentation includes:

- Authentication endpoints
- Volunteer management endpoints
- Company management endpoints
- Post management endpoints
- Application management endpoints

## Base URL
```
http://your-domain.com/api
```

## Authentication
All API endpoints require authentication using Sanctum tokens. Include the token in the Authorization header:
```
Authorization: Bearer {your_token}
```

## Response Format
All API responses follow this format:
```json
{
    "success": true,
    "data": { ... },
    "message": "Success message"
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Generate application key:
   ```bash
   php artisan key:generate
   ```
5. Run migrations:
   ```bash
   php artisan migrate
   ```
6. Start the development server:
   ```bash
   php artisan serve
   npm run dev
   ```

## Tech Stack

### Backend
- Laravel 10.x
- MySQL Database
- Laravel Sanctum for authentication
- PHP 8.1+

### Frontend
- React 18.x
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Inertia.js for SPA functionality

## Security Features

- Token-based authentication using Laravel Sanctum
- Role-based access control
- Input validation
- CSRF protection
- Rate limiting
- Secure password hashing
- Company verification system

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@example.com or create an issue in the repository.

# Volunteer Platform API Documentation

## Table of Contents
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Posts](#posts)
  - [Applications](#applications)
  - [Companies](#companies)
  - [Volunteers](#volunteers)
- [Request/Response Format](#requestresponse-format)
- [Error Handling](#error-handling)

## Authentication

The API uses Laravel Sanctum for authentication. All protected routes require a Bearer token in the Authorization header.

### Obtaining Token
1. Register a new account
2. Login with credentials
3. Use the returned token in subsequent requests

```http
Authorization: Bearer {token}
```

## Endpoints

### Auth

#### Register
```http
POST /api/register
```

Request body:
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "password_confirmation": "string",
    "first_name": "string",
    "second_name": "string",
    "third_name": "string",
    "fourth_name": "string"
}
```

#### Login
```http
POST /api/login
```

Request body:
```json
{
    "email": "string",
    "password": "string"
}
```

#### Logout
```http
POST /api/logout
```

#### Get Authenticated User
```http
GET /api/user
```

### Posts

#### List Posts
```http
GET /api/posts
```

Query parameters:
- `search`: string (optional)
- `skills`: array (optional)
- `location`: string (optional)
- `per_page`: integer (optional, default: 15)

#### Get Post
```http
GET /api/posts/{id}
```

#### Create Post
```http
POST /api/posts
```

Request body:
```json
{
    "title": "string",
    "description": "string",
    "location": "string",
    "deadline": "date",
    "is_active": boolean,
    "skills": ["string"]
}
```

#### Update Post
```http
PUT /api/posts/{id}
```

Request body:
```json
{
    "title": "string",
    "description": "string",
    "location": "string",
    "deadline": "date",
    "is_active": boolean,
    "skills": ["string"]
}
```

#### Delete Post
```http
DELETE /api/posts/{id}
```

#### Get Company Posts
```http
GET /api/posts/company
```

#### Get Available Skills
```http
GET /api/posts/skills
```

#### Get Post Statistics
```http
GET /api/posts/statistics
```

### Applications

#### List Applications
```http
GET /api/applications
```

#### Get Application
```http
GET /api/applications/{id}
```

#### Create Application
```http
POST /api/applications
```

Request body:
```json
{
    "post_id": "uuid",
    "message": "string"
}
```

#### Update Application
```http
PUT /api/applications/{id}
```

Request body:
```json
{
    "status": "string",
    "message": "string"
}
```

#### Get Application Statistics
```http
GET /api/applications/statistics
```

### Companies

#### List Companies
```http
GET /api/companies
```

#### Get Company
```http
GET /api/companies/{id}
```

#### Create Company
```http
POST /api/companies
```

Request body:
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "description": "string",
    "website": "string",
    "phone": "string",
    "address": "string"
}
```

#### Update Company
```http
PUT /api/companies/{id}
```

Request body:
```json
{
    "name": "string",
    "email": "string",
    "description": "string",
    "website": "string",
    "phone": "string",
    "address": "string"
}
```

#### Delete Company
```http
DELETE /api/companies/{id}
```

### Volunteers

#### List Volunteers
```http
GET /api/volunteers
```

#### Get Volunteer
```http
GET /api/volunteers/{id}
```

#### Update Volunteer
```http
PUT /api/volunteers/{id}
```

Request body:
```json
{
    "first_name": "string",
    "second_name": "string",
    "third_name": "string",
    "fourth_name": "string",
    "email": "string"
}
```

## Request/Response Format

### Request Format
All requests should include:
- `Content-Type: application/json` header
- `Accept: application/json` header
- For protected routes: `Authorization: Bearer {token}` header

### Response Format
All responses follow this structure:
```json
{
    "success": boolean,
    "message": "string",
    "data": object|array|null,
    "errors": object|null
}
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error

Validation errors include detailed messages:
```json
{
    "success": false,
    "message": "The given data was invalid.",
    "errors": {
        "field": ["error message"]
    }
}
```
