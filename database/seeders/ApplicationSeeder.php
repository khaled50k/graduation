<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Post;
use App\Models\Volunteer;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $posts = Post::all();
        $volunteers = Volunteer::all();
        $statuses = [0, 1, 2]; // 0=Pending, 1=Accepted, 2=Rejected

        foreach ($posts as $post) {
            // Create 1-3 applications per post
            $applicationCount = rand(1, 3);
            $randomVolunteers = $volunteers->random($applicationCount);

            foreach ($randomVolunteers as $volunteer) {
                Application::create([
                    'post_id' => $post->id,
                    'volunteer_id' => $volunteer->id,
                    'status' => $statuses[array_rand($statuses)],
                    'cover_letter' => $this->generateCoverLetter(),
                ]);
            }
        }
    }

    private function generateCoverLetter(): string
    {
        $messages = [
            'I am very interested in this opportunity and believe my skills align well with the requirements.',
            'I would love to contribute to this cause and make a positive impact in the community.',
            'This position matches my experience and interests perfectly. I look forward to the opportunity.',
            'I am excited about the possibility of joining your team and helping achieve your goals.',
            'My background and skills make me a strong candidate for this volunteer position.',
        ];

        return $messages[array_rand($messages)];
    }
} 