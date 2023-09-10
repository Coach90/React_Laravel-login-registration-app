<?php
namespace App\Services;

use App\Models\User;
use App\Notifications\EmailOTPVerification;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Password;
use Throwable;
use Illuminate\Auth\Events\PasswordReset;


class LoginService{
    public static function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => ['required','email'],
            'password' => ['required']
       ]);
       if ($validator->fails()) {
        $error = $validator->messages()->get('*');
        return ["type"=>"failed","error"=>  $error];
       }
        //return ['type'=>"success",$request->all()];
        $key= $request->email;
        //RateLimiter::clear($key); //uncomment for testing purpose  only 
        $Max_Attempts=5; //env("MAX_ATTEMPTS");                     //Reference taken from App\Http\Requests\Auth\LoginRequest;
        $tooManyAttempts=RateLimiter::tooManyAttempts($key,$Max_Attempts);
        $remaining= RateLimiter::remaining($key,$Max_Attempts);
        $user = User::where('email', '=', $request->email)->first();
        if(!$tooManyAttempts){
                $user = User::where('email', '=', $request->email)->first();
                if($user){
                    Auth::attempt(['email' => $request->email , 'password' => $request->password ]);
                }else{
                    return  ['type'=>"failed","error"=>"your are not a registered user kindly register"];
                }
            
            if (Auth::check() ) {
                RateLimiter::clear($key);
                return LoginService::sendotp($request,$user);
            }else{ 
                $attempt = RateLimiter::hit($key,10800);
                return  ['type'=>"failed","error"=>"Invalid Credentials","Attempts"=>$attempt,'Attempts_Left'=>$remaining];
                }
        }else{
               event(new Lockout($request));
               $seconds = RateLimiter::availableIn($key);
               $hours=$seconds/3600;
               $minutes=($seconds%3600)/60;
               return  ['type'=>"failed","error"=>"Your account is blocked due to maximum no of incorrect attempts Please Login After ".(int)($hours)." hours ".(int)($minutes)." minutes"];
            }       
         
    }
    
    public static function register(Request $request){
        
        $validator = Validator::make($request->all(),[
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'mobile'=> ['required', 'numeric', 'digits:10', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::min(8)
                                                                    ->mixedCase()
                                                                    ->numbers()
                                                                    ->symbols()
                                                                    ->uncompromised()
                                                                    ]
       ]);
       if ($validator->fails()) {
        $error = $validator->messages()->get('*');
        return ["type"=>"failed","error"=>  $error];
     }
     $otp=mt_rand(100000,999999);
     $tempToken=Str::random(32).$request->ip();
     $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'mobile'=>$request->mobile,
            'password'=>Hash::make($request->password),
            'temp_token'=>$tempToken,
            'otp'=>$otp,
            'otp_expiry'=>Carbon::now()->addMinutes(5),
        ]);
        try {
            Notification::send($user,New EmailOTPVerification($otp));
            event(new Registered($user));
            return ["type"=>"success","tempToken"=>$tempToken];
        } catch (Throwable $e) {
            report($e);
            User::where('temp_token','=',$tempToken)->delete();
            return ["type"=>"failed","error"=>"Error in sending the otp"];
        }

    }
    public static function sendotp($request,$user){
        $otp=mt_rand(100000,999999);//generate an otp for verification 
        $tempToken=Str::random(32).'|'.$request->ip();
        // if($otpby=='text'){
        //     $responsetext=OtpService::sendotp($user->mobile,$otp);//calling the function to send the otp 
        // }
        try {
           Notification::send($user,New EmailOTPVerification($otp));
           User::where('id','=', $user->id)
           ->update([
                       'temp_token'=>$tempToken,
                       'otp'=>$otp,
                       'otp_expiry'=>Carbon::now()->addMinutes(5)
                   ]);
           return ['type'=>"success",'tempToken'=>$tempToken];
        } catch (Throwable $e) {
            report($e);
            ['status'=>false,'message'=>'Error in sending Otp'];
        }
        
    }

    public static function verifyOtp(Request $request){
        try {        
            $user=User::where('temp_token', $request->tempToken)->first();
            if($user){
                if(  Carbon::now() > $user->otp_expiry) {
                    $user->update([
                        'temp_token'=>null,
                        'otp'=>null,
                        'otp_expiry'=>null
                    ]);
                    return ['type'=>"failed","error"=>"OTP time Expired",'redirectToLogin'=>true]; 

                  }
                if($user->otp==$request->otp){
                   if( $user->email_verified_at==null){
                        $user->update([
                            'temp_token'=>null,
                            'otp'=>null,
                            'otp_expiry'=>null,
                            'email_verified_at'=>Carbon::now()
                             ]);
                   }else{
                        $user->update([
                            'temp_token'=>null,
                            'otp'=>null,
                            'otp_expiry'=>null,
                             ]);
                   }
                    $token = $user->createToken('Token')->plainTextToken;
                    return ['type'=>"success",'token' => $token,'userDetail'=>$user,];
                }else{
                    return ['type'=>"failed","error"=>"Invalid OTP"];
                }
            }
            else{
                return ['type'=>"failed","error"=>"Your session expired please retry again",'redirectToLogin'=>true];
            }

            } catch (Throwable $e) {
            report($e);
            return ['type'=>"failed","error"=>"Their is some error at the server end"];
        }
        
    }
    public static function resendotp(Request $request){
        $user=User::where('temp_token', $request->tempToken)->first();
        if($user){
            if(  Carbon::now() > $user->otp_expiry) {
                $user->update([
                    'temp_token'=>null,
                    'otp'=>null,
                    'otp_expired_at'=>null
            ]);
                return ['type'=>"failed","error"=>"Otp timed out please retry again",'redirectToLogin'=>true]; 
              }
            return LoginService::sendotp($request,$user);
        }else{
            return ['type'=>"failed","error"=>"Your session expired please retry again",'redirectToLogin'=>true];
        }
    }
    public static function logout (Request $request){
        // Revoke all tokens...
        // if($request->type==2){
            Auth::user()->tokens()->delete();
            return ['type'=>"success"];
        // }else{
        // $request->user()->currentAccessToken()->delete();
        // }
    }   
    public static function resetpasswordlink(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => ['required',  'email']
           ]);
        if ($validator->fails()) {
            $error = $validator->messages()->get('*');
            return ["type"=>"failed","error"=>  $error];
        }
        $useremail = User::where('email', '=', $request->email)->first();
        if ($useremail)
        { 
            $status = Password::sendResetLink(
                $request->only('email')
            );
            if($status===Password::RESET_LINK_SENT){
                return ['type'=>"success",'message' => __($status)];
            }else{
                return ['type'=>"failed","error"=>"Their is some error"];
            }
        }else{
            return ['type'=>"failed","error"=>"You are not an Authorized User"];
        }
    }  

    public static function resetpassword(Request $request){
        // return $request->all();
         $request->validate([
             'token' => ['required'],
             'email' => ['required', 'email'],
             'password' => ['required', 'confirmed', Rules\Password::defaults()],
         ]);
 
         // Here we will attempt to reset the user's password. If it is successful we
         // will update the password on an actual user model and persist it to the
         // database. Otherwise we will parse the error and return the response.
         $status = Password::reset(
             $request->only('email', 'password', 'password_confirmation', 'token'),
             function ($user) use ($request) {
                 $user->forceFill([
                     'password' => Hash::make($request->password),
                     'remember_token' => Str::random(60),
                 ])->save();
 
                 event(new PasswordReset($user));
             }
         );
         // If the password was successfully reset, we will redirect the user back to
         // the application's home authenticated view. If there is an error we can
         // redirect them back to where they came from with their error message.
         if($status){
             $user= User::where('email', '=', $request->email)->first();
             if($user){
                 $user->tokens()->delete();
             }
         }
         return $status == Password::PASSWORD_RESET
                     ?  ['type'=>"success",'message' => __($status)]
                     : ['type'=>"failed",'error' => __($status)];
    }

    public static function updatepassword (Request $request){
        $user= $request->user();
        if (Hash::check($request->oldPassword,  $user->password)) {
            $user->fill([
                'password' => Hash::make($request->password)
            ])->save();
             return ['type'=>"success",'message'=>"Password Updated sucessfully"];
        }else{
            return ['type'=>"failed",'error'=>"Enter the Correct old Password"];
        }
        
    }      
    

}




