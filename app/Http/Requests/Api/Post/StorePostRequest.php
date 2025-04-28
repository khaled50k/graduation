<?php

namespace App\Http\Requests\Api\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->user_type === 'company';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'deadline' => 'required|date|after:today',
            'is_active' => 'boolean',
            'skills' => 'array',
            'skills.*' => [
                'required',
                'uuid',
                Rule::exists('skills', 'id')
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The post title is required',
            'title.max' => 'The post title cannot exceed 150 characters',
            'description.required' => 'The post description is required',
            'location.required' => 'The post location is required',
            'location.max' => 'The location cannot exceed 255 characters',
            'deadline.required' => 'The deadline is required',
            'deadline.after' => 'The deadline must be a future date',
            'skills.*.exists' => 'One or more selected skills do not exist'
        ];
    }
} 