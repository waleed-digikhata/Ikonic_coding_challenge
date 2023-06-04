<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('get-suggestions', [App\Http\Controllers\HomeController::class, 'getSuggestions']);
    Route::get('get-network-counts', [App\Http\Controllers\HomeController::class, 'getNetworkCounts']);
    Route::get('get-requests', [App\Http\Controllers\HomeController::class, 'getRequests']);
    Route::get('get-connections', [App\Http\Controllers\HomeController::class, 'getConnections']);
    Route::get('get-common-connections', [App\Http\Controllers\HomeController::class, 'getCommonConnections']);
    Route::post('send-request', [App\Http\Controllers\UserController::class, 'store']);
    Route::post('accept-request', [App\Http\Controllers\UserController::class, 'acceptRequest']);
    Route::post('destroy', [App\Http\Controllers\UserController::class, 'destroy']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});
