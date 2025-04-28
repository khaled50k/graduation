<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Volunteer;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class VolunteerSeeder extends Seeder
{
    public function run(): void
    {
        // Create a sample volunteer user
        $user = User::create([
            'id' => Str::uuid(),
            'username' => 'johndoe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'national_id' => Str::random(10),
            'location' => 'New York',
            'user_type' => 1, // 1=Volunteer
            'is_active' => true
        ]);

        // Create volunteer profile
        $volunteer = Volunteer::create([
            'id' => $user->id,
            'first_name' => 'John',
            'second_name' => 'Doe',
            'third_name' => 'Smith',
            'fourth_name' => 'Johnson',
            'created_by' => $user->id,
            'updated_by' => $user->id
        ]);

        // Attach skills
        $skills = Skill::whereIn('name', [
            'PHP',
            'Laravel',
            'JavaScript',
            'React',
            'MySQL',
            'Git',
            'REST API',
            'HTML/CSS'
        ])->get();

        foreach ($skills as $skill) {
            $volunteer->skills()->attach($skill->id, [
                'proficiency_level' => rand(3, 5) // High proficiency in these skills
            ]);
        }

        // Create some experience entries
        $volunteer->experiences()->create([
            'id' => Str::uuid(),
            'job_title' => 'Senior Web Developer',
            'organization_name' => 'Tech Solutions Inc.',
            'start_date' => now()->subYears(2),
            'end_date' => now(),
            'description' => 'Developed and maintained web applications using Laravel and React',
            'created_by' => $user->id,
            'updated_by' => $user->id
        ]);

        $volunteer->experiences()->create([
            'id' => Str::uuid(),
            'job_title' => 'Open Source Contributor',
            'organization_name' => 'Various Projects',
            'start_date' => now()->subYears(1),
            'end_date' => now(),
            'description' => 'Contributed to various open source projects in the Laravel ecosystem',
            'created_by' => $user->id,
            'updated_by' => $user->id
        ]);

        $this->command->info('Sample volunteer created with email: john@example.com and password: password');
    }
} 