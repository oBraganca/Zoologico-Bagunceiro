<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Animal;
use App\Models\AccessType;
use GuzzleHttp\Client;

class KeepersController extends Controller
{

    public function createKeeper (Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3',
            'accessType_id' => 'required|exists:access_type,id',
            'pictureUser' => 'required|string',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        
        $response = $this->consumeImgur($request['pictureUser']);
        $request['pictureUser'] = $response['data']['link'];

        $request['password'] = Hash::make($request['password']);
        $request['accessType_id'] = AccessType::find($request['accessType_id'])->id;
        $request['remember_token'] = Str::random(10);
        $user = User::create($request->toArray());
        $token = $user->createToken('Laravel Password Grant Keepers')->accessToken;
        $response = ['token' => $token];
        return response($response, 200);
    }

    public function consumeImgur($imgBase64){
        // $imgBase64 = $imgBase64
        $client = new Client();
        $clientId = env('IMGUR_CLIENT_ID');
        // Substitua {client_id} com o seu ID do cliente Imgur
        $response = $client->post('https://api.imgur.com/3/image', [
            'headers' => [
                'Authorization' => 'Client-ID '.$clientId,
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'form_params' => [
                'image' => $imgBase64,
                'type' => 'base64'
            ],
        ]);
    
        return json_decode((string) $response->getBody(), true);
    }
}
