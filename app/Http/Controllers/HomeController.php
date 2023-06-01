<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Request as ModelsRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
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
        return response()->json(['suggestions'=>$suggestions]);
    }
    public function getRequests(){
        $mode = request()->mode;
        $requests = ModelsRequest::where('user_id',Auth::user()->id)->where('mode',$mode)->where('accept',0)->paginate(10)->toArray();
        return response()->json(['requests'=>$requests]);
    }
    public function getConnections(){
        $connections = Connection::where('user_id',Auth::user()->id)->paginate(10)->toArray();
        $connectionIds = Connection::where('user_id',Auth::user()->id)->get()->pluck('connection_id')->toArray();
        $commonConnections = Connection::whereIn('connection_id',$connectionIds)->where('user_id','!=',Auth::user()->id)->get()->toArray();
        return response()->json(['connections'=>$connections,'common'=>$commonConnections]);
    }
    public function getCommonConnections(){
        $connectionIds = Connection::where('user_id',Auth::user()->id)->get()->pluck('connection_id')->toArray();
        $commonConnections = Connection::whereIn('connection_id',$connectionIds)->where('user_id','!=',Auth::user()->id)->get()->toArray();
        return response()->json(['common_connections'=>$commonConnections]);
    }
}
