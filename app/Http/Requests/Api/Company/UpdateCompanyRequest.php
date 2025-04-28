<?php

namespace App\Http\Requests\Api\Company;

use App\Http\Requests\Api\BaseRequest;

class UpdateCompanyRequest extends BaseRequest
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
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:companies,email,' . $this->company->id],
            'description' => ['sometimes', 'string'],
            'website' => ['nullable', 'string', 'url', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
            'logo' => 'nullable|image|max:2048',
            'status' => 'sometimes|in:active,inactive',
            'is_verified' => 'sometimes|boolean',
        ];
    }
} 