<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('get-suggestions', [App\Http\Controllers\HomeController::class, 'getSuggestions'])->name('get-suggestions');
Route::get('get-requests', [App\Http\Controllers\HomeController::class, 'getRequests'])->name('get-requests');
Route::get('get-connections', [App\Http\Controllers\HomeController::class, 'getConnections'])->name('get-connections');
Route::get('get-common-connections', [App\Http\Controllers\HomeController::class, 'getCommonConnections'])->name('get-common-connections');
Route::post('send-request', [App\Http\Controllers\UserController::class, 'store'])->name('send-request');
Route::post('accept-request', [App\Http\Controllers\UserController::class, 'acceptRequest'])->name('accept-request');
Route::post('destroy', [App\Http\Controllers\UserController::class, 'destroy'])->name('destroy');
