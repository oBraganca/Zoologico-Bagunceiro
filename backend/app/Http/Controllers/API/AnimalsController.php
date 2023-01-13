<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\AccessType;
use App\Models\ZooWing;
use GuzzleHttp\Client;
use Illuminate\Support\Str;

class AnimalsController extends Controller
{
    public function getListAnimals(){
        
        // $animals = Animal::with('user_id')->get();
        // $animals = Animal::get()->toJson(JSON_PRETTY_PRINT);

        $animals = Animal::join('users', 'users.id', '=', 'animal.user_id')
                ->join('zoo_wing', 'zoo_wing.id', '=', 'animal.zooWing_id')
                ->selectRaw('animal.scientificName, users.name, users.id, users.pictureUser, zoo_wing.name AS ala')->get();
        
        return response($animals, 200);
    }

    public function getAnimal($id){
        if(Animal::where('user_id', $id)->exists()) {
            $animal = Animal::where("users.id", $id)->join('users', 'users.id', '=', 'animal.user_id')
            ->join('zoo_wing', 'zoo_wing.id', '=', 'animal.zooWing_id')
            ->selectRaw('animal.scientificName, users.name, users.id, users.email, users.password, zoo_wing.id AS ala')->get();

            return response($animal, 200);
        } else {
            return response()->json([
            "message" => "Animal not found"
            ], 404);
        }
    }

    public function createAnimal (Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'scientificName' => 'required|string|max:255',
            'zooWing_id' => 'required|string|max:255',
            'pictureUser' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3',
            'accessType_id' => 'required|exists:access_type,id',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password'] = Hash::make($request['password']);
        $request['accessType_id'] = AccessType::find($request['accessType_id'])->id;
        $request['remember_token'] = Str::random(10);

        
        $response = $this->consumeImgur($request['pictureUser']);
        
        $user = User::create([
            'name'=>$request['name'], 
            'email'=>$request['email'], 
            'password'=>$request['password'], 
            'accessType_id'=>$request['accessType_id'],
            'pictureUser'=>$response['data']['link'], 
            ]
        );


        
        $request['zooWing_id'] = ZooWing::find($request['zooWing_id'])->id;
        
        $animal = Animal::create([
            'scientificName'=>$request['scientificName'], 
            'zooWing_id'=>$request['zooWing_id'], 
            'user_id'=>$user->id,
            ]
        );

        $token = $user->createToken('Laravel Password Grant Animals')->accessToken;
        $response = ['status' => 'created'];
        return response($response, 201);
    }



    public function deleteAnimal($id){
        if(Animal::where('id', $id)->exists()) {
            $animal = Animal::find($id);
            $animal->delete();
    
            return response()->json([
                "message" => "Animals inactive"
            ], 202);
        } else {
            return response()->json([
            "message" => "Animal not found"
            ], 404);
        }
    }

    public function putAnimal(Request $request, $id){
        if(User::where('id', $id)->exists()) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'scientificName' => 'required|string|max:255',
                'zooWing_id' => 'required|string|max:255',
                'pictureUser' => 'string|nullable',
            ]);
            
            if ($validator->fails())
            {
                return response(['errors'=>$validator->errors()->all()], 422);
            }
            $user = User::find($id);
            $animal = Animal::where('user_id',$user->id)->first();
            $user->name = $request['name'];
            $user->updated_at = date("Y-m-d H:i:s");

            
            if($request['pictureUser'] != null){
                $response = $this->consumeImgur($request['pictureUser']);
                $user->pictureUser = $response['data']['link'];
            }

            $user->save();

            $animal->scientificName = $request['scientificName'];
            $animal->updated_at = date("Y-m-d H:i:s");

            $animal->save();
    
            return response()->json([
                "message" => "Animal updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Animal not found"
            ], 404);
        }
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