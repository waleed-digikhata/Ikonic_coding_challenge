<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Request as ModelsRequest;
use App\Models\User;
use App\Traits\ResponseAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    use ResponseAPI;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth:sanctum');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function getSuggestions(){
        $suggestionIds = ModelsRequest::where('user_id',Auth::user()->id)->get()->pluck('request_id')->toArray();
        $suggestionIds[] = Auth::user()->id;
        $suggestions = User::whereNotIn('id',$suggestionIds)->paginate(10)->toArray();
        if(request()->is('api/*')){
            return $this->success('Data fetch successfully',$suggestions,'data',200);
        }else{
            return response()->json(['suggestions'=>$suggestions]);
        }
    }
    public function getRequests(){
        $mode = request()->mode;
        $requests = ModelsRequest::where('user_id',Auth::user()->id)->where('mode',$mode)->where('accept',0)->paginate(2)->toArray();
        if(request()->is('api/*')){
            return $this->success('Data fetch successfully',$requests,'data',200);
        }else{
            return response()->json(['requests'=>$requests]);
        }
    }
    public function getConnections(){
        $connections = Connection::where('user_id',Auth::user()->id)->paginate(10)->toArray();
        $connectionIds = Connection::where('user_id',Auth::user()->id)->get()->pluck('connection_id')->toArray();
        $commonConnections = Connection::whereIn('connection_id',$connectionIds)->where('user_id','!=',Auth::user()->id)->get()->toArray();
        if(request()->is('api/*')){
            return $this->success('Data fetch successfully',$connections,'data',200);
        }else{
            return response()->json(['connections'=>$connections,'common'=>$commonConnections]);
        }
    }
    public function getCommonConnections(){
        $userId = request()->userId;
        $connectionId = request()->connectionId;
        $connectionIds = Connection::where('connection_id',$connectionId)->get()->pluck('user_id')->toArray();
        $commonConnections = Connection::whereIn('user_id',$connectionIds)->where('connection_id',$connectionId)->where('user_id','!=',Auth::user()->id)->paginate(10)->toArray();
        if(request()->is('api/*')){
            return $this->success('Data fetch successfully',$commonConnections,'data',200);
        }else{
            return response()->json(['common_connections'=>$commonConnections]);
        }
    }

    public function getNetworkCounts(){
        $requestIds = ModelsRequest::where('user_id',Auth::user()->id)->get()->pluck('request_id')->toArray();
        $requestIds[] = Auth::user()->id;
        $suggestionCount = User::whereNotIn('id',$requestIds)->count();
        $data['suggestion_count'] = $suggestionCount;
        $data['request_sent_count']  = ModelsRequest::where('user_id',Auth::user()->id)->where('mode','sent')->where('accept',0)->count();
        $data['request_received_count']  = ModelsRequest::where('user_id',Auth::user()->id)->where('mode','received')->where('accept',0)->count();
        $data['connection_count'] = Connection::where('user_id',Auth::user()->id)->count();
//        $connectionIds = Connection::where('user_id',Auth::user()->id)->get()->pluck('connection_id')->toArray();
        $data['common_connection_count'] = 0;
        return $this->success('Data fetch successfully',$data,'data',200);
    }
}
