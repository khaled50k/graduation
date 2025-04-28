<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Application extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    const STATUS_PENDING = 0;
    const STATUS_ACCEPTED = 1;
    const STATUS_REJECTED = 2;

    protected $fillable = [
        'post_id',
        'volunteer_id',
        'cover_letter',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    public static $rules = [
        'post_id' => 'required|uuid|exists:posts,id',
        'volunteer_id' => 'required|uuid|exists:volunteers,id',
        'cover_letter' => 'required|string',
        'status' => 'required|integer|in:0,1,2',
        'created_by' => 'nullable|uuid|exists:users,id',
        'updated_by' => 'nullable|uuid|exists:users,id',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

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

    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isAccepted()
    {
        return $this->status === self::STATUS_ACCEPTED;
    }

    public function isRejected()
    {
        return $this->status === self::STATUS_REJECTED;
    }
} 