<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AccessType extends Pivot
{
    protected  $primaryKey = 'id';
    protected $table = 'access_type';
}
