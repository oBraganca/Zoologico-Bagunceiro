<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['guest:api']], function(){
    Route::get('/', function(){
        return 'Ola mundo api';
    });

    Route::post('login', 'API\LoginController@login');
    Route::post('register', 'API\RegisterController@register');
});


Route::group(['middleware' => ['auth:api']], function(){
    Route::get('/dados', function(){
        return 'Ola mundo api (Autenticado)';
    });

    Route::get('logout', 'API\LoginController@logout');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


