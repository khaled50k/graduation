# Volunteer Management System API Documentation

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

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Volunteers](#volunteers)
- [Posts](#posts)
- [Applications](#applications)

## Authentication

### Register
```http
POST /api/register
```

Register a new volunteer user.

**Request Body:**
```json
{
    "first_name": "John",
    "second_name": "Doe",
    "third_name": "Smith",
    "fourth_name": "Johnson",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "user": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "first_name": "John",
            "second_name": "Doe",
            "third_name": "Smith",
            "fourth_name": "Johnson",
            "email": "john@example.com"
        },
        "token": "1|abcdefghijklmnopqrstuvwxyz"
    },
    "message": "User registered successfully"
}
```

### Login
```http
POST /api/login
```

Login with email and password.

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "user": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "first_name": "John",
            "second_name": "Doe",
            "third_name": "Smith",
            "fourth_name": "Johnson",
            "email": "john@example.com"
        },
        "token": "1|abcdefghijklmnopqrstuvwxyz"
    },
    "message": "User logged in successfully"
}
```

### Logout
```http
POST /api/logout
```

Logout the authenticated user.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "message": "User logged out successfully"
}
```

## Volunteers

### List Volunteers
```http
GET /api/volunteers
```

Get a list of volunteers with optional search and filtering.

**Query Parameters:**
- `search` (optional): Search volunteers by name
- `skills` (optional): Comma-separated list of skill IDs to filter by
- `per_page` (optional): Number of items per page (default: 15)

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "user": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "first_name": "John",
                    "second_name": "Doe",
                    "third_name": "Smith",
                    "fourth_name": "Johnson",
                    "email": "john@example.com"
                },
                "bio": "Experienced software developer",
                "phone": "+1234567890",
                "address": "123 Main St",
                "birth_date": "1990-01-01",
                "skills": [
                    {
                        "id": 1,
                        "name": "PHP",
                        "description": "PHP programming language"
                    }
                ],
                "experiences": [
                    {
                        "id": 1,
                        "title": "Senior Developer",
                        "company": "Tech Corp",
                        "start_date": "2020-01-01",
                        "end_date": "2022-12-31",
                        "description": "Led development team"
                    }
                ],
                "educations": [
                    {
                        "id": 1,
                        "institution": "University",
                        "degree": "Bachelor of Science",
                        "field_of_study": "Computer Science",
                        "start_date": "2010-09-01",
                        "end_date": "2014-05-31",
                        "description": "Graduated with honors"
                    }
                ],
                "created_at": "2024-01-01T00:00:00.000000Z",
                "updated_at": "2024-01-01T00:00:00.000000Z"
            }
        ],
        "current_page": 1,
        "per_page": 15,
        "total": 100
    },
    "message": "Volunteers retrieved successfully"
}
```

### Get Volunteer
```http
GET /api/volunteers/{volunteer}
```

Get a specific volunteer's details.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "user": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "first_name": "John",
            "second_name": "Doe",
            "third_name": "Smith",
            "fourth_name": "Johnson",
            "email": "john@example.com"
        },
        "bio": "Experienced software developer",
        "phone": "+1234567890",
        "address": "123 Main St",
        "birth_date": "1990-01-01",
        "skills": [
            {
                "id": 1,
                "name": "PHP",
                "description": "PHP programming language"
            }
        ],
        "experiences": [
            {
                "id": 1,
                "title": "Senior Developer",
                "company": "Tech Corp",
                "start_date": "2020-01-01",
                "end_date": "2022-12-31",
                "description": "Led development team"
            }
        ],
        "educations": [
            {
                "id": 1,
                "institution": "University",
                "degree": "Bachelor of Science",
                "field_of_study": "Computer Science",
                "start_date": "2010-09-01",
                "end_date": "2014-05-31",
                "description": "Graduated with honors"
            }
        ],
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
    },
    "message": "Volunteer retrieved successfully"
}
```

### Update Volunteer
```http
PUT /api/volunteers/{volunteer}
```

