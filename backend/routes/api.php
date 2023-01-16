<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['guest:api']], function(){

    Route::post('login', 'API\LoginController@login');
    Route::post('animals', 'API\AnimalsController@createAnimal');
    Route::get('data/wing', 'API\DataController@getWingList');
});


Route::group(['middleware' => ['auth:api']], function(){
    Route::get('auth/check', 'API\LoginController@auth');
    Route::get('match', 'API\MatchController@getAnimalNonVoted');
    Route::get('match/data/{id}', 'API\MatchController@getDataMatch');
    Route::get('match/history/{id}', 'API\MatchController@getHistoryById');
    Route::post('match', 'API\MatchController@createHistoryVote');
    Route::post('keepers', 'API\KeepersController@createKeeper')->middleware('auth.admin');
    Route::get('keepers/', 'API\KeepersController@getListKeepers')->middleware('auth.admin');
    Route::get('keepers/{id}', 'API\KeepersController@getKeeper')->middleware('auth.admin');
    Route::put('keepers/{id}', 'API\KeepersController@putKeeper')->middleware('auth.admin');
    Route::put('keepers/settings/{id}', 'API\KeepersController@putKeeperSettings')->middleware('auth.admin');


    
    Route::get('animals', 'API\AnimalsController@getListAnimals')->middleware('auth.admin');
    Route::get('animals/{id}', 'API\AnimalsController@getAnimal');
    Route::delete('animals/{id}', 'API\AnimalsController@deleteAnimal')->middleware('auth.admin');
    Route::put('animals/{id}', 'API\AnimalsController@putAnimal')->middleware('auth.admin');
    Route::put('animals/settings/{id}', 'API\AnimalsController@putAnimalSettings');



    Route::get('logout', 'API\LoginController@logout');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


