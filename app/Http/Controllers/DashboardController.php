<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use App\Models\Company;
use App\Models\Application;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get current month and previous month dates
        $currentMonth = Carbon::now();
        $previousMonth = Carbon::now()->subMonth();

        // Get counts for current month
        $currentMonthUsers = User::whereMonth('created_at', $currentMonth->month)->count();
        $currentMonthPosts = Post::whereMonth('created_at', $currentMonth->month)->where('is_active', true)->count();
        $currentMonthCompanies = Company::whereMonth('created_at', $currentMonth->month)->count();
        $currentMonthApplications = Application::whereMonth('created_at', $currentMonth->month)->count();

        // Get counts for previous month
        $previousMonthUsers = User::whereMonth('created_at', $previousMonth->month)->count();
        $previousMonthPosts = Post::whereMonth('created_at', $previousMonth->month)->where('is_active', true)->count();
        $previousMonthCompanies = Company::whereMonth('created_at', $previousMonth->month)->count();
        $previousMonthApplications = Application::whereMonth('created_at', $previousMonth->month)->count();

        // Calculate growth percentages
        $userGrowth = $previousMonthUsers > 0 ? (($currentMonthUsers - $previousMonthUsers) / $previousMonthUsers) * 100 : 0;
        $postGrowth = $previousMonthPosts > 0 ? (($currentMonthPosts - $previousMonthPosts) / $previousMonthPosts) * 100 : 0;
        $companyGrowth = $previousMonthCompanies > 0 ? (($currentMonthCompanies - $previousMonthCompanies) / $previousMonthCompanies) * 100 : 0;
        $applicationGrowth = $previousMonthApplications > 0 ? (($currentMonthApplications - $previousMonthApplications) / $previousMonthApplications) * 100 : 0;

        // Get recent applications
        $recentApplications = Application::with(['post.company', 'volunteer'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($application) {
                return [
                    'title' => $application->post->title,
                    'company' => $application->post->company->name,
                    'status' => $application->status,
                    'time' => Carbon::parse($application->created_at)->diffForHumans()
                ];
            });

        // Get recent posts
        $recentPosts = Post::with(['company', 'applications'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($post) {
                return [
                    'title' => $post->title,
                    'company' => $post->company->name,
                    'applications' => $post->applications->count(),
                    'time' => Carbon::parse($post->created_at)->diffForHumans()
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'users' => User::count(),
                'activePosts' => Post::where('is_active', true)->count(),
                'companies' => Company::count(),
                'applications' => Application::count(),
                'userGrowth' => round($userGrowth, 1),
                'postGrowth' => round($postGrowth, 1),
                'companyGrowth' => round($companyGrowth, 1),
                'applicationGrowth' => round($applicationGrowth, 1),
            ],
            'recentApplications' => $recentApplications,
            'recentPosts' => $recentPosts
        ]);
    }
} 