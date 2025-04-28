<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Education extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'volunteer_id',
        'degree',
        'university_name',
        'university_location',
        'graduation_year',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'graduation_year' => 'integer',
    ];

    public static $rules = [
        'volunteer_id' => 'required|uuid|exists:volunteers,id',
        'degree' => 'required|string|max:100',
        'university_name' => 'required|string|max:100',
        'university_location' => 'required|string|max:100',
        'graduation_year' => 'required|integer|min:1900|max:2100',
        'created_by' => 'nullable|uuid|exists:users,id',
        'updated_by' => 'nullable|uuid|exists:users,id',
    ];

    public function volunteer()
    {
        return $this->belongsTo(Volunteer::class);
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