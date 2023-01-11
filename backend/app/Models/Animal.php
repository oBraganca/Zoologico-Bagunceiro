<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'nickname',
        'scientificName',
        'zooWing_id',
    ];
    protected $table = 'animal';
}
