<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\ZooWingFactory;
use App\Models\User;

class ZooWingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $id =  User::find(1)->id;
        $vote = [
            [
                'id' => 1,
                'name' => 'Aquário',
                'desc' => 'Ala dos animais aquaticos',
                'create_by' => $id,
            ],
            [
                'id' => 2,
                'name' => 'Borboletário',
                'desc' => 'Ala das borboletas',
                'create_by' => $id,
            ],
            [
                'id' => 3,
                'name' => 'Casa dos répteis',
                'desc' => 'Ala dos repteis',
                'create_by' => $id,
            ],
            
            [
                'id' => 4,
                'name' => 'Praça das Aves',
                'desc' => 'Ala das aves',
                'create_by' => $id,
            ],
            
            [
                'id' => 5,
                'name' => 'Felinos',
                'desc' => 'Ala dos felinos',
                'create_by' => $id,
            ],
            [
                'id' => 6,
                'name' => 'Praça Nacional',
                'desc' => 'Ala dos animais nacionais',
                'create_by' => $id,
            ],
            [
                'id' => 7,
                'name' => 'Praça Dos Mamiferos Africanos',
                'desc' => 'Ala dos mamiferos africanos',
                'create_by' => $id,
            ]
        ];

        ZooWingFactory::new()->createMany($vote);
    }
}
