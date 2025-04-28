<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'id',
        'company_name',
        'website',
        'bio',
        'created_by',
        'updated_by',
    ];

    public static $rules = [
        'id' => 'required|uuid|exists:users,id',
        'company_name' => 'required|string|max:150',
        'website' => 'required|string|max:255|url',
        'bio' => 'required|string',
        'created_by' => 'nullable|uuid|exists:users,id',
        'updated_by' => 'nullable|uuid|exists:users,id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
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