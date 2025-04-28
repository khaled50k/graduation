<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('volunteer_skills', function (Blueprint $table) {
            $table->foreignUuid('volunteer_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('skill_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('proficiency_level')->comment('1-5 scale');
            $table->timestamps();
            $table->primary(['volunteer_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteer_skills');
    }
}; 