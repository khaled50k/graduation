<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'volunteer_id',
        'job_title',
        'organization_name',
        'start_date',
        'end_date',
        'description',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public static $rules = [
        'volunteer_id' => 'required|uuid|exists:volunteers,id',
        'job_title' => 'required|string|max:100',
        'organization_name' => 'required|string|max:100',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after:start_date',
        'description' => 'required|string',
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