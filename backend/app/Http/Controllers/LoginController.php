<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Services\LoginService;

class LoginController extends Controller
{
    public function login(Request $request){
      return LoginService::login($request);
    }
    public function register(Request $request){
      return LoginService::register($request);
    }
    public function verifyOtp(Request $request){
      return LoginService::verifyOtp($request);
    }
    public function resendotp(Request $request){
      return LoginService::resendotp($request);
    }
    public function logout(Request $request){
      return LoginService::logout($request);
    }
    public function resetpasswordlink(Request $request){
      return LoginService::resetpasswordlink($request);
    }
    public function resetpassword(Request $request){
      return LoginService::resetpassword($request);
    }
    public function updatepassword(Request $request){
      return LoginService::updatepassword($request);
    }
}