Update a volunteer's profile.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Request Body:**
```json
{
    "bio": "Updated bio",
    "phone": "+1234567890",
    "address": "456 New St",
    "birth_date": "1990-01-01",
    "skills": [1, 2, 3],
    "experiences": [
        {
            "title": "Senior Developer",
            "company": "Tech Corp",
            "start_date": "2020-01-01",
            "end_date": "2022-12-31",
            "description": "Led development team"
        }
    ],
    "educations": [
        {
            "institution": "University",
            "degree": "Bachelor of Science",
            "field_of_study": "Computer Science",
            "start_date": "2010-09-01",
            "end_date": "2014-05-31",
            "description": "Graduated with honors"
        }
    ]
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "user": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "first_name": "John",
            "second_name": "Doe",
            "third_name": "Smith",
            "fourth_name": "Johnson",
            "email": "john@example.com"
        },
        "bio": "Updated bio",
        "phone": "+1234567890",
        "address": "456 New St",
        "birth_date": "1990-01-01",
        "skills": [
            {
                "id": 1,
                "name": "PHP",
                "description": "PHP programming language"
            }
        ],
        "experiences": [
            {
                "id": 1,
                "title": "Senior Developer",
                "company": "Tech Corp",
                "start_date": "2020-01-01",
                "end_date": "2022-12-31",
                "description": "Led development team"
            }
        ],
        "educations": [
            {
                "id": 1,
                "institution": "University",
                "degree": "Bachelor of Science",
                "field_of_study": "Computer Science",
                "start_date": "2010-09-01",
                "end_date": "2014-05-31",
                "description": "Graduated with honors"
            }
        ],
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
    },
    "message": "Volunteer updated successfully"
}
```

### Get Volunteer Applications
```http
GET /api/volunteers/{volunteer}/applications
```

Get a list of applications for a specific volunteer.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "post": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "title": "Senior Developer Position",
                    "description": "Looking for experienced developer",
                    "location": "Remote",
                    "deadline": "2024-12-31",
                    "is_active": true,
                    "company": {
                        "id": "123e4567-e89b-12d3-a456-426614174000",
                        "name": "Tech Corp"
                    },
                    "skills": [
                        {
                            "id": 1,
                            "name": "PHP",
                            "description": "PHP programming language"
                        }
                    ]
                },
                "status": "pending",
                "message": "I'm interested in this position",
                "created_at": "2024-01-01T00:00:00.000000Z",
                "updated_at": "2024-01-01T00:00:00.000000Z"
            }
        ],
        "current_page": 1,
        "per_page": 15,
        "total": 100
    },
    "message": "Volunteer applications retrieved successfully"
}
```

### Get Volunteer Skills
```http
GET /api/volunteers/{volunteer}/skills
```

Get a list of skills for a specific volunteer.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "PHP",
            "description": "PHP programming language",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    ],
    "message": "Volunteer skills retrieved successfully"
}
```

### Get Volunteer Experiences
```http
GET /api/volunteers/{volunteer}/experiences
```

Get a list of experiences for a specific volunteer.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "Senior Developer",
            "company": "Tech Corp",
            "start_date": "2020-01-01",
            "end_date": "2022-12-31",
            "description": "Led development team",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    ],
    "message": "Volunteer experiences retrieved successfully"
}
```

### Get Volunteer Education
```http
GET /api/volunteers/{volunteer}/educations
```

Get a list of education history for a specific volunteer.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "institution": "University",
            "degree": "Bachelor of Science",
            "field_of_study": "Computer Science",
            "start_date": "2010-09-01",
            "end_date": "2014-05-31",
            "description": "Graduated with honors",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    ],
    "message": "Volunteer education history retrieved successfully"
}
```

### Get Volunteer Statistics
```http
GET /api/volunteers/statistics
```

Get statistics about volunteers.

