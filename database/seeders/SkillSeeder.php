<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            'Web Development',
            'Mobile Development',
            'UI/UX Design',
            'Project Management',
            'Content Writing',
            'Digital Marketing',
            'Data Analysis',
            'Teaching',
            'Event Planning',
            'Social Media Management',
            'Graphic Design',
            'Video Editing',
            'Photography',
            'Translation',
            'Customer Service',
        ];

        foreach ($skills as $skillName) {
            Skill::updateOrCreate(
                ['name' => $skillName],
                ['id' => Str::uuid()]
            );
        }
    }
} 