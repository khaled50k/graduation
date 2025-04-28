<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Company;
use App\Models\Post;
use App\Models\Application;
use App\Http\Requests\Api\Company\StoreCompanyRequest;
use App\Http\Requests\Api\Company\UpdateCompanyRequest;
use App\Http\Requests\Api\Post\StorePostRequest;
use App\Http\Requests\Api\Post\UpdatePostRequest;
use App\Http\Requests\Api\Application\UpdateApplicationRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CompanyController extends BaseController
{
    /**
     * Display a listing of companies.
     */
    public function index(Request $request)
    {
        $query = Company::query();

        // Apply search filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Apply status filter
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Apply verification filter
        if ($request->has('is_verified')) {
            $query->where('is_verified', $request->is_verified);
        }

        $companies = $query->with(['user', 'posts'])
            ->paginate($request->per_page ?? 15);

        return $this->sendResponse($companies, 'Companies retrieved successfully');
    }

    /**
     * Store a newly created company.
     */
    public function store(StoreCompanyRequest $request)
    {
        $company = Company::create($request->validated());

        return $this->sendResponse($company, 'Company created successfully', Response::HTTP_CREATED);
    }

    /**
     * Display the specified company.
     */
    public function show(Company $company)
    {
        $company->load(['user', 'posts', 'posts.applications']);

        return $this->sendResponse($company, 'Company retrieved successfully');
    }

    /**
     * Update the specified company.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $company->update($request->validated());

        return $this->sendResponse($company, 'Company updated successfully');
    }

    /**
     * Remove the specified company.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return $this->sendResponse(null, 'Company deleted successfully');
    }

    /**
     * Verify the specified company.
     */
    public function verify(Company $company)
    {
        $company->update(['is_verified' => true]);

        return $this->sendResponse($company, 'Company verified successfully');
    }

    /**
     * Unverify the specified company.
     */
    public function unverify(Company $company)
    {
        $company->update(['is_verified' => false]);

        return $this->sendResponse($company, 'Company verification removed');
    }

    /**
     * Activate the specified company.
     */
    public function activate(Company $company)
    {
        $company->update(['status' => 'active']);

        return $this->sendResponse($company, 'Company activated successfully');
    }

    /**
     * Deactivate the specified company.
     */
    public function deactivate(Company $company)
    {
        $company->update(['status' => 'inactive']);

        return $this->sendResponse($company, 'Company deactivated successfully');
    }

    /**
     * Get company's posts.
     */
    public function posts()
    {
        $posts = auth()->user()->company->posts()
            ->with(['applications', 'skills'])
            ->paginate(request()->per_page ?? 15);

        return $this->sendResponse($posts, 'Company posts retrieved successfully');
    }

    /**
     * Get company's applications.
     */
    public function applications()
    {
        $applications = auth()->user()->company->posts()
            ->with(['applications.volunteer.user', 'applications.post'])
            ->get()
            ->pluck('applications')
            ->flatten()
            ->paginate(request()->per_page ?? 15);

        return $this->sendResponse($applications, 'Company applications retrieved successfully');
    }

    /**
     * Get company statistics.
     */
    public function statistics()
    {
        $company = auth()->user()->company;
        
        $statistics = [
            'total_posts' => $company->posts()->count(),
            'active_posts' => $company->posts()->where('is_active', true)->count(),
            'total_applications' => $company->posts()->withCount('applications')->get()->sum('applications_count'),
            'applications_by_status' => $company->posts()
                ->with('applications')
                ->get()
                ->pluck('applications')
                ->flatten()
                ->groupBy('status')
                ->map->count(),
            'monthly_posts' => $company->posts()
                ->selectRaw('COUNT(*) as count, MONTH(created_at) as month')
                ->groupBy('month')
                ->get()
        ];

        return $this->sendResponse($statistics, 'Company statistics retrieved successfully');
    }

    /**
     * Get post-specific statistics.
     */
    public function postStatistics()
    {
        $company = auth()->user()->company;
        
        $statistics = [
            'total_posts' => $company->posts()->count(),
            'active_posts' => $company->posts()->where('is_active', true)->count(),
            'posts_by_month' => $company->posts()
                ->selectRaw('COUNT(*) as count, MONTH(created_at) as month')
                ->groupBy('month')
                ->get(),
            'posts_by_status' => $company->posts()
                ->selectRaw('COUNT(*) as count, is_active')
                ->groupBy('is_active')
                ->get()
        ];

        return $this->sendResponse($statistics, 'Post statistics retrieved successfully');
    }

    /**
     * Get application-specific statistics.
     */
    public function applicationStatistics()
    {
        $company = auth()->user()->company;
        
        $statistics = [
            'total_applications' => $company->posts()->withCount('applications')->get()->sum('applications_count'),
            'applications_by_status' => $company->posts()
                ->with('applications')
                ->get()
                ->pluck('applications')
                ->flatten()
                ->groupBy('status')
                ->map->count(),
            'applications_by_month' => $company->posts()
                ->with('applications')
                ->get()
                ->pluck('applications')
                ->flatten()
                ->groupBy(function ($application) {
                    return $application->created_at->format('Y-m');
                })
                ->map->count()
        ];

        return $this->sendResponse($statistics, 'Application statistics retrieved successfully');
    }

    /**
     * Get company profile.
     */
    public function profile()
    {
        $company = auth()->user()->company;
        $company->load(['user', 'posts', 'posts.applications']);

        return $this->sendResponse($company, 'Company profile retrieved successfully');
    }

    /**
     * Update company profile.
     */
    public function updateProfile(UpdateCompanyRequest $request)
    {
        $company = auth()->user()->company;
        $company->update($request->validated());

        return $this->sendResponse($company, 'Company profile updated successfully');
    }

    /**
     * Create a new post.
     */
    public function createPost(StorePostRequest $request)
    {
        $post = auth()->user()->company->posts()->create($request->validated());

        if ($request->has('skills')) {
            $post->skills()->attach($request->skills);
        }

        return $this->sendResponse($post, 'Post created successfully', Response::HTTP_CREATED);
    }

    /**
     * Show specific post.
     */
    public function showPost(Post $post)
    {
        $this->authorize('view', $post);
        
        $post->load(['applications', 'skills']);

        return $this->sendResponse($post, 'Post retrieved successfully');
    }

    /**
     * Update a post.
     */
    public function updatePost(UpdatePostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $post->update($request->validated());

        if ($request->has('skills')) {
            $post->skills()->sync($request->skills);
        }

        return $this->sendResponse($post, 'Post updated successfully');
    }

    /**
     * Delete a post.
     */
    public function deletePost(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        return $this->sendResponse([], 'Post deleted successfully');
    }

    /**
     * Show specific application.
     */
    public function showApplication(Application $application)
    {
        $this->authorize('view', $application);
        
        $application->load(['volunteer.user', 'post']);

        return $this->sendResponse($application, 'Application retrieved successfully');
    }

    /**
     * Update application status.
     */
    public function updateApplication(UpdateApplicationRequest $request, Application $application)
    {
        $this->authorize('update', $application);

        $application->update($request->validated());

        return $this->sendResponse($application, 'Application updated successfully');
    }
} 