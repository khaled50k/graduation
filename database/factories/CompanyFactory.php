<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition(): array
    {
        return [
            'company_name' => $this->faker->company(),
            'website' => $this->faker->url(),
            'bio' => $this->faker->paragraphs(3, true),
        ];
    }

    public function verified()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => true,
            ];
        });
    }

    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => false,
            ];
        });
    }

    public function withSocialMedia()
    {
        return $this->state(function (array $attributes) {
            return [
                'social_media' => [
                    'linkedin' => $this->faker->url,
                    'twitter' => $this->faker->url,
                    'facebook' => $this->faker->url,
                    'instagram' => $this->faker->url,
                ],
            ];
        });
    }

    public function withMetadata()
    {
        return $this->state(function (array $attributes) {
            return [
                'metadata' => [
                    'mission' => $this->faker->sentence,
                    'vision' => $this->faker->sentence,
                    'values' => $this->faker->words(5, true),
                ],
            ];
        });
    }
} 