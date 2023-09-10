import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../../pages/Driver/AddDriver.css';
import { useForm } from "react-hook-form";
function ModalDialog() {
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className='btn dark-btn' onClick={handleShow}>
        Add References
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Guarantor/References</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='references-details'
          onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" 
              {...register("name", {
                required: true,
                 })}/>
                  {errors?.name?.type === "required" && <p className="error_p">Name is required</p>}
            </Form.Group>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>Vehicle</Form.Label>
              <Form.Control type="text" 
                {...register("vehicle", {
                  required: true,
                  })} />
                  {errors?.vehicle?.type === "required" && <p className="error_p">Vehicle name is required</p>}
            </Form.Group>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>DL No.</Form.Label>
              <Form.Control type="text" {...register("license_no", {
                    required: true,
                    pattern:/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
                    
                })}/>
                   {errors?.license_no?.type === "required" && <p className="error_p">License number is required</p>}
                   {errors?.license_no?.type === "pattern" && <p className="error_p">Please enter valid License number </p>}
            </Form.Group>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>Relation</Form.Label>
              <Form.Control type="text" {...register("relation", {
                    required: true,
                     })} />
            {errors?.relation?.type === "required" && <p className="error_p">Relation is required</p>}
            </Form.Group>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" {...register("address", {
                    required: true,
                     })} />
            {errors?.address?.type === "required" && <p className="error_p">Address is required</p>}
            </Form.Group>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" {...register("email", {
                      required: true,
                      pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })}
                  />
                  {errors?.email?.type === "required" && (
                    <p className="error_p">Email is required</p>
                  )}
                  {errors?.email?.type === "pattern" && (
                    <p className="error_p">Please entre valid email address</p>
                  )}

            </Form.Group>
            <Form.Group className="form-group width_50" controlId="">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" {...register("phone_no", {
                  required: true,
                  pattern:/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  })}/>
                  {errors?.phone_no?.type === "required" && <p className="error_p">Phone number is required</p>}
                  {errors?.phone_no?.type === "pattern" && <p className="error_p">Please entre a valid 10 digit phone number</p>}
            </Form.Group>
            <div style={{ clear: "both" }}></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Insert
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalDialog