<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use App\Models\Company;
use App\Models\Volunteer;
use App\Models\Application;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    protected $volunteerUser;
    protected $companyUser;
    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test users
        $this->volunteerUser = User::factory()->create([
            'role' => 'volunteer',
            'email' => 'volunteer@test.com',
            'password' => bcrypt('password'),
        ]);

        $this->companyUser = User::factory()->create([
            'role' => 'company',
            'email' => 'company@test.com',
            'password' => bcrypt('password'),
        ]);

        $this->adminUser = User::factory()->create([
            'role' => 'admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
        ]);

        // Create volunteer profile
        Volunteer::factory()->create([
            'user_id' => $this->volunteerUser->id,
        ]);

        // Create company profile
        Company::factory()->create([
            'user_id' => $this->companyUser->id,
        ]);
    }

    public function test_register()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'volunteer',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'user' => ['id', 'name', 'email', 'role'],
                'token',
            ]);
    }

    public function test_login()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'volunteer@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'user' => ['id', 'name', 'email', 'role'],
                'token',
            ]);
    }

    public function test_get_posts()
    {
        // Create some posts
        Post::factory()->count(5)->create();

        $response = $this->actingAs($this->volunteerUser)
            ->getJson('/api/posts');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'company' => ['id', 'name'],
                    ],
                ],
                'meta' => ['current_page', 'from', 'to', 'total'],
            ]);
    }

    public function test_create_application()
    {
        $post = Post::factory()->create();

        $response = $this->actingAs($this->volunteerUser)
            ->postJson('/api/applications', [
                'post_id' => $post->id,
                'message' => 'I am interested in this opportunity.',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'application' => [
                    'id',
                    'post_id',
                    'volunteer_id',
                    'status',
                    'message',
                ],
            ]);
    }

    public function test_update_application_status()
    {
        $post = Post::factory()->create([
            'company_id' => $this->companyUser->company->id,
        ]);

        $application = Application::factory()->create([
            'post_id' => $post->id,
            'volunteer_id' => $this->volunteerUser->volunteer->id,
        ]);

        $response = $this->actingAs($this->companyUser)
            ->postJson("/api/applications/{$application->id}/status", [
                'status' => 'accepted',
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Application status updated successfully',
                'application' => [
                    'status' => 'accepted',
                ],
            ]);
    }

    public function test_get_personalized_feed()
    {
        // Create posts with different skills
        $posts = Post::factory()->count(5)->create();

        $response = $this->actingAs($this->volunteerUser)
            ->getJson('/api/posts/personalized-feed');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'post' => [
                            'id',
                            'title',
                            'description',
                            'company' => ['id', 'name'],
                        ],
                        'relevance_score',
                        'matching_skills',
                    ],
                ],
                'meta' => ['current_page', 'from', 'to', 'total'],
            ]);
    }

    public function test_get_statistics()
    {
        $response = $this->actingAs($this->adminUser)
            ->getJson('/api/posts/statistics');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'total_posts',
                'total_companies',
                'total_applications',
                'posts_by_company',
                'applications_by_status',
                'skills_distribution',
                'recent_activity',
            ]);
    }
} 