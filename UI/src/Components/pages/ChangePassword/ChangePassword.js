import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { InputGroup } from "react-bootstrap";
import { useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { instance } from '../../../axioConfig';
import { useSelector } from 'react-redux';


const ChangePassword = () => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm({
        mode: "all"
    });
    const [passwordtype, setPasswordType] = useState("password");
    const [cnfpPasswordType, setCnfpPasswordType] = useState("password");
    const [oldPasswordType, setOldPasswordType] = useState("password");
    const [responseType, setResponseType] = useState(null)
    const [responseError, setResponseError] = useState(null)
    const [responseMessage, setResponseMessage] = useState(null)
    const bearerToken = useSelector((state) => state.loginDetail.bearerToken);

    const onSubmit = (data) => {
        console.log(data)
        instance.post('updatepassword',data, {
            headers: {
                "Authorization": "Bearer "+bearerToken
              },
            
        }
        ).then(function (response) {
            if (response.status == 200 && response.data?.type == "success") {
                setResponseMessage(response.data.message)
                setResponseError(null)
                reset({
                    oldPassword:"",
                    password:"" ,
                    password_confirmation:""
                })
            } else {
                setResponseMessage(null)
                setResponseError(response.data?.error)
            }
        }).catch(function (error) {

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
            case "oldPassword":
                if (passwordtype == "password") {
                    setOldPasswordType("text")
                } else {
                    setOldPasswordType("password")
                }
                break;
            default:
        }
    }
    if (responseType) {
        return <Navigate to="/" />;
    }
    return (
        <div className="container-fluid otp-verification mt-5">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 mt-5 mt-lg-0 right d-flex justify-content-center align-items-center">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="text-center mb-3">Change a new password</h4>
                         <Form.Group className="form-group width_100" controlId="">
                            <Form.Label>Old Password</Form.Label>
                            <InputGroup>
                               <Form.Control type={oldPasswordType} name="oldPassword"
                                    {...register("oldPassword", {
                                        required: true,
                                       
                                    })}
                                />
                        <Button variant="outline-primary" onClick={() => set_PasswordType(oldPasswordType, "oldPassword")}>
                        {oldPasswordType === "password" ? <i className="bi bi-eye-slash  mb-3"></i> : <i className="bi bi-eye mb-3"></i>}
                        </Button>
                            </InputGroup>
                            {errors.oldpassword && errors.oldpassword?.type === "required" && <span className="error_p mt-1">Please Enter Old Password</span>}
                        </Form.Group>
                        <Form.Group className="form-group width_100" controlId="">
                            <Form.Label>New Password</Form.Label>
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
                            <Form.Label>Confirm New Password</Form.Label>
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
                            <div className="d-flex justify-content-center error_p server_error mt-1 ">
                                {responseMessage ? responseMessage : null}
                                {responseError ? responseError : null}<br />
                                {responseError?.email ? responseError.email[0] : null}<br />
                                {responseError?.password ? responseError.password[0] : null}<br />
                            </div>
                        </Form.Group>
                       
                        <div style={{ clear: "both" }}></div>
                        <Button type="submit"
                            className="d-block mx-auto btn dark-btn btn-lg mt-3 mb-3"
                            id="">
                            Change password
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword