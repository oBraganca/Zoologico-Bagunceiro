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
use Illuminate\Support\Facades\Crypt;
use GuzzleHttp\Client;

class KeepersController extends Controller
{

    public function getListKeepers(){

        $keepers = User::all()->where('accessType_id',1);
        $encryptedKeepers= $keepers->map(function ($item, $key) {
            $item['encrypted_id'] = Crypt::encryptString($item['id']);
            return $item;
        });
        $encryptedKeepers = $encryptedKeepers->values()->toArray();
        return response($encryptedKeepers, 200);
    }


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

    public function putKeeper(Request $request, $id){
        $id = Crypt::decryptString($id);
        if(User::where('id', $id)->exists()) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'pictureUser' => 'string|nullable',
            ]);
            
            if ($validator->fails())
            {
                return response(['errors'=>$validator->errors()->all()], 422);
            }
            $user = User::find($id);
            $user->name = $request['name'];
            $user->updated_at = date("Y-m-d H:i:s");

            
            if($request['pictureUser'] != null){
                $response = $this->consumeImgur($request['pictureUser']);
                $user->pictureUser = $response['data']['link'];
            }
            $response = [
                "message" => "Keeper updated successfully",
            ];

            $user->save();

            
    
            return response($response, 200);
        } else {
            return response()->json([
                "message" => "Keeper not found"
            ], 404);
        }
    }
    public function putKeeperSettings(Request $request, $id){
        $id = Crypt::decryptString($id);
        if(User::where('id', $id)->exists()) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'pictureUser' => 'string|nullable',
            ]);
            
            if ($validator->fails())
            {
                return response(['errors'=>$validator->errors()->all()], 422);
            }
            $user = User::find($id);
            $user->name = $request['name'];
            $user->updated_at = date("Y-m-d H:i:s");

            
            if($request['pictureUser'] != null){
                $response = $this->consumeImgur($request['pictureUser']);
                $user->pictureUser = $response['data']['link'];
            }
            $response = [
                'access_type'=> $user->accessType_id,
                'pictureProfile' => $user->pictureUser,
                'email' => $user->email,
                'name' => $user->name,
                'id' => Crypt::encryptString($user->id),
                "message" => "Keeper updated successfully",

            ];

            $user->save();

            
    
            return response($response, 200);
        } else {
            return response()->json([
                "message" => "Keeper not found"
            ], 404);
        }
    }

    public function getKeeper($id){
        $id = Crypt::decryptString($id);
        if(User::where('id', $id)->exists()) {
            $user = User::find($id);

            return response($user, 200);
        } else {
            return response()->json([
            "message" => "Animal not found"
            ], 404);
        }
    }
}
