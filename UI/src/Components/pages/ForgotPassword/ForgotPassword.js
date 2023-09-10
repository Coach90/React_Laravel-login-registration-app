import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import '../Verification/Verification.css'
import '../../common/Form/Form.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { instance } from "../../../axioConfig";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setTempToken } from "../../../features/Login";
import { useForm } from "react-hook-form";
import Login from "../Login/Login";
import { Navigate, useNavigate } from "react-router";


function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "all"
  });
  const [registration, setRegistration] = useState(false);
  const [login, setLogin] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [responseMessage, setResponseMessage] = useState(null)
  const [responseError, setResponseError] = useState(null)
  const [count, setCount] = useState(null);
  const [disable,setDisable]=useState(false)

  const navigate = useNavigate();
  const onSubmit = (data) => {
    setDisable(true)
    setResponseMessage(null)
    setResponseError(null)
    instance.post('resetpasswordlink', data
    ).then(function (response) {
      if (response.status == 200 && response.data?.type == "success") {
        setResponseMessage(response.data?.message)
        setCount(10);
        setResponseError(null)
      } else {
        setResponseError(response.data?.error)
        setDisable(false)
      }
    })
      .catch(function (error) {

      });
  }
  
  // when count is 0, navigate
  
  useEffect(() => {
    if(count!=null){
      const interval = setInterval(() => {
        // update the state after 1000ms
        setCount((currentCount) => currentCount - 1);
      }, 1000);
      count === 0 && navigate("/");
    // clean up the interval
    return () => clearInterval(interval);
    }
  }, [count, navigate]);
  if (login == true) {
    return <Navigate to="/" />
  }
  if (registration == true) {
    return <Navigate to="/register" />;
  }
  return (
    <div className="container-fluid otp-verification fgt-password">
      <div className="row">
        <div className="col-lg-5 left d-flex justify-content-center align-items-center">
          <Link to="/">
            <Navbar.Brand>
              <img src="/logo.png" className="img-fluid site-logo" />
            </Navbar.Brand>
          </Link>
        </div>

        <div className="col-lg-7 mt-5 mt-lg-0 right d-flex justify-content-center align-items-center">
          <i class="bi bi-lock-fill"></i>
          <h2 className="mb-4 red-text">Forgot Password?</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-center mb-3">Enter your email address</h4>
            <Form.Group className="form-group width_100" controlId="">
              <Form.Control type="text" placeholder="Email address" className={errors?.email ? "border border-danger p-2" : null}  {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} />
              {errors.email && errors.email.type === "required" && <span className="error_p mt-1">Please Enter email</span>}
              {errors.email && errors.email.type === "pattern" && <span className="error_p">Please enter a valid email</span>}
            </Form.Group>
            <div className="d-flex justify-content-center error_p server_error mt-1 ">
              {responseMessage ? responseMessage : null}
              <br />
              {responseError ? responseError : null}
              <br />
              {responseError?.email ? responseError.email[0] : null}
              <br />
              {count ? <>Redirecting you in {count} sec</>:null }
              <br />
            </div>
            <button 
              disabled={disable}
              type="submit"
              className="d-block mx-auto btn dark-btn btn-lg mb-3"
              id="verify-otp">
              Continue
            </button>
            <div className="verfi-code">
              <p className="d-flex justify-content-center">Alreday have an account? <Button variant="primary"
                className="dark-btn mt-3"
                onClick={() => {
                  setLogin(true)
                }} >
                Login
              </Button></p>
              <p className="d-flex justify-content-center">New here? <Button variant="primary"
                className="dark-btn"
                onClick={() => {
                  setRegistration(true);
                }} >
                Register
              </Button></p>
            </div>

          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
