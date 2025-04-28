<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends BaseController
{
    /**
     * Register a new volunteer.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'national_id' => $request->national_id,
            'location' => $request->location,
            'user_type' => User::TYPE_VOLUNTEER,
            'is_active' => true,
        ]);

        // Create volunteer record
        $user->volunteer()->create([
            'first_name' => $request->first_name,
            'second_name' => $request->second_name,
            'third_name' => $request->third_name,
            'fourth_name' => $request->fourth_name,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'user' => $user->load('volunteer'),
            'token' => $token,
        ], 'Volunteer registered successfully');
    }

    /**
     * Login user and create token.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = User::where('email', $request->email)->first();
        
        if (!$user->is_active) {
            return $this->sendError('Account is deactivated', [], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'user' => $user->load($user->isVolunteer() ? 'volunteer' : 'company'),
            'token' => $token,
        ], 'User logged in successfully');
    }

    /**
     * Logout user (Revoke the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        Auth::user()->tokens()->delete();

        return $this->sendResponse([], 'User logged out successfully');
    }

    /**
     * Get authenticated user.
     *
     * @return JsonResponse
     */
    public function user(): JsonResponse
    {
        $user = Auth::user();
        
        // Load relationships based on user type
        if (Auth::check() && Auth::user()->user_type === 'volunteer') {
            $user->load('volunteer.skills', 'volunteer.educations', 'volunteer.experiences');
        } elseif ($user->isCompany()) {
            $user->load('company.posts');
        }

        return $this->sendResponse($user);
    }
} 