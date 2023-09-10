import React from 'react'
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

function Contacts() {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        mode:"all",
        });
        
       const onSubmit = (data) => {
        alert(JSON.stringify(data));
      };
    return (
        <Form className='adddriver-form'
        onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text"
                {...register("address", {
                    required: true,
                     })} />
            {errors?.address?.type === "required" && <p className="error_p">Address is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" 
                {...register("email", {
                  required: true,
                  })}/>
                  {errors?.email?.type === "required" && <p className="error_p">Email is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" 
                {...register("phone_no", {
                  required: true,
                  pattern:/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  })}/>
                  {errors?.phone_no?.type === "required" && <p className="error_p">Phone number is required</p>}
                  {errors?.phone_no?.type === "pattern" && <p className="error_p">Please entre a valid 10 digit phone number</p>}
                  
                  
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>City</Form.Label>
                <Form.Select aria-label="Default select example"
                {...register("city", {
                    required: true,
                    })}>
                    <option value="">- Select -</option>
                    <option value="1">Indore</option>
                    <option value="2">Bhopal</option>
                    <option value="3">Mumbai</option>
                    </Form.Select>
                {errors?.city?.type === "required" && <p className="error_p">City is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>State</Form.Label>
                <Form.Select aria-label="Default select example"
                {...register("state", {
                    required: true,
                    })}>
                    <option value="">- Select -</option>
                    <option value="1">MP</option>
                    <option value="2">UP</option>
                    <option value="3">Maharashtra</option>
                </Form.Select>
                {errors?.state?.type === "required" && <p className="error_p">State is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>PIN</Form.Label>
                <Form.Control type="number" 
                {...register("pin", {
                    required: true,
                    })}/>
                    {errors?.pin?.type === "required" && <p className="error_p">Pin code is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Blood Group</Form.Label>
                <Form.Select aria-label="Default select example"
                {...register("blood_group", {
                    required: true,
                    })}>
                    <option value="">- Select -</option>
                    <option value="1">A</option>
                    <option value="2">AB</option>
                    <option value="3">A-</option>
                    <option value="3">O-</option>
                    <option value="3">Ab-</option>
                </Form.Select>
                {errors?.blood_group?.type === "required" && <p className="error_p">Blood group is required</p>}
            </Form.Group>
            <Form.Group className="form-group d-flex align-items-center width_66" controlId="">
                <div className='d-flex align-items-center mt-4 pt-2'>
                    <Form.Check aria-label="option 1" 
                    {...register("blacklisted", {
                        required: true,
                        })}/>
                    <Form.Label className="ms-2 mb-0"> Blacklisted</Form.Label>
                    {errors?.blacklisted?.type === "required" && <p className="error_p">Please Check the box</p>}
                </div>
                <div className='reason w-100 ps-5'>
                    <Form.Label>Reason for Black list</Form.Label>
                    <Form.Control type="text" 
                    {...register("block_reason", {
                        required: true,
                        })}/>
                        {errors?.block_reason?.type === "required" && <p className="error_p">Please enter the reason for black list</p>}
                </div>
            </Form.Group>
            <div style={{ clear: "both" }}></div>
        </Form>
    )
}

export default Contacts