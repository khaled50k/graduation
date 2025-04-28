<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Application\StoreApplicationRequest;
use App\Http\Requests\Api\Application\UpdateApplicationRequest;
use App\Models\Application;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends BaseController
{
    /**
     * Display a listing of applications.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $applications = Application::with(['post', 'volunteer'])
            ->when(Auth::user()->isVolunteer(), function ($query) {
                $query->where('volunteer_id', Auth::user()->volunteer->id);
            })
            ->when(Auth::user()->isCompany(), function ($query) {
                $query->whereHas('post', function ($q) {
                    $q->where('company_id', Auth::user()->company->id);
                });
            })
            ->when(request('status'), function ($query) {
                $query->where('status', request('status'));
            })
            ->when(request('post_id'), function ($query) {
                $query->where('post_id', request('post_id'));
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return $this->sendResponse($applications);
    }

    /**
     * Store a newly created application.
     *
     * @param StoreApplicationRequest $request
     * @return JsonResponse
     */
    public function store(StoreApplicationRequest $request): JsonResponse
    {
        if (!Auth::user()->isVolunteer()) {
            return $this->sendForbidden('Only volunteers can create applications');
        }

        $post = Post::findOrFail($request->post_id);

        if (!$post->is_active) {
            return $this->sendError('Cannot apply to inactive post');
        }

        if ($post->deadline < now()) {
            return $this->sendError('Application deadline has passed');
        }

        // Check if volunteer has already applied
        $existingApplication = Application::where('post_id', $request->post_id)
            ->where('volunteer_id', Auth::user()->volunteer->id)
            ->first();

        if ($existingApplication) {
            return $this->sendError('You have already applied to this post');
        }

        $application = Application::create([
            'post_id' => $request->post_id,
            'volunteer_id' => Auth::user()->volunteer->id,
            'status' => 'pending',
            'message' => $request->message,
            'created_by' => Auth::id(),
        ]);

        return $this->sendResponse($application->load(['post', 'volunteer']), 'Application submitted successfully');
    }

    /**
     * Display the specified application.
     *
     * @param Application $application
     * @return JsonResponse
     */
    public function show(Application $application): JsonResponse
    {
        // Check if user is authorized to view this application
        if (!Auth::user()->canViewApplication($application)) {
            return $this->sendForbidden('You are not authorized to view this application');
        }

        return $this->sendResponse($application->load(['post', 'volunteer']));
    }

    /**
     * Update the specified application.
     *
     * @param UpdateApplicationRequest $request
     * @param Application $application
     * @return JsonResponse
     */
    public function update(UpdateApplicationRequest $request, Application $application): JsonResponse
    {
        // Check if user is authorized to update this application
        if (!Auth::user()->canUpdateApplication($application)) {
            return $this->sendForbidden('You are not authorized to update this application');
        }

        $application->update([
            'status' => $request->status,
            'message' => $request->message ?? $application->message,
            'updated_by' => Auth::id(),
        ]);

        return $this->sendResponse($application->load(['post', 'volunteer']), 'Application updated successfully');
    }

    /**
     * Get application statistics.
     *
     * @return JsonResponse
     */
    public function statistics(): JsonResponse
    {
        if (Auth::user()->isVolunteer()) {
            $volunteer = Auth::user()->volunteer;
            
            $statistics = [
                'total_applications' => $volunteer->applications()->count(),
                'pending_applications' => $volunteer->applications()->where('status', 'pending')->count(),
                'accepted_applications' => $volunteer->applications()->where('status', 'accepted')->count(),
                'rejected_applications' => $volunteer->applications()->where('status', 'rejected')->count(),
                'applications_by_month' => $volunteer->applications()
                    ->selectRaw('COUNT(*) as count, MONTH(created_at) as month')
                    ->groupBy('month')
                    ->get(),
            ];
        } else {
            $company = Auth::user()->company;
            
            $statistics = [
                'total_applications' => $company->posts()->withCount('applications')->get()->sum('applications_count'),
                'pending_applications' => $company->posts()
                    ->whereHas('applications', function ($query) {
                        $query->where('status', 'pending');
                    })
                    ->count(),
                'accepted_applications' => $company->posts()
                    ->whereHas('applications', function ($query) {
                        $query->where('status', 'accepted');
                    })
                    ->count(),
                'rejected_applications' => $company->posts()
                    ->whereHas('applications', function ($query) {
                        $query->where('status', 'rejected');
                    })
                    ->count(),
                'applications_by_month' => $company->posts()
                    ->with('applications')
                    ->get()
                    ->pluck('applications')
                    ->flatten()
                    ->groupBy(function ($application) {
                        return $application->created_at->format('m');
                    })
                    ->map(function ($applications) {
                        return $applications->count();
                    }),
            ];
        }

        return $this->sendResponse($statistics);
    }
} 