**Headers:**
```
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

**Response:**
```json
{
    "success": true,
    "data": {
        "total_volunteers": 100,
        "active_volunteers": 50,
        "skill_distribution": [
            {
                "name": "PHP",
                "count": 30
            },
            {
                "name": "JavaScript",
                "count": 25
            }
        ]
    },
    "message": "Volunteer statistics retrieved successfully"
}
```

## Posts API

### Get All Posts
```
GET /posts
```

Query Parameters:
- `search` (optional): Search in title, description, or company name
- `skill` (optional): Filter by skill ID
- `company` (optional): Filter by company ID

Response:
```json
{
    "data": [
        {
            "id": 1,
            "title": "Post Title",
            "description": "Post Description",
            "company": { ... },
            "skills": [ ... ],
            "applications": [ ... ]
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

### Get Single Post
```
GET /posts/{id}
```

Response:
```json
{
    "id": 1,
    "title": "Post Title",
    "description": "Post Description",
    "company": { ... },
    "skills": [ ... ],
    "applications": [ ... ]
}
```

### Get Companies List
```
GET /posts/companies/list
```

Response:
```json
[
    {
        "id": 1,
        "name": "Company Name",
        ...
    }
]
```

### Get Skills List
```
GET /posts/skills/list
```

Response:
```json
[
    {
        "id": 1,
        "name": "Skill Name",
        ...
    }
]
```

### Get Post Applications
```
GET /posts/{id}/applications
```

Response:
```json
{
    "data": [
        {
            "id": 1,
            "status": "pending",
            "volunteer": { ... },
            ...
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

### Get Posts Statistics
```
GET /posts/statistics
```

Response:
```json
{
    "total_posts": 100,
    "total_companies": 20,
    "total_applications": 500,
    "posts_by_company": [
        {
            "name": "Company Name",
            "count": 10
        }
    ],
    "applications_by_status": [
        {
            "status": "pending",
            "count": 50
        }
    ]
}
```

### Get Posts with Recommendations
```http
GET /api/posts
```

Returns a list of posts with smart recommendations for volunteers.

#### Features
- For unauthenticated users: Returns all active posts
- For volunteers: Returns posts ordered by skill match count
- For companies: Returns all active posts
- Only shows active posts with future deadlines
- Includes related company, skills, and applications data

#### Response
```json
{
    "success": true,
    "data": [
        {
            "id": "uuid",
            "title": "string",
            "description": "text",
            "location": "string",
            "deadline": "datetime",
            "is_active": true,
            "company": {
                "id": "uuid",
                "name": "string"
            },
            "skills": [
                {
                    "id": "uuid",
                    "name": "string"
                }
            ],
            "applications": [
                {
                    "id": "uuid",
                    "status": "string"
                }
            ],
            "skills_count": 3
        }
    ],
    "message": "Posts retrieved successfully"
}
```

### Get Personalized Feed
```http
GET /api/posts/feed
```

Returns a personalized feed of posts for volunteers based on their skills.

#### Authentication
Required (Volunteer only)

#### Features
- Only shows posts that match volunteer's skills
- Orders posts by number of matching skills
- Includes pagination (10 posts per page)
- Shows only active posts with future deadlines

#### Response
```json
{
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": "uuid",
                "title": "string",
                "description": "text",
                "location": "string",
                "deadline": "datetime",
                "is_active": true,
                "company": {
                    "id": "uuid",
                    "name": "string"
                },
                "skills": [
                    {
                        "id": "uuid",
                        "name": "string"
                    }
                ],
                "applications": [
                    {
                        "id": "uuid",
                        "status": "string"
                    }
                ],
                "skills_count": 3
            }
        ],
        "per_page": 10,
        "total": 50
    },
    "message": "Personalized feed retrieved successfully"
}
```

### Create Post
```http
POST /api/posts
```

Create a new post (Company only).

#### Authentication
Required (Company only)

#### Request Body
```json
{
    "title": "string",
    "description": "text",
    "location": "string",
    "deadline": "datetime",
    "is_active": true,
    "skills": ["uuid1", "uuid2"]
}
```

#### Validation Rules
- `title`: Required, string, max 150 characters
- `description`: Required, string
- `location`: Required, string, max 255 characters
- `deadline`: Required, date, must be after today
- `is_active`: Optional, boolean
- `skills`: Optional, array of UUIDs that exist in skills table

#### Response
```json
{
    "success": true,
    "data": {
        "id": "uuid",
        "title": "string",
        "description": "text",
        "location": "string",
        "deadline": "datetime",
        "is_active": true,
        "skills": [
            {
                "id": "uuid",
                "name": "string"
            }
        ]
    },
    "message": "Post created successfully"
}
```

### Update Post
```http
PUT /api/posts/{id}
```

Update an existing post (Company only).

#### Authentication
Required (Company only)

#### Request Body
```json
{
    "title": "string",
    "description": "text",
    "location": "string",
    "deadline": "datetime",
    "is_active": true,
    "skills": ["uuid1", "uuid2"]
}
```

#### Validation Rules
- `title`: Optional, string, max 150 characters
- `description`: Optional, string
- `location`: Optional, string, max 255 characters
- `deadline`: Optional, date, must be after today
- `is_active`: Optional, boolean
- `skills`: Optional, array of UUIDs that exist in skills table

#### Response
```json
{
    "success": true,
    "data": {
        "id": "uuid",
        "title": "string",
        "description": "text",
        "location": "string",
        "deadline": "datetime",
        "is_active": true,
        "skills": [
            {
                "id": "uuid",
                "name": "string"
            }
        ]
    },
    "message": "Post updated successfully"
}
```

### Delete Post
```http
DELETE /api/posts/{id}
```

Delete a post (Company only).

#### Authentication
Required (Company only)

#### Response
```json
{
    "success": true,
    "data": [],
    "message": "Post deleted successfully"
}
```

### Get Company Posts
```http
GET /api/posts/company
```

Get all posts for the authenticated company.

#### Authentication
Required (Company only)

#### Response
```json
{
    "success": true,
    "data": [
        {
            "id": "uuid",
            "title": "string",
            "description": "text",
            "location": "string",
            "deadline": "datetime",
            "is_active": true,
            "skills": [
                {
                    "id": "uuid",
                    "name": "string"
                }
            ],
            "applications": [
                {
                    "id": "uuid",
                    "status": "string"
                }
            ]
        }
    ],
    "message": "Company posts retrieved successfully"
}
```

### Get Available Skills
```http
GET /api/posts/skills
```

Get all available skills for posts.

#### Response
```json
{
    "success": true,
    "data": [
        {
            "id": "uuid",
            "name": "string"
        }
    ],
    "message": "Skills retrieved successfully"
}
```

### Get Post Statistics
```http
GET /api/posts/statistics
```

Get post statistics for the authenticated company.

#### Authentication
Required (Company only)

#### Response
```json
{
    "success": true,
    "data": {
        "total_posts": 50,
        "active_posts": 30,
        "total_applications": 100,
        "monthly_posts": [
            {
                "count": 5,
                "month": 1
            }
        ]
    },
    "message": "Statistics retrieved successfully"
}
```

## Companies API

### Get All Companies
```
GET /companies
```

Query Parameters:
- `search` (optional): Search in name, description, or location
- `status` (optional): Filter by status (active/inactive)
- `is_verified` (optional): Filter by verification status

Response:
```json
{
    "data": [
        {
            "id": 1,
            "name": "Company Name",
            "description": "Company Description",
            "location": "Company Location",
            "website": "https://example.com",
            "phone": "1234567890",
            "email": "company@example.com",
            "logo": "path/to/logo.jpg",
            "status": "active",
            "is_verified": true,
            "posts": [ ... ],
            "applications": [ ... ]
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

### Create Company
```
POST /companies
```

Request Body:
```json
{
    "name": "Company Name",
    "description": "Company Description",
    "location": "Company Location",
    "website": "https://example.com",
    "phone": "1234567890",
    "email": "company@example.com",
    "logo": "file" // Optional image file
}
```

Response:
```json
{
    "id": 1,
    "name": "Company Name",
    "description": "Company Description",
    "location": "Company Location",
    "website": "https://example.com",
    "phone": "1234567890",
    "email": "company@example.com",
    "logo": "path/to/logo.jpg",
    "status": "active",
    "is_verified": false,
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00"
}
```

### Get Single Company
```
GET /companies/{id}
```

Response:
```json
{
    "id": 1,
    "name": "Company Name",
    "description": "Company Description",
    "location": "Company Location",
    "website": "https://example.com",
    "phone": "1234567890",
    "email": "company@example.com",
    "logo": "path/to/logo.jpg",
    "status": "active",
    "is_verified": true,
    "posts": [ ... ],
    "applications": [ ... ]
}
```

### Update Company
```
PUT /companies/{id}
```

Request Body:
```json
{
    "name": "Updated Company Name",
    "description": "Updated Description",
    "location": "Updated Location",
    "website": "https://updated.example.com",
    "phone": "9876543210",
    "email": "updated@example.com",
    "logo": "file" // Optional image file
}
```

Response:
```json
{
    "id": 1,
    "name": "Updated Company Name",
    "description": "Updated Description",
    "location": "Updated Location",
    "website": "https://updated.example.com",
    "phone": "9876543210",
    "email": "updated@example.com",
    "logo": "path/to/updated/logo.jpg",
    "status": "active",
    "is_verified": true,
    "updated_at": "2024-01-02 00:00:00"
}
```

### Delete Company
```
DELETE /companies/{id}
```

Response:
```
204 No Content
```

### Verify Company
```
POST /companies/{id}/verify
```

Response:
```json
{
    "message": "Company verified successfully"
}
```

### Unverify Company
```
POST /companies/{id}/unverify
```

Response:
```json
{
    "message": "Company verification removed"
}
```

### Activate Company
```
POST /companies/{id}/activate
```

Response:
```json
{
    "message": "Company activated successfully"
}
```

### Deactivate Company
```
POST /companies/{id}/deactivate
```

Response:
```json
{
    "message": "Company deactivated successfully"
}
```

### Get Company Posts
```
GET /companies/{id}/posts
```

Response:
```json
{
    "data": [
        {
            "id": 1,
            "title": "Post Title",
            "description": "Post Description",
            "skills": [ ... ],
            "applications": [ ... ]
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

### Get Company Applications
```
GET /companies/{id}/applications
```

Response:
```json
{
    "data": [
        {
            "id": 1,
            "status": "pending",
            "post": { ... },
            "volunteer": { ... }
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

### Get Companies Statistics
```
GET /companies/statistics
```

Response:
```json
{
    "total_companies": 20,
    "total_posts": 100,
    "total_applications": 500,
    "posts_by_company": [
        {
            "name": "Company Name",
            "count": 10
        }
    ],
    "applications_by_company": [
        {
            "name": "Company Name",
            "count": 50
        }
    ]
}
```

## Users API

### Get All Users
```
GET /users
```

Query Parameters:
- `search` (optional): Search in username, email, or related profiles
- `role` (optional): Filter by role name

Response:
```json
{
    "data": [
        {
            "id": 1,
            "username": "username",
            "email": "user@example.com",
            "is_active": true,
            "roles": [ ... ],
            "volunteer": { ... },
            "company": { ... }
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

### Create User
```
POST /users
```

Request Body:
```json
{
    "username": "username",
    "email": "user@example.com",
    "password": "password123",
    "role": "role_name"
}
```

Response:
```json
{
    "id": 1,
    "username": "username",
    "email": "user@example.com",
    "is_active": true,
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00"
}
```

### Get Single User
```
GET /users/{id}
```

Response:
```json
{
    "id": 1,
    "username": "username",
    "email": "user@example.com",
    "is_active": true,
    "roles": [ ... ],
    "volunteer": { ... },
    "company": { ... }
}
```

### Update User
```
PUT /users/{id}
```

Request Body:
```json
{
    "username": "updated_username",
    "email": "updated@example.com",
    "password": "newpassword123" // Optional
}
```

Response:
```json
{
    "id": 1,
    "username": "updated_username",
    "email": "updated@example.com",
    "is_active": true,
    "updated_at": "2024-01-02 00:00:00"
}
```

### Delete User
```
DELETE /users/{id}
```

Response:
```
204 No Content
```

### Activate User
```
POST /users/{id}/activate
```

Response:
```json
{
    "message": "User activated successfully"
}
```

### Deactivate User
```
POST /users/{id}/deactivate
```

Response:
```json
{
    "message": "User deactivated successfully"
}
```

### Assign Role
```
POST /users/{id}/assign-role
```

Request Body:
```json
{
    "role": "role_name"
}
```

Response:
```json
{
    "message": "Role assigned successfully"
}
```

### Remove Role
```
POST /users/{id}/remove-role
```

Request Body:
```json
{
    "role": "role_name"
}
```

Response:
```json
{
    "message": "Role removed successfully"
}
```

### Get User Profile
```
GET /users/{id}/profile
```

Response:
```json
{
    "id": 1,
    "username": "username",
    "email": "user@example.com",
    "is_active": true,
    "roles": [ ... ],
    "volunteer": { ... },
    "company": { ... }
}
```

### Update User Profile
```
PUT /users/{id}/profile
```

Request Body:
```