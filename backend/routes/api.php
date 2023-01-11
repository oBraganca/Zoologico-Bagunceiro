<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['guest:api']], function(){

    Route::post('login', 'API\LoginController@login');
});


Route::group(['middleware' => ['auth:api']], function(){
    Route::post('keeper', 'API\KeepersController@createKeeper')->middleware('auth.admin');
    Route::post('animals', 'API\AnimalsController@createAnimal');


    
    Route::get('animals', 'API\AnimalsController@getListAnimals')->middleware('auth.admin');
    Route::get('animals/{id}', 'API\AnimalsController@getAnimal')->middleware('auth.admin');
    Route::delete('animals/{id}', 'API\AnimalsController@deleteAnimal')->middleware('auth.admin');
    Route::put('animals/{id}', 'API\AnimalsController@putAnimal')->middleware('auth.admin');



    Route::get('logout', 'API\LoginController@logout');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


