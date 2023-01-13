<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\VoteFactory;
use App\Models\User;

class VoteSeeder extends Seeder
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
                'name' => 'Dislike',
                'desc' => 'Não gostou',
                'create_by' => $id,
            ],
            [
                'id' => 2,
                'name' => 'Superlike',
                'desc' => 'Gostou muito',
                'create_by' => $id,
            ],
            [
                'id' => 3,
                'name' => 'Like',
                'desc' => 'Gostou',
                'create_by' => $id,
            ]
        ];

        VoteFactory::new()->createMany($vote);
    }
}
