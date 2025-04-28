<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'username' => $this->faker->unique()->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),
            'national_id' => $this->faker->unique()->numerify('##########'),
            'location' => $this->faker->city(),
            'user_type' => $this->faker->randomElement([User::TYPE_VOLUNTEER, User::TYPE_COMPANY, User::TYPE_ADMIN]),
            'is_active' => true,
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function volunteer()
    {
        return $this->state(function (array $attributes) {
            return [
                'user_type' => User::TYPE_VOLUNTEER,
            ];
        });
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function company()
    {
        return $this->state(function (array $attributes) {
            return [
                'user_type' => User::TYPE_COMPANY,
            ];
        });
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'user_type' => User::TYPE_ADMIN,
            ];
        });
    }

    /**
     * Indicate that the user is inactive.
     */
    public function inactive()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }
}
