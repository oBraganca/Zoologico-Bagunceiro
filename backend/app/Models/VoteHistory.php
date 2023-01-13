<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'vote_id',
        'by_animal_id',
        'voted_animal_id',
    ];
    protected $table = 'voting_history';
}
