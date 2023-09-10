<?php

use App\Http\Controllers\LoginController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("/login", [LoginController::class, 'login']);
Route::post("/register", [LoginController::class, 'register']);
Route::post("/verifyOtp", [LoginController::class, 'verifyOtp']);
Route::post("/resendotp", [LoginController::class, 'resendotp']);
Route::post("/resetpasswordlink", [LoginController::class, 'resetpasswordlink'])->name('password.reset');;
Route::post("/resetpassword", [LoginController::class, 'resetpassword']);

Route::middleware('auth:sanctum')->get("/logout", [LoginController::class, 'logout']);
Route::middleware('auth:sanctum')->post("/updatepassword", [LoginController::class, 'updatepassword']);