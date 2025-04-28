<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Volunteer extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'id',
        'first_name',
        'second_name',
        'third_name',
        'fourth_name',
        'created_by',
        'updated_by',
    ];

    public static $rules = [
        'id' => 'required|uuid|exists:users,id',
        'first_name' => 'required|string|max:50',
        'second_name' => 'required|string|max:50',
        'third_name' => 'required|string|max:50',
        'fourth_name' => 'required|string|max:50',
        'created_by' => 'nullable|uuid|exists:users,id',
        'updated_by' => 'nullable|uuid|exists:users,id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'volunteer_skills')
            ->withPivot('proficiency_level')
            ->withTimestamps();
    }

    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
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