<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'id' => Str::uuid(),
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'national_id' => '1234567890',
                'location' => 'Admin City',
                'user_type' => User::TYPE_ADMIN,
                'is_active' => true,
            ]
        );

        // Company user
        User::updateOrCreate(
            ['username' => 'company'],
            [
                'id' => Str::uuid(),
                'email' => 'company@example.com',
                'password' => Hash::make('password'),
                'national_id' => '0987654321',
                'location' => 'Company City',
                'user_type' => User::TYPE_COMPANY,
                'is_active' => true,
            ]
        );

        // Volunteer user
        User::updateOrCreate(
            ['username' => 'volunteer'],
            [
                'id' => Str::uuid(),
                'email' => 'volunteer@example.com',
                'password' => Hash::make('password'),
                'national_id' => '1122334455',
                'location' => 'Volunteer City',
                'user_type' => User::TYPE_VOLUNTEER,
                'is_active' => true,
            ]
        );

        // Create additional random users
        User::factory(10)->create();
    }
} 