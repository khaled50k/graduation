<?php

namespace App\Http\Requests\Api\Post;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $post = $this->route('post');
        return Auth::check() && 
               Auth::user()->user_type === 'company' && 
               $post->company_id === Auth::user()->company->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:150',
            'description' => 'sometimes|string',
            'location' => 'sometimes|string|max:255',
            'deadline' => 'sometimes|date|after:today',
            'is_active' => 'sometimes|boolean',
            'skills' => 'sometimes|array',
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
            'title.max' => 'The post title cannot exceed 150 characters',
            'location.max' => 'The location cannot exceed 255 characters',
            'deadline.after' => 'The deadline must be a future date',
            'skills.*.exists' => 'One or more selected skills do not exist'
        ];
    }
} 