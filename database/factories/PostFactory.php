<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'company_id' => Company::factory(),
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraphs(3, true),
            'location' => $this->faker->city,
            'deadline' => $this->faker->dateTimeBetween('now', '+1 year'),
            'is_active' => true,
        ];
    }

    public function inactive()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }

    public function withDeadline($days)
    {
        return $this->state(function (array $attributes) use ($days) {
            return [
                'deadline' => now()->addDays($days),
            ];
        });
    }
} 