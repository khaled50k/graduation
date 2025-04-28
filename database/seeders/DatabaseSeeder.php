<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,      // First create base users
            SkillSeeder::class,     // Then create skills
            CompanySeeder::class,   // Create company users and profiles
            VolunteerSeeder::class, // Create volunteer users and profiles
            ExperienceSeeder::class,
            PostSeeder::class,
            ApplicationSeeder::class,
        ]);
    }
}
