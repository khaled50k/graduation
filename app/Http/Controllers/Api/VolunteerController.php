<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Volunteer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\VolunteerResource;
use App\Http\Resources\SkillResource;
use App\Http\Resources\ExperienceResource;
use App\Http\Resources\EducationResource;
use App\Http\Resources\ApplicationResource;
use App\Http\Requests\Api\Volunteer\UpdateVolunteerRequest;

class VolunteerController extends BaseController
{
    /**
     * Display a listing of volunteers.
     *
     * @param Request $request
     * @return Response
     * 
     * @queryParam search string Search volunteers by name. Example: "John"
     * @queryParam skills string Comma-separated list of skill IDs to filter by. Example: "1,2,3"
     * @queryParam per_page integer Number of items per page. Default: 15
     */
    public function index(Request $request)
    {
        $query = Volunteer::query()
            ->with(['user', 'skills', 'experiences', 'educations'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('second_name', 'like', "%{$search}%")
                      ->orWhere('third_name', 'like', "%{$search}%")
                      ->orWhere('fourth_name', 'like', "%{$search}%");
                });
            })
            ->when($request->skills, function ($query, $skills) {
                $skillIds = explode(',', $skills);
                $query->whereHas('skills', function ($q) use ($skillIds) {
                    $q->whereIn('id', $skillIds);
                });
            });

        $volunteers = $query->paginate($request->per_page ?? 15);
        
        return $this->sendResponse(
            VolunteerResource::collection($volunteers),
            'Volunteers retrieved successfully'
        );
    }

    /**
     * Display the specified volunteer.
     *
     * @param Volunteer $volunteer
     * @return Response
     * 
     * @urlParam volunteer string required The ID of the volunteer. Example: "123e4567-e89b-12d3-a456-426614174000"
     */
    public function show(Volunteer $volunteer)
    {
        $volunteer->load(['user', 'skills', 'experiences', 'educations']);
        
        return $this->sendResponse(
            new VolunteerResource($volunteer),
            'Volunteer retrieved successfully'
        );
    }

    /**
     * Update volunteer profile.
     *
     * @param UpdateVolunteerRequest $request
     * @param Volunteer $volunteer
     * @return Response
     * 
     * @urlParam volunteer string required The ID of the volunteer. Example: "123e4567-e89b-12d3-a456-426614174000"
     * @authenticated
     */
    public function update(UpdateVolunteerRequest $request, Volunteer $volunteer)
    {
        if (!Auth::user()->isVolunteer() && Auth::id() !== $volunteer->user_id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        $volunteer->update($request->validated());

        if ($request->has('skills')) {
            $volunteer->skills()->sync($request->skills);
        }

        $volunteer->load(['user', 'skills', 'experiences', 'educations']);

        return $this->sendResponse(
            new VolunteerResource($volunteer),
            'Volunteer updated successfully'
        );
    }

    /**
     * Get volunteer's applications.
     *
     * @param Volunteer $volunteer
     * @return Response
     * 
     * @urlParam volunteer string required The ID of the volunteer. Example: "123e4567-e89b-12d3-a456-426614174000"
     * @authenticated
     */
    public function applications(Volunteer $volunteer)
    {
        if (!Auth::user()->isVolunteer() && Auth::id() !== $volunteer->user_id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        $applications = $volunteer->applications()
            ->with(['post.company', 'post.skills'])
            ->paginate(15);

        return $this->sendResponse(
            ApplicationResource::collection($applications),
            'Volunteer applications retrieved successfully'
        );
    }

    /**
     * Get volunteer's skills.
     *
     * @param Volunteer $volunteer
     * @return Response
     * 
     * @urlParam volunteer string required The ID of the volunteer. Example: "123e4567-e89b-12d3-a456-426614174000"
     */
    public function skills(Volunteer $volunteer)
    {
        return $this->sendResponse(
            SkillResource::collection($volunteer->skills),
            'Volunteer skills retrieved successfully'
        );
    }

    /**
     * Get volunteer's experiences.
     *
     * @param Volunteer $volunteer
     * @return Response
     * 
     * @urlParam volunteer string required The ID of the volunteer. Example: "123e4567-e89b-12d3-a456-426614174000"
     */
    public function experiences(Volunteer $volunteer)
    {
        return $this->sendResponse(
            ExperienceResource::collection($volunteer->experiences),
            'Volunteer experiences retrieved successfully'
        );
    }

    /**
     * Get volunteer's education history.
     *
     * @param Volunteer $volunteer
     * @return Response
     * 
     * @urlParam volunteer string required The ID of the volunteer. Example: "123e4567-e89b-12d3-a456-426614174000"
     */
    public function educations(Volunteer $volunteer)
    {
        return $this->sendResponse(
            EducationResource::collection($volunteer->educations),
            'Volunteer education history retrieved successfully'
        );
    }

    /**
     * Get volunteer statistics.
     *
     * @return Response
     * 
     * @response {
     *   "total_volunteers": 100,
     *   "active_volunteers": 50,
     *   "skill_distribution": [
     *     {
     *       "name": "PHP",
     *       "count": 30
     *     },
     *     {
     *       "name": "JavaScript",
     *       "count": 25
     *     }
     *   ]
     * }
     */
    public function statistics()
    {
        $totalVolunteers = Volunteer::count();
        $activeVolunteers = Volunteer::whereHas('applications', function($query) {
            $query->where('created_at', '>=', now()->subDays(30));
        })->count();
        
        $skillDistribution = Volunteer::join('skill_volunteer', 'volunteers.id', '=', 'skill_volunteer.volunteer_id')
            ->join('skills', 'skill_volunteer.skill_id', '=', 'skills.id')
            ->selectRaw('skills.name, COUNT(*) as count')
            ->groupBy('skills.id', 'skills.name')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return $this->sendResponse([
            'total_volunteers' => $totalVolunteers,
            'active_volunteers' => $activeVolunteers,
            'skill_distribution' => $skillDistribution,
        ], 'Volunteer statistics retrieved successfully');
    }
} 