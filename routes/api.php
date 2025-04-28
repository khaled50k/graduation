<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\VolunteerController;

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
});


