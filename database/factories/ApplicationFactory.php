<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\Post;
use App\Models\Volunteer;
use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationFactory extends Factory
{
    protected $model = Application::class;

    public function definition()
    {
        return [
            'post_id' => Post::factory(),
            'volunteer_id' => Volunteer::factory(),
            'status' => $this->faker->randomElement(['pending', 'reviewing', 'accepted', 'rejected']),
            'message' => $this->faker->optional(0.8)->paragraph,
            'applied_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'processed_at' => $this->faker->optional(0.5)->dateTimeBetween('-1 month', 'now'),
            'notes' => $this->faker->optional(0.3)->paragraphs(2, true),
            'rating' => $this->faker->optional(0.2)->numberBetween(1, 5),
            'feedback' => $this->faker->optional(0.2)->paragraph,
        ];
    }

    public function pending()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'pending',
                'processed_at' => null,
            ];
        });
    }

    public function reviewing()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'reviewing',
                'processed_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            ];
        });
    }

    public function accepted()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'accepted',
                'processed_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            ];
        });
    }

    public function rejected()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'rejected',
                'processed_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            ];
        });
    }

    public function withFeedback()
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => $this->faker->numberBetween(1, 5),
                'feedback' => $this->faker->paragraph,
            ];
        });
    }
} 