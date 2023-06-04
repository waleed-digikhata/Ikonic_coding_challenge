<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $userId = $request->userId;
        $suggestionId = $request->suggestionId;
        DB::beginTransaction();
        try{
            $saveSentRequest = ModelsRequest::updateOrCreate([
                'user_id'=> $userId,
                'request_id'=>$suggestionId,
            ],
            [
                'mode'=>'sent'
            ]);
            $saveReceivedRequest = ModelsRequest::updateOrCreate([
                'user_id'=> $suggestionId,
                'request_id'=>$userId,
            ],
            [
                'mode'=>'received'
            ]);
            $saveConnection = Connection::updateOrCreate([
                'user_id'=> $userId,
                'connection_id'=>$suggestionId,
            ],[
                'user_id'=> $userId,
                'connection_id'=>$suggestionId,
            ]);
            DB::commit();
            return response()->json(['success'=>true,'msg'=>'Data saved successfully.']);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['success'=>false,'msg'=>$e->getMessage()]);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptRequest(Request $request)
    {
        $userId = $request->userId;
        $requestId = $request->requestId;
        DB::beginTransaction();
        try{
            $acceptRequestSent = ModelsRequest::where('user_id',$userId)->where('request_id',$requestId)->update(['accept'=>1]);
            $acceptRequestReceived = ModelsRequest::where('user_id',$requestId)->where('request_id',$userId)->update(['accept'=>1]);
            DB::commit();
            return response()->json(['success'=>true,'msg'=>'Data saved successfully.']);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['success'=>false,'msg'=>$e->getMessage()]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
        $userId = $request->userId;
        $method = $request->methodType;

        DB::beginTransaction();
        try{
            if($method =='request'){
                $id = $request->requestId;
                $deleteRequest = ModelsRequest::where('user_id',$userId)->where('request_id',$id)->delete();
            }else{
                $id = $request->connectionId;
                $deleteConnection = Connection::where('user_id',$userId)->where('connection_id',$id)->delete();
            }
            DB::commit();
            return response()->json(['success'=>true,'msg'=>'Data delete successfully.']);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['success'=>false,'msg'=>$e->getMessage()]);
        }
    }
}
