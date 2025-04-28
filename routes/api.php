<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\VolunteerController;
use App\Http\Controllers\Api\CompanyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Company Management Routes
    Route::prefix('company')->middleware('company')->group(function () {
        // Company Profile
        Route::get('/profile', [CompanyController::class, 'profile']);
        Route::put('/profile', [CompanyController::class, 'updateProfile']);
        
        // Company Posts
        Route::get('/posts', [CompanyController::class, 'posts']);
        Route::post('/posts', [CompanyController::class, 'createPost']);
        Route::get('/posts/{post}', [CompanyController::class, 'showPost']);
        Route::put('/posts/{post}', [CompanyController::class, 'updatePost']);
        Route::delete('/posts/{post}', [CompanyController::class, 'deletePost']);
        
        // Company Applications
        Route::get('/applications', [CompanyController::class, 'applications']);
        Route::get('/applications/{application}', [CompanyController::class, 'showApplication']);
        Route::put('/applications/{application}', [CompanyController::class, 'updateApplication']);
        
        // Company Statistics
        Route::get('/statistics', [CompanyController::class, 'statistics']);
        Route::get('/statistics/posts', [CompanyController::class, 'postStatistics']);
        Route::get('/statistics/applications', [CompanyController::class, 'applicationStatistics']);
    });

    // Volunteer Management Routes
    Route::prefix('volunteer')->middleware('volunteer')->group(function () {
        // Volunteer Profile
        Route::get('/profile', [VolunteerController::class, 'profile']);
        Route::put('/profile', [VolunteerController::class, 'updateProfile']);
        
        // Volunteer Applications
        Route::get('/applications', [VolunteerController::class, 'applications']);
        Route::post('/applications', [VolunteerController::class, 'createApplication']);
        Route::get('/applications/{application}', [VolunteerController::class, 'showApplication']);
        
        // Volunteer Skills
        Route::get('/skills', [VolunteerController::class, 'skills']);
        Route::post('/skills', [VolunteerController::class, 'addSkill']);
        Route::delete('/skills/{skill}', [VolunteerController::class, 'removeSkill']);
    });

    // Public Posts
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}', [PostController::class, 'show']);
    Route::get('/posts/feed', [PostController::class, 'feed']);

    // Post routes
    Route::prefix('posts')->group(function () {
        Route::get('/', [PostController::class, 'index']);
        Route::get('/feed', [PostController::class, 'feed']);
        Route::get('/company', [PostController::class, 'companyPosts']);
        Route::get('/skills', [PostController::class, 'availableSkills']);
        Route::get('/statistics', [PostController::class, 'statistics']);
        
        Route::post('/', [PostController::class, 'store']);
        Route::get('/{post}', [PostController::class, 'show']);
        Route::put('/{post}', [PostController::class, 'update']);
        Route::delete('/{post}', [PostController::class, 'destroy']);
    });

    // Application routes
    Route::prefix('applications')->group(function () {
        Route::get('/', [ApplicationController::class, 'index']);
        Route::get('/statistics', [ApplicationController::class, 'statistics']);
        
        Route::post('/', [ApplicationController::class, 'store']);
        Route::get('/{application}', [ApplicationController::class, 'show']);
        Route::put('/{application}', [ApplicationController::class, 'update']);
    });

    // Volunteer routes
    Route::prefix('volunteers')->group(function () {
        Route::get('/', [VolunteerController::class, 'index']);
        Route::get('/statistics', [VolunteerController::class, 'statistics']);
        Route::get('/{volunteer}', [VolunteerController::class, 'show']);
        Route::put('/{volunteer}', [VolunteerController::class, 'update']);
        Route::get('/{volunteer}/applications', [VolunteerController::class, 'applications']);
        Route::get('/{volunteer}/skills', [VolunteerController::class, 'skills']);
        Route::get('/{volunteer}/experiences', [VolunteerController::class, 'experiences']);
        Route::get('/{volunteer}/educations', [VolunteerController::class, 'educations']);
    });

    // Company routes
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::post('/companies', [CompanyController::class, 'store']);
    Route::get('/companies/{company}', [CompanyController::class, 'show']);
    Route::put('/companies/{company}', [CompanyController::class, 'update']);
    Route::delete('/companies/{company}', [CompanyController::class, 'destroy']);
    
    // Company Status Management
    Route::post('/companies/{company}/verify', [CompanyController::class, 'verify']);
    Route::post('/companies/{company}/unverify', [CompanyController::class, 'unverify']);
    Route::post('/companies/{company}/activate', [CompanyController::class, 'activate']);
    Route::post('/companies/{company}/deactivate', [CompanyController::class, 'deactivate']);
    
    // Company Related Data
    Route::get('/companies/{company}/posts', [CompanyController::class, 'posts']);
    Route::get('/companies/{company}/applications', [CompanyController::class, 'applications']);
    Route::get('/companies/{company}/statistics', [CompanyController::class, 'statistics']);
});


