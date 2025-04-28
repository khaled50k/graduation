<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'company_id',
        'title',
        'description',
        'location',
        'deadline',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'deadline' => 'date',
        'is_active' => 'boolean',
    ];

    public static $rules = [
        'company_id' => 'required|uuid|exists:companies,id',
        'title' => 'required|string|max:150',
        'description' => 'required|string',
        'location' => 'required|string|max:255',
        'deadline' => 'required|date|after:today',
        'is_active' => 'boolean',
        'created_by' => 'nullable|uuid|exists:users,id',
        'updated_by' => 'nullable|uuid|exists:users,id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'post_skills');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
} 