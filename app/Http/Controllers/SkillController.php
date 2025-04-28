<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the skills.
     */
    public function index(Request $request)
    {
        $skills = Skill::with(['volunteers', 'posts'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Skills/Index', [
            'skills' => $skills,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new skill.
     */
    public function create()
    {
        return Inertia::render('Skills/Create');
    }

    /**
     * Store a newly created skill in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:skills,name',
        ]);

        Skill::create($validated);

        return redirect()->route('skills.index');
    }

    /**
     * Display the specified skill.
     */
    public function show(Skill $skill)
    {
        $skill->load(['volunteers', 'posts']);

        return Inertia::render('Skills/Show', [
            'skill' => $skill,
        ]);
    }

    /**
     * Show the form for editing the specified skill.
     */
    public function edit(Skill $skill)
    {
        $skill->load(['volunteers', 'posts']);

        return Inertia::render('Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    /**
     * Update the specified skill in storage.
     */
    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:skills,name,' . $skill->id,
        ]);

        $skill->update($validated);

        return redirect()->route('skills.index');
    }

    /**
     * Remove the specified skill from storage.
     */
    public function destroy(Skill $skill)
    {
        // Detach relationships before deleting
        $skill->volunteers()->detach();
        $skill->posts()->detach();
        
        $skill->delete();

        return redirect()->route('skills.index');
    }
} 