<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'post' => [
                'id' => $this->post->id,
                'title' => $this->post->title,
                'description' => $this->post->description,
                'location' => $this->post->location,
                'deadline' => $this->post->deadline,
                'is_active' => $this->post->is_active,
                'company' => [
                    'id' => $this->post->company->id,
                    'name' => $this->post->company->name,
                ],
                'skills' => SkillResource::collection($this->post->skills),
            ],
            'status' => $this->status,
            'message' => $this->message,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
} 