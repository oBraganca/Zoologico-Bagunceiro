<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AccessType;
use Database\Factories\AccessTypeFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccessTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $access = [
            [
                'id' => 1,
                'name' => 'Zelador',
                'desc' => 'Permissão de administrdores'
            ],
            [
                'id' => 2,
                'name' => 'Animal',
                'desc' => 'Permissão de usuario comum'
            ]
        ];
        AccessTypeFactory::new()->createMany($access);
    }
}
