<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Database\Factories\UserFactory;

class UserSeeder extends Seeder
{
    public function run()
    {
        UserFactory::new()->count(1)->create();
    }
}
