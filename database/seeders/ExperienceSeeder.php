<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Volunteer;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class ExperienceSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = Faker::create();
    }

    public function run(): void
    {
        $volunteers = Volunteer::all();
        $organizations = [
            'Tech Solutions Inc.',
            'Green Earth Foundation',
            'Community Care Center',
            'Global Volunteers',
            'Youth Development Program',
            'Healthcare Initiative',
            'Education First',
            'Environmental Action',
            'Social Impact Network',
            'Community Builders',
        ];

        foreach ($volunteers as $volunteer) {
            // Create 1-3 experience entries per volunteer
            $experienceCount = rand(1, 3);
            
            for ($i = 0; $i < $experienceCount; $i++) {
                $startDate = now()->subYears(rand(1, 5));
                $endDate = $startDate->copy()->addYears(rand(1, 3));

                Experience::create([
                    'id' => Str::uuid(),
                    'volunteer_id' => $volunteer->id,
                    'job_title' => $this->generatePosition(),
                    'organization_name' => $organizations[array_rand($organizations)],
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'description' => $this->generateDescription(),
                    'created_by' => $volunteer->id,
                    'updated_by' => $volunteer->id,
                ]);
            }
        }
    }

    private function generatePosition(): string
    {
        $positions = [
            'Volunteer Coordinator',
            'Program Assistant',
            'Community Outreach Specialist',
            'Event Organizer',
            'Project Manager',
            'Team Leader',
            'Mentor',
            'Tutor',
            'Fundraiser',
            'Social Media Coordinator',
        ];

        return $positions[array_rand($positions)];
    }

    private function generateDescription(): string
    {
        $descriptions = [
            'Coordinated community events and managed volunteer teams.',
            'Developed and implemented outreach programs.',
            'Provided mentorship and support to program participants.',
            'Organized fundraising campaigns and events.',
            'Managed social media presence and community engagement.',
            'Led workshops and training sessions.',
            'Conducted research and data analysis for program improvement.',
            'Facilitated team meetings and project planning.',
            'Created educational materials and resources.',
            'Managed partnerships with local organizations.',
        ];

        return $descriptions[array_rand($descriptions)];
    }
} 