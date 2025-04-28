<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            [
                'company_name' => 'Tech Solutions Inc.',
                'website' => 'https://techsolutions.com',
                'bio' => 'Leading technology solutions provider',
            ],
            [
                'company_name' => 'Green Earth Foundation',
                'website' => 'https://greenearth.org',
                'bio' => 'Environmental conservation organization',
            ],
            [
                'company_name' => 'Community Care Center',
                'website' => 'https://communitycare.org',
                'bio' => 'Community support and development center',
            ],
        ];

        foreach ($companies as $companyData) {
            // Create user for company
            $user = User::create([
                'id' => Str::uuid(),
                'username' => Str::slug($companyData['company_name']),
                'email' => 'info@' . parse_url($companyData['website'], PHP_URL_HOST),
                'password' => bcrypt('password'),
                'national_id' => Str::random(10),
                'location' => 'Company Location',
                'user_type' => User::TYPE_COMPANY,
                'is_active' => true,
            ]);

            // Create company profile
            Company::create([
                'id' => $user->id,
                'company_name' => $companyData['company_name'],
                'website' => $companyData['website'],
                'bio' => $companyData['bio'],
            ]);
        }

        // Create additional random companies with their users
        for ($i = 0; $i < 7; $i++) {
            $faker = \Faker\Factory::create();
            
            // Create user for company
            $user = User::create([
                'id' => Str::uuid(),
                'username' => 'company_' . Str::random(8),
                'email' => $faker->companyEmail,
                'password' => bcrypt('password'),
                'national_id' => Str::random(10),
                'location' => $faker->city,
                'user_type' => User::TYPE_COMPANY,
                'is_active' => true,
            ]);

            // Create company using factory with user's ID
            Company::factory()->create([
                'id' => $user->id,
            ]);
        }
    }
} 