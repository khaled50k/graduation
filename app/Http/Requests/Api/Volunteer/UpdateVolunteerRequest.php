<?php

namespace App\Http\Requests\Api\Volunteer;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVolunteerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bio' => 'nullable|string|max:1000',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date|before:today',
            'skills' => 'nullable|array',
            'skills.*' => 'exists:skills,id',
            'experiences' => 'nullable|array',
            'experiences.*.title' => 'required_with:experiences|string|max:100',
            'experiences.*.company' => 'required_with:experiences|string|max:100',
            'experiences.*.start_date' => 'required_with:experiences|date|before:today',
            'experiences.*.end_date' => 'nullable|date|after:experiences.*.start_date',
            'experiences.*.description' => 'nullable|string|max:1000',
            'educations' => 'nullable|array',
            'educations.*.institution' => 'required_with:educations|string|max:100',
            'educations.*.degree' => 'required_with:educations|string|max:100',
            'educations.*.field_of_study' => 'required_with:educations|string|max:100',
            'educations.*.start_date' => 'required_with:educations|date|before:today',
            'educations.*.end_date' => 'nullable|date|after:educations.*.start_date',
            'educations.*.description' => 'nullable|string|max:1000',
        ];
    }
} 