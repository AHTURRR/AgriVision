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
        Schema::create('education_modules', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('summary');
            $table->json('content'); // Array of strings
            $table->string('reading_time')->nullable();
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->string('badge')->nullable();
            $table->string('badge_color')->nullable();
            $table->string('icon')->nullable();
            $table->string('tag')->nullable();
            $table->string('tag_icon')->nullable();
            $table->string('status')->default('published');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education_modules');
    }
};
