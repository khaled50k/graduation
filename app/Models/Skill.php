<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skill extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    public static $rules = [
        'name' => 'required|string|max:100|unique:skills',
    ];

    public function volunteers()
    {
        return $this->belongsToMany(Volunteer::class, 'volunteer_skills')
            ->withPivot('proficiency_level')
            ->withTimestamps();
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'post_skills');
    }
} 