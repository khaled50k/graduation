<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Post\StorePostRequest;
use App\Http\Requests\Api\Post\UpdatePostRequest;
use App\Models\Post;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostController extends BaseController
{
    /**
     * Display a listing of posts with recommendations for volunteers.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = Post::with(['company', 'skills', 'applications'])
            ->where('is_active', true)
            ->where('deadline', '>', now());

        // If user is authenticated and is a volunteer, add recommendations based on skills
        if (Auth::check() && Auth::user()->user_type === 'volunteer') {
            $volunteerSkills = Auth::user()->volunteer->skills->pluck('id')->toArray();
            
            if (!empty($volunteerSkills)) {
                // Get recommended posts based on skill matching
                $recommendedPosts = $query->whereHas('skills', function ($q) use ($volunteerSkills) {
                    $q->whereIn('skills.id', $volunteerSkills);
                })
                ->withCount(['skills' => function ($q) use ($volunteerSkills) {
                    $q->whereIn('skills.id', $volunteerSkills);
                }])
                ->orderBy('skills_count', 'desc')
                ->get();

                // Get other active posts
                $otherPosts = $query->whereDoesntHave('skills', function ($q) use ($volunteerSkills) {
                    $q->whereIn('skills.id', $volunteerSkills);
                })->get();

                $posts = $recommendedPosts->merge($otherPosts);
            } else {
                $posts = $query->get();
            }
        } else {
            $posts = $query->get();
        }

        return $this->sendResponse($posts);
    }

    /**
     * Store a newly created post.
     *
     * @param StorePostRequest $request
     * @return JsonResponse
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        if (!Auth::check() || Auth::user()->user_type !== 'company') {
            return $this->sendError('Only companies can create posts', [], 403);
        }

        $post = Auth::user()->company->posts()->create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'deadline' => $request->deadline,
            'is_active' => $request->is_active ?? true,
        ]);

        if ($request->has('skills')) {
            $post->skills()->attach($request->skills);
        }

        return $this->sendResponse($post->load('skills'), 'Post created successfully');
    }

    /**
     * Display the specified post.
     *
     * @param Post $post
     * @return JsonResponse
     */
    public function show(Post $post): JsonResponse
    {
        return $this->sendResponse($post->load(['company', 'skills', 'applications']));
    }

    /**
     * Update the specified post.
     *
     * @param UpdatePostRequest $request
     * @param Post $post
     * @return JsonResponse
     */
    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        if (!Auth::check() || Auth::user()->user_type !== 'company' || $post->company_id !== Auth::user()->company->id) {
            return $this->sendError('Unauthorized to update this post', [], 403);
        }

        $post->update($request->validated());

        if ($request->has('skills')) {
            $post->skills()->sync($request->skills);
        }

        return $this->sendResponse($post->load('skills'), 'Post updated successfully');
    }

    /**
     * Remove the specified post.
     *
     * @param Post $post
     * @return JsonResponse
     */
    public function destroy(Post $post): JsonResponse
    {
        if (!Auth::check() || Auth::user()->user_type !== 'company' || $post->company_id !== Auth::user()->company->id) {
            return $this->sendError('Unauthorized to delete this post', [], 403);
        }

        $post->delete();

        return $this->sendResponse([], 'Post deleted successfully');
    }

    /**
     * Get posts for the authenticated company.
     *
     * @return JsonResponse
     */
    public function companyPosts(): JsonResponse
    {
        if (!Auth::check() || Auth::user()->user_type !== 'company') {
            return $this->sendError('Only companies can view their posts', [], 403);
        }

        $posts = Auth::user()->company->posts()
            ->with(['skills', 'applications'])
            ->latest()
            ->get();

        return $this->sendResponse($posts);
    }

    /**
     * Get available skills for posts.
     *
     * @return JsonResponse
     */
    public function availableSkills(): JsonResponse
    {
        $skills = Skill::all();
        return $this->sendResponse($skills);
    }

    /**
     * Get post statistics.
     *
     * @return JsonResponse
     */
    public function statistics(): JsonResponse
    {
        if (!Auth::check() || Auth::user()->user_type !== 'company') {
            return $this->sendResponse([]);
        }

        $stats = [
            'total_posts' => Auth::user()->company->posts()->count(),
            'active_posts' => Auth::user()->company->posts()->where('is_active', true)->count(),
            'total_applications' => Auth::user()->company->posts()->withCount('applications')->get()->sum('applications_count'),
            'monthly_posts' => Auth::user()->company->posts()
                ->select(DB::raw('COUNT(*) as count'), DB::raw('MONTH(created_at) as month'))
                ->groupBy('month')
                ->get(),
        ];

        return $this->sendResponse($stats);
    }

    /**
     * Get personalized feed for volunteers.
     *
     * @return JsonResponse
     */
    public function feed(): JsonResponse
    {
        if (!Auth::check() || Auth::user()->user_type !== 'volunteer') {
            return $this->sendError('Only volunteers can view personalized feed', [], 403);
        }

        $volunteerSkills = Auth::user()->volunteer->skills->pluck('id')->toArray();
        
        if (empty($volunteerSkills)) {
            return $this->sendResponse([]);
        }

        // Get recommended posts with skill matching score
        $posts = Post::with(['company', 'skills', 'applications'])
            ->where('is_active', true)
            ->where('deadline', '>', now())
            ->whereHas('skills', function ($q) use ($volunteerSkills) {
                $q->whereIn('skills.id', $volunteerSkills);
            })
            ->withCount(['skills' => function ($q) use ($volunteerSkills) {
                $q->whereIn('skills.id', $volunteerSkills);
            }])
            ->orderBy('skills_count', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return $this->sendResponse($posts);
    }
} 