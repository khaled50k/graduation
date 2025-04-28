<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids, SoftDeletes;

    const TYPE_VOLUNTEER = 1;
    const TYPE_COMPANY = 2;
    const TYPE_ADMIN = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'national_id',
        'location',
        'user_type',
        'is_active',
        'created_by',
        'updated_by',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'user_type' => 'integer',
        'password' => 'hashed',
    ];

    public static $rules = [
        'username' => 'required|string|max:50|unique:users',
        'email' => 'required|string|email|max:100|unique:users',
        'password' => 'required|string|min:8|max:60',
        'national_id' => 'required|string|max:20|unique:users',
        'location' => 'required|string|max:255',
        'user_type' => 'required|integer|in:1,2,3',
        'is_active' => 'boolean',
        'created_by' => 'nullable|uuid|exists:users,id',
        'updated_by' => 'nullable|uuid|exists:users,id',
    ];

    public function volunteer()
    {
        return $this->hasOne(Volunteer::class, 'id');
    }

    public function company()
    {
        return $this->hasOne(Company::class, 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Check if the user is a volunteer.
     *
     * @return bool
     */
    public function isVolunteer(): bool
    {
        return $this->user_type === self::TYPE_VOLUNTEER;
    }

    /**
     * Check if the user is a company.
     *
     * @return bool
     */
    public function isCompany(): bool
    {
        return $this->user_type === self::TYPE_COMPANY;
    }

    /**
     * Check if the user is an admin.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->user_type === self::TYPE_ADMIN;
    }

    public function canViewApplication(Application $application): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        if ($this->isVolunteer()) {
            return $application->volunteer_id === $this->volunteer->id;
        }

        if ($this->isCompany()) {
            return $application->post->company_id === $this->company->id;
        }

        return false;
    }

    public function canUpdateApplication(Application $application): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        if ($this->isCompany()) {
            return $application->post->company_id === $this->company->id;
        }

        return false;
    }
}
