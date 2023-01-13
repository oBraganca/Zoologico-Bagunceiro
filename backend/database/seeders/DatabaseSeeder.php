<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {

        $this->call([
            AccessTypeSeeder::class,
            UserSeeder::class,
            VoteSeeder::class,
            ZooWingSeeder::class,
        ]);
    }
}
