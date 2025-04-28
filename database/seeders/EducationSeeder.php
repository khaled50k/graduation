<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Volunteer;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        $volunteers = Volunteer::all();
        $institutions = [
            'University of Technology',
            'Community College',
            'Technical Institute',
            'Online Learning Platform',
            'Professional Development Center',
            'Vocational School',
            'Language Institute',
            'Arts Academy',
            'Business School',
            'Healthcare Training Center',
        ];

        foreach ($volunteers as $volunteer) {
            // Create 1-2 education entries per volunteer
            $educationCount = rand(1, 2);
            
            for ($i = 0; $i < $educationCount; $i++) {
                $startDate = now()->subYears(rand(1, 5));
                $endDate = $startDate->copy()->addYears(rand(1, 4));

                Education::create([
                    'volunteer_id' => $volunteer->id,
                    'institution' => $institutions[array_rand($institutions)],
                    'degree' => $this->generateDegree(),
                    'field_of_study' => $this->generateFieldOfStudy(),
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'is_current' => rand(0, 1),
                    'description' => $this->generateDescription(),
                ]);
            }
        }
    }

    private function generateDegree(): string
    {
        $degrees = [
            'Bachelor\'s Degree',
            'Master\'s Degree',
            'Associate Degree',
            'Certificate',
            'Diploma',
            'Professional Certification',
            'Technical Training',
            'Language Proficiency',
            'Online Course',
            'Workshop Completion',
        ];

        return $degrees[array_rand($degrees)];
    }

    private function generateFieldOfStudy(): string
    {
        $fields = [
            'Computer Science',
            'Business Administration',
            'Healthcare',
            'Education',
            'Environmental Science',
            'Social Work',
            'Communications',
            'Psychology',
            'Engineering',
            'Arts and Humanities',
        ];

        return $fields[array_rand($fields)];
    }

    private function generateDescription(): string
    {
        $descriptions = [
            'Completed coursework with focus on practical applications.',
            'Participated in research projects and community initiatives.',
            'Gained hands-on experience through internships and projects.',
            'Developed skills in leadership and team management.',
            'Specialized in industry-specific technologies and methodologies.',
            'Completed capstone project with real-world applications.',
            'Participated in international exchange programs.',
            'Received academic honors and recognition.',
            'Completed professional development workshops.',
            'Gained certification in specialized areas.',
        ];

        return $descriptions[array_rand($descriptions)];
    }
} 