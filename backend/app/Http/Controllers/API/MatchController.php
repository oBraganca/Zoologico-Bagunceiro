<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Animal;
use App\Models\User;
use App\Models\ZooWing;
use App\Models\VoteHistory;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\AccessType;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
class MatchController extends Controller
{
    public function getAnimalNonVoted(){
        $id = Auth::id();
        $responde = [];
        if(User::where('id', $id)->exists()){
            
            $user = User::find($id);
            $animal = Animal::where('user_id',$user->id)->first();
            $animals = Animal::select('animal.*')->where('user_id','<>',$user->id)->pluck('id')->toArray();
            foreach ($animals as $value) {
                if(!VoteHistory::where('voted_animal_id', $value)->where('by_animal_id', $animal->id)->exists()){

                    $animal = Animal::find($value);
                    $ala = ZooWing::find($animal->zooWing_id);
                    $user = User::find($animal->user_id);
                    
                    $response['nome'] = $animal->scientificName;
                    $response['nickname'] = $user->name;
                    $response['pictureUser'] = $user->pictureUser;
                    $response['ala'] = $ala->name;
                    $response['code'] =  Crypt::encryptString($animal->id);
                    $response['message'] = "Animal encontrado";
                    $response['status'] = 200;

                    
                    return response()->json($response, 200);
                }
                # code...
            }
            
            $response['message'] = "Não tem mais animais para serem votados";
            $response['status'] = 404;

            return response()->json($response, 200);

        } else {
            return response()->json([
                "message" => "Animal not found"
            ], 404);
        }
    }

    
    public function getDataMatch($id){
        $id = Crypt::decryptString($id);
        $animal = Animal::select(DB::raw("(select count(id) from voting_history where voting_history.voted_animal_id = animal.id and voting_history.vote_id = 3) as 'like'"), 
        DB::raw("(select count(id) from voting_history where voting_history.voted_animal_id = animal.id and voting_history.vote_id = 2) as 'superlike'"), 
        DB::raw("(select count(id) from voting_history where voting_history.voted_animal_id = animal.id and voting_history.vote_id = 1) as 'dislike'"),
        DB::raw("(select count(*) from voting_history as v1 join voting_history as v2 on v2.by_animal_id = v1.voted_animal_id and v2.voted_animal_id = v1.by_animal_id where v1.voted_animal_id = animal.id and v1.vote_id IN(3,2) and v2.vote_id IN(3,2)) 'match'"),)
        ->join('users', 'users.id', '=', 'animal.user_id')
        ->join('zoo_wing', 'zoo_wing.id', '=', 'animal.zooWing_id')->where("users.id", $id)
        ->get();
        return response($animal, 200);

    }

    public function createHistoryVote(Request $request){
        $validator = Validator::make($request->all(), [
            'vote_id' => 'required|string|max:255',
            'voted_animal_id' => 'required|string|min:3',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all(), 'status'=>404], 422);
        }

        $request['voted_animal_id'] = Crypt::decryptString($request['voted_animal_id']);
        $request['by_animal_id'] = Animal::where('user_id',Auth::id())->pluck('id')->first();

        VoteHistory::create([
            'vote_id'=>$request['vote_id'],
            'by_animal_id'=>$request['by_animal_id'],
            'voted_animal_id'=>$request['voted_animal_id'],
        ]);
        $response = ['status' => 200];
        return response($response, 200);
    }
}
