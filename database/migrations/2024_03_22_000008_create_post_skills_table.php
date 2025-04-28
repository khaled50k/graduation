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
        Schema::create('post_skills', function (Blueprint $table) {
            $table->foreignUuid('post_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('skill_id')->constrained()->onDelete('cascade');
            $table->primary(['post_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_skills');
    }
}; 