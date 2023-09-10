import React from 'react'
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";


function Bank() {
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
    <Form className='references-details'>
      <Form.Group className="form-group width_50" controlId="">
        <Form.Label>Bank Name</Form.Label>
        <Form.Control type="text" 
        {...register("bank_name", {
                required: true,
                 })}/>
                  {errors?.bank_name?.type === "required" && <p className="error_p">Bank name is required</p>}
      </Form.Group>
      <Form.Group className="form-group width_50" controlId="">
        <Form.Label>Bank A/C No.</Form.Label>
        <Form.Control type="text" {...register("bank_name", {
                required: true,
                 })}/>
                  {errors?.bank_name?.type === "required" && <p className="error_p">Bank account number is required</p>}
      </Form.Group>
      <Form.Group className="form-group width_50" controlId="">
        <Form.Label>IFSC Code</Form.Label>
        <Form.Control type="text" {...register("ifsc", {
                required: true,
                pattern:/^[A-Z]{4}0[A-Z0-9]{6}$/
                 })}/>
                  {errors?.ifsc?.type === "required" && <p className="error_p">IFSC code is required</p>}
                  {errors?.ifsc?.type === "pattern" && <p className="error_p"> Please enter valid IFSC code</p>}
      </Form.Group>
      <Form.Group className="form-group width_50" controlId="">
        <Form.Label>Fuel Card No.</Form.Label>
        <Form.Control type="text" {...register("fuel_no", {
                required: true,
                 })}/>
                  {errors?.fuel_no?.type === "required" && <p className="error_p">Fuel card number is required</p>}
      </Form.Group>
      <Form.Group className="form-group width_50" controlId="">
        <Form.Label>Fast Tag Card No.</Form.Label>
        <Form.Control type="text" {...register("fast_tag", {
                required: true,
                 })}/>
                  {errors?.fast_tag?.type === "required" && <p className="error_p">Fast Tag Card number is required</p>}
      </Form.Group>
      <Form.Group className="form-group width_50" controlId="">
        <Form.Label>
          Beneficiary Name</Form.Label>
        <Form.Control type="text" {...register("beneficiary", {
                required: true,
                 })}/>
                  {errors?.beneficiary?.type === "required" && <p className="error_p">Beneficiary name is required</p>}
      </Form.Group>
      <div style={{ clear: "both" }}></div>
    </Form>
  )
}

export default Bank