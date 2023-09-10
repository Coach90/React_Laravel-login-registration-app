import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../Registration/Registration.css'
import { useForm } from "react-hook-form";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import '../../common/Form/Form.css';
import { instance } from "../../../axioConfig";
import { useDispatch, useSelector } from "react-redux";
import { setTempToken } from "../../../features/Login";
import Verification from "../Verification/Verification";
import Login from "../Login/Login";
import SimpleBackdrop from "../../common/Spinner/Spinner";
import { Navigate } from "react-router";

function Registration() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "all"
  });
  const [loading, setLoading] = useState(false);
  const [passwordtype, setPasswordType] = useState("password");
  const [cnfpPasswordType, setCnfpPasswordType] = useState("password");
  const [responseType, setResponseType] = useState(null)
  const [responseError, setResponseError] = useState(null)
  const tempToken = useSelector((state) => state.loginDetail.tempToken);
  const [login, setLogin] = useState(false);
  const [disable,setDisable]=useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
  }, [responseType, responseError])

  function submitData(data) {
    setLoading(true)
    instance.post('register', data)
      .then(function (response) {
        if (response.status == 200 && response.data?.type == "success") {
          setResponseType(response.data?.type);
          dispatch(setTempToken(response.data.tempToken));
          setLoading(false);
          setResponseError(null)
        } else {
          setResponseType(response.data?.type);
          setResponseError(response.data?.error);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setResponseError("Their is some server error");
        setLoading(false);
      });
  }
  function set_PasswordType(passwordtype, type) {
    switch (type) {
      case "password":
        if (passwordtype == "password") {
          setPasswordType("text")
        } else {
          setPasswordType("password")
        }
        break;
      case "confirm":
        if (passwordtype == "password") {
          setCnfpPasswordType("text")
        } else {
          setCnfpPasswordType("password")
        }
        break;
      default:
    }
  }
  if (responseType === "success" && tempToken != (null || undefined)) {
    return <Verification />
  }
  if (login == true) {
    return <Navigate to="/" />
  }

  return (
    <>
      {loading ? <SimpleBackdrop /> :
        <div className="container-fluid registration-form">
          <div className="row">
            <div className="col-lg-5 left d-flex justify-content-center align-items-center">
              <Link to="/">
                <Navbar.Brand>
                  <img src="/logo.png" className="img-fluid site-logo" />
                </Navbar.Brand>
              </Link>          
            </div>
            <div className="col-lg-7 mt-5 mt-lg-0 right d-flex justify-content-center align-items-center">
              <Form className="col-xxl-8 col-lg-10 col-sm-10 col-12" onSubmit={handleSubmit(submitData)}>
                <h2 className="text-center mb-3 mb-md-5 red-text"> Please Enter the Details for Registration</h2>
                <Form.Group className="form-group width_100" controlId="">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" className={errors?.name ? "border border-danger p-2" : null}  {...register("name", { required: true, minLength: 2, maxLength: 255 })} />
                  {errors.name && errors.name.type === "required" && <span className="error_p">Please Enter Name</span>}
                  {errors.name && errors.name.type === "minLength" && <span className="error_p">Please enter a valid name</span>}
                  {errors.name && errors.name.type === "maxLength" && <span className="error_p">The name is too long </span>}
                </Form.Group>
                <Form.Group className="form-group width_100" controlId="">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="text" className={errors?.email ? "border border-danger p-2" : null}  {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} />
                  {errors.email && errors.email.type === "required" && <span className="error_p mt-1">Please Enter email</span>}
                  {errors.email && errors.email.type === "pattern" && <span className="error_p">Please enter a valid email</span>}
                </Form.Group>
                <Form.Group className="form-group width_100" controlId="">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="number" className={errors?.mobile ? "border border-danger p-2" : null}  {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} />
                  {errors.mobile && errors.mobile.type === "required" && <span className="error_p">Please Enter mobile number</span>}
                  {errors.mobile && (errors.mobile.type === "minLength" || errors.mobile.type === "maxLength") && <span className="error_p mt-1">Please enter a valid mobile number</span>}
                </Form.Group>
                <Form.Group className="form-group width_100" controlId="">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={passwordtype}
                      className={errors?.password ? "border border-danger " : null}
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 15,
                        validate: {
                          lower: value => /[a-z]/.test(value),
                          upper: value => /[A-Z]/.test(value),
                          number: value => /[0-9]/.test(value),
                          special: value => /[^a-zA-Z0-9]/.test(value),
                        }
                      })} />
                    <Button variant="outline-primary" onClick={() => set_PasswordType(passwordtype, "password")}>
                      {passwordtype === "password" ? <i className="bi bi-eye-slash  mb-3"></i> : <i className="bi bi-eye mb-3"></i>}
                    </Button>
                  </InputGroup>
                  {errors.password && errors.password?.type === "required" && <span className="error_p mt-1">Please Enter Password</span>}
                  {errors.password && errors.password?.type === "minLength" && <span className="error_p mt-1">Password Should be of minimum 8 character </span>}
                  {errors.password && errors.password?.type === "maxLength" && <span className="error_p mt-1">Password cannot be more than 15 charcter </span>}
                  {errors.password && errors.password?.type === "lower" && <span className="error_p mt-1">Password must include a lowercase character</span>}
                  {errors.password && errors.password?.type === "upper" && <span className="error_p mt-1">Password must include a uppercase character</span>}
                  {errors.password && errors.password?.type === "number" && <span className="error_p mt-1">Password must include a number character</span>}
                  {errors.password && errors.password?.type === "special" && <span className="error_p mt-1">Password must include a special character</span>}

                </Form.Group>
                <Form.Group className="form-group width_100" controlId="">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control type={cnfpPasswordType} name="password_confirmation"
                      {...register("password_confirmation", {
                        required: true,
                        validate: {
                          notconfirmed: (val) => (watch('password') == val)
                        }
                      })}
                    />
                    <Button variant="outline-primary" onClick={() => set_PasswordType(cnfpPasswordType, "confirm")}>
                      {cnfpPasswordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </Button>
                  </InputGroup>
                  {errors.password_confirmation && errors.password_confirmation?.type === "notconfirmed" && <span className="error_p mt-1">Password and Confirmed password do not match</span>}
                  {errors.password_confirmation && errors.password_confirmation?.type === "required" && <span className="error_p mt-1">Please enter confirm password value</span>}
                  <div className="d-flex justify-content-center error_p mt-1 server_error">
                    {responseError?.name ? responseError.name[0] : null}<br />
                    {responseError?.email ? responseError.email[0] : null}<br />
                    {responseError?.mobile ? responseError.mobile[0] : null}<br />
                    {responseError?.password ? responseError.password[0] : null}<br />
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-center clearfix w-100">
                  <Button variant="primary" className="dark-btn mt-3" type="submit">
                    Register
                  </Button>
                  <Button variant="primary" className="dark-btn mt-3" onClick={() => { setLogin(true) }} >
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Registration;