<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Base query
        $query = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->type, function ($query, $type) {
                $query->where('user_type', $type);
            })
            ->when(isset($request->status), function ($query) use ($request) {
                $query->where('is_active', $request->status);
            })
            ->when($request->location, function ($query, $location) {
                $query->where('location', $location);
            })
            ->when($request->dateFrom, function ($query, $dateFrom) {
                $query->whereDate('created_at', '>=', $dateFrom);
            })
            ->when($request->dateTo, function ($query, $dateTo) {
                $query->whereDate('created_at', '<=', $dateTo);
            });

        // Get date range for filters
        $oldestUser = User::oldest('created_at')->first();
        $newestUser = User::latest('created_at')->first();

        // Get filter options from actual data
        $filterOptions = [
            'locations' => User::distinct()->pluck('location')->filter()->values(),
            'userTypes' => [
                ['value' => '', 'label' => 'All Types'],
                ['value' => '1', 'label' => 'Volunteer'],
                ['value' => '2', 'label' => 'Company'],
                ['value' => '3', 'label' => 'Admin']
            ],
            'statusTypes' => [
                ['value' => '', 'label' => 'All Status'],
                ['value' => '1', 'label' => 'Active'],
                ['value' => '0', 'label' => 'Inactive']
            ],
            'dateRange' => [
                'min' => $oldestUser ? $oldestUser->created_at->format('Y-m-d') : null,
                'max' => $newestUser ? $newestUser->created_at->format('Y-m-d') : null
            ]
        ];

        // Get paginated users with transformed data
        $paginatedUsers = $query->latest()->paginate(10);
        
        $users = tap($paginatedUsers, function ($paginator) {
            $paginator->getCollection()->transform(function ($user) {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'location' => $user->location,
                    'user_type' => $user->user_type,
                    'is_active' => $user->is_active,
                    'created_at' => $user->created_at->format('Y-m-d'),
                    'updated_at' => $user->updated_at->format('Y-m-d'),
                    'type_label' => match($user->user_type) {
                        1 => 'Volunteer',
                        2 => 'Company',
                        3 => 'Admin',
                        default => 'Unknown'
                    },
                    'status_label' => $user->is_active ? 'Active' : 'Inactive',
                ];
            });
        });

        // Add query string to pagination links
        if ($request->hasAny(['search', 'type', 'status', 'location', 'dateFrom', 'dateTo'])) {
            $users->appends($request->all());
        }

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'type', 'status', 'location', 'dateFrom', 'dateTo']),
            'filterOptions' => $filterOptions,
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'location' => $user->location,
                'user_type' => $user->user_type,
                'is_active' => $user->is_active,
                'national_id' => $user->national_id,
                'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                'created_by' => $user->createdBy ? [
                    'id' => $user->createdBy->id,
                    'username' => $user->createdBy->username,
                ] : null,
                'updated_by' => $user->updatedBy ? [
                    'id' => $user->updatedBy->id,
                    'username' => $user->updatedBy->username,
                ] : null,
            ],
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'location' => $user->location,
                'user_type' => $user->user_type,
                'is_active' => $user->is_active,
                'national_id' => $user->national_id,
            ],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:100|unique:users,email,' . $user->id,
            'location' => 'required|string|max:255',
            'user_type' => 'required|integer|in:1,2,3',
            'is_active' => 'boolean',
            'national_id' => 'required|string|max:20|unique:users,national_id,' . $user->id,
            'password' => 'nullable|string|min:8|max:60',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $validated['updated_by'] = auth()->id();

        $user->update($validated);

        return redirect()->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully.');
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|integer|in:1,2,3',
            'national_id' => 'required|string|max:20|unique:users',
            'location' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'national_id' => $validated['national_id'],
            'user_type' => $validated['user_type'],
            'location' => $validated['location'],
            'is_active' => $validated['is_active'],
        ]);

        return redirect()->route('users.index')
            ->with('message', 'User created successfully.');
    }
} 