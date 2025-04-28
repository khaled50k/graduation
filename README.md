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
