import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Login/Login.css";
import { useForm } from "react-hook-form";
import { instance } from "../../../axioConfig";
import { useDispatch, useSelector } from "react-redux";
import { setTempToken } from "../../../features/Login";
import Verification from "../Verification/Verification";
import Registration from "../Registration/Registration";
import { InputGroup } from "react-bootstrap";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import SimpleBackdrop from "../../common/Spinner/Spinner";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const dispatch = useDispatch();
  const [passwordtype,setPasswordType]=useState("password");
  const [loading, setLoading] = useState(false)
  const [responseType, setResponseType] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const tempToken = useSelector((state) => state.loginDetail.tempToken);
  const [registration, setRegistration] = useState(false);
  const [attempt,setAttempt]=useState(null)
  useEffect(() => {}, [responseType, responseError]);
  const onSubmit = (data) => {
    setLoading(true)
    instance
      .post("login", data)
      .then(function (response) {
        if (response.status == 200 && response.data?.type == "success") {
          setResponseType(response.data?.type);
          dispatch(setTempToken(response.data.tempToken));
          setLoading(false);
        } 
        else {
          setResponseType(response.data?.type);
          setResponseError(response.data?.error);
          setAttempt(response.data?.Attempts_Left);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
        setResponseError("Their is some server error");
      });
  };
  if (responseType === "success" && tempToken != (null || undefined)) {
    return <Verification/>;
  }
 
  if (registration == true) {
   return <Navigate to="/register" />;
  }
 
  function set_PasswordType(passwordtype){
     if(passwordtype=="password")
          { 
            setPasswordType("text")
          }else {
            setPasswordType("password")
          } 
        }
  return (
    <>
     {loading?<SimpleBackdrop/>: 
      <div className="container login-form">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-md-4 mt-3">
            <img
              src="/logo.png"
              className="img-fluid site-logo d-block mx-auto"
            />
            <div className="box-shadow">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center mb-3 mb-md-5 red-text">
                  {" "}
                  Please Enter the Credential for Login
                </h2>
                
                <Form.Group
                  className="form-group width_100"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: true,
                      pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })}
                  />
                  {errors?.email?.type === "required" && (
                    <p className="error_p">Email is required</p>
                  )}
                  {errors?.email?.type === "pattern" && (
                    <p className="error_p">Please valid email address</p>
                  )}
                </Form.Group>
                <Form.Group
                  className="form-group width_100"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                  <Form.Control
                    type={passwordtype} 
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                     
                    })}
                  />
                  <Button variant="outline-primary" onClick={()=>set_PasswordType(passwordtype)}>
                    { passwordtype ==="password"? <i className="bi bi-eye-slash  mb-3"></i> :<i className="bi bi-eye mb-3"></i> }
                    </Button>
                    </InputGroup>
                  {errors?.password?.type === "required" && (
                    <p className="error_p">Password is required</p>
                  )}
                </Form.Group>
                <div className="fgt-btn"><Link to="/forgotpassword">Forgot Password</Link></div>
                <div className="d-flex justify-content-center error_p mt-1 ">
                  {responseError ? responseError : null}
                  <br />
                  {responseError?.email ? responseError.email[0] : null}
                  <br />
                  {responseError?.password ? responseError.password[0] : null}
                  <br />
                  
                </div>
                {attempt&&<p className="msg">You have only {attempt} attempt left</p>}
                <div className="d-flex justify-content-center w-100">
                  <Button variant="primary" className="dark-btn" type="submit">
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    className="dark-btn"
                    onClick={() => {
                      setRegistration(true);
                    }}
                  >
                    Register
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
}

export default Login;
