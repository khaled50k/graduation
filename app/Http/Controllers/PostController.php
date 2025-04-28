<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Company;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index(Request $request)
    {
        $posts = Post::with(['company', 'skills', 'applications'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($request->company, function ($query, $company) {
                $query->where('company_id', $company);
            })
            ->when($request->skill, function ($query, $skill) {
                $query->whereHas('skills', function ($q) use ($skill) {
                    $q->where('skills.id', $skill);
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('is_active', $status === 'active');
            })
            ->withCount('applications')
            ->latest()
            ->paginate(10);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'companies' => Company::all(),
            'skills' => Skill::all(),
            'filters' => $request->only(['search', 'company', 'skill', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        $companies = Company::whereHas('user', function ($query) {
            $query->where('is_active', true);
        })->get();
        $skills = Skill::all();

        return Inertia::render('Posts/Create', [
            'companies' => $companies,
            'skills' => $skills,
        ]);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|uuid|exists:companies,id',
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'deadline' => 'required|date|after:today',
            'is_active' => 'boolean',
            'skills' => 'required|array',
            'skills.*' => 'required|uuid|exists:skills,id',
        ]);

        $post = Post::create($validated);
        $post->skills()->attach($validated['skills']);

        return redirect()->route('posts.index');
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        $post->load(['company', 'skills', 'applications']);

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified post.
     */
    public function edit(Post $post)
    {
        $post->load(['company', 'skills']);
        $companies = Company::select('id', 'company_name')->get();
        $skills = Skill::select('id', 'name')->get();

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'companies' => $companies,
            'skills' => $skills,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'company_id' => 'required|uuid|exists:companies,id',
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'deadline' => 'required|date|after:today',
            'is_active' => 'boolean',
            'skills' => 'required|array',
            'skills.*' => 'required|uuid|exists:skills,id',
        ]);

        $post->update($validated);
        $post->skills()->sync($validated['skills']);

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post)
    {
        // Detach relationships before deleting
        $post->skills()->detach();
        $post->applications()->delete();
        
        $post->delete();

        return redirect()->route('posts.index');
    }
} 