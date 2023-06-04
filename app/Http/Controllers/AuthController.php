<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ResponseAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ResponseAPI;
    /**
     * Login api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try{
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                $user = Auth::user();
                $user->token =  $user->createToken('ikonic-coding-challange')->plainTextToken;
//            $success['data'] =  $user;
                return $this->success('User login successfully.',$user, 'user',200);
            }else{
                return $this->error('Unauthorised.', 400);
            }
        }catch (\Exception $e){
            return $this->error($e->getMessage(), $e->getCode());
        }

    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try{
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $user->token = $user->createToken('ikonic-coding-challange')->plainTextToken;

            return $this->success('User register successfully.',$user, 'user',200);
        }catch (\Exception $e){
            return $this->error($e->getMessage(), $e->getCode());
        }

    }

    public function logout(Request $request)
    {
        try{
            auth('web')->logout();
//        $request->session()->invalidate();
//        $request->session()->regenerateToken();
            $request->user()->currentAccessToken()->delete();
            return $this->success('User logout successfully.',[], 'user',200);
        }catch (\Exception $e){
            return $this->error($e->getMessage(), $e->getCode());
        }
    }
}
