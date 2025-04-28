<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Company;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();
        $skills = Skill::all();

        foreach ($companies as $company) {
            // Create 2-4 posts for each company
            $numPosts = rand(2, 4);
            
            for ($i = 0; $i < $numPosts; $i++) {
                $post = Post::factory()->create([
                    'company_id' => $company->id,
                    'deadline' => Carbon::now()->addDays(rand(30, 90)),
                    'is_active' => true,
                ]);

                // Attach 2-5 random skills to each post
                $randomSkills = $skills->random(rand(2, 5));
                $post->skills()->attach($randomSkills->pluck('id')->toArray());
            }
        }
    }
} 