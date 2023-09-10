import React, { useState } from "react";
import '../Verification/Verification.css'
import '../../common/Form/Form.css';
import { instance } from "../../../axioConfig";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setTempToken } from "../../../features/Login";
import { useForm } from "react-hook-form";
import Login from "../Login/Login";
import SimpleBackdrop from "../../common/Spinner/Spinner";

function Verification() {
  const { register, handleSubmit,watch,formState: { errors } } = useForm({
    mode:"all"
  });
  const [loading, setLoading] = useState(false);
  const [redirectToLogin,setRedirectToLogin]=useState(false)
  const [responseError,setResponseError]=useState(null)
  const tempToken=useSelector((state) => state.loginDetail.tempToken)
  const dispatch=useDispatch();
  const resendOTP=()=>{
    
    instance.post('resendotp',{tempToken:tempToken}
    ).then(function (response) {
      if(response.status==200 && response.data?.type=="success"){
        dispatch(setTempToken(response.data.tempToken));
       
      }else{
        setRedirectToLogin(response.data?.redirectToLogin)
      }
      
      
    })
    .catch(function (error) {
      
    });
  }
  const onSubmit=(data)=>{
    setLoading(true)
    data.tempToken=tempToken;
    instance.post('verifyOtp',data
  ).then(function (response) {
    if(response.status==200 && response.data?.type=="success"){
      dispatch(setLogin(response.data));
      setLoading(false);
    }else{
      if(response.data?.error){
        setResponseError(response.data?.error)
        setLoading(false);
      }else{
        setLoading(false);
        setRedirectToLogin(response.data?.redirectToLogin)
 }
    }
  })
  .catch(function (error) {
    
  });
 }
 if(redirectToLogin){
  return <Login/>
 }
 return (
  <>
  {loading?<SimpleBackdrop/>:
    <div className="container-fluid otp-verification">
      <div className="row">
        <div className="col-lg-5 left d-flex justify-content-center align-items-center">
          <img
            src="/logo.png"
            className="img-fluid site-logo d-block mx-auto"
          />
        </div>

        <div className="col-lg-7 mt-5 mt-lg-0 right d-flex justify-content-center align-items-center">
          <h2 className="mb-4 red-text">Verification</h2>  
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-center mb-3">Please enter the OTP sent to your email to confirm your account  </h4>
            <div className="form-group mb-3 w-100">
                <input type="number" className="form-control"
                    name="otp" 
                    id="OTP"
                    aria-describedby="emailHelp"
                    placeholder="Enter OTP" 
                    {...register("otp", {
                      required: true,
                      pattern:/^[0-9]*$/,
                      minLength:6,
                      maxLength:6,
                      })}/>
                      {errors?.otp?.type === "required" && <span  className="error_p">OTP is required</span>}
                      {errors?.otp?.type === "minLength" && <span  className="error_p">OTP length should be six digits </span>}
                      {errors?.otp?.type === "pattern" && <span  className="error_p">OTP should only include number</span>}
                      {errors?.otp?.type === "maxLength" && <span  className="error_p">OTP length should be six digits</span>}
                      {responseError ? <span  className="error_p server_error w-100 d-block mb-3">{responseError}</span> : null}
            </div>
               <button type="submit"
                className="d-block mx-auto btn dark-btn btn-lg mb-3"
                id="verify-otp">
                Verify OTP
               </button>

           <div className="verfi-code"><span  className="text-center">Not received your code? <button onClick={resendOTP}> Resend new code </button></span></div>
        </form>
        </div>
      </div>
    </div>
 } 
</>
  );
}

export default Verification;
