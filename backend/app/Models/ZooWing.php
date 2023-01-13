<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ZooWing extends Pivot
{
    protected  $primaryKey = 'id';
    protected $table = 'zoo_wing';
}
