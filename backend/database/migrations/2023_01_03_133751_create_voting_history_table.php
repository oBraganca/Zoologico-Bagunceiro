<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('voting_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vote_id');
            $table->foreign('vote_id')->references('id')->on('vote')->onDelete('cascade');
            // vote made by
            $table->unsignedBigInteger('by_animal_id');
            $table->foreign('by_animal_id')->references('id')->on('animal')->onDelete('cascade');
            // voted animal
            $table->unsignedBigInteger('voted_animal_id');
            $table->foreign('voted_animal_id')->references('id')->on('animal')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('voting_history');
    }
};
