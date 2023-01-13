<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\API;
use App\Models\ZooWing;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DataController extends Controller
{
    public function getWingList(){
        $wings = ZooWing::select('id', 'name')->get()->toArray();
        $response['data'] = $wings;
        $response['status'] = 200;
        
        return response($response, 200);
    }
}
