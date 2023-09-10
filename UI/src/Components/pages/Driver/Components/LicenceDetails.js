import React from 'react'
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
function LicenceDetails() {
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
        <Form className='adddriver-form' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="form-group" controlId="">
                <Form.Label> License</Form.Label>
                <Form.Control type="file" 
                {...register("license", {
                    required: true,
                  })}/>
                   {errors?.license?.type === "required" && <p className="error_p">Please choose the file</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Licence No.</Form.Label>
                <Form.Control type="text" 
                {...register("license_no", {
                    required: true,
                    pattern:/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
                    
                  })}/>
                   {errors?.license_no?.type === "required" && <p className="error_p">License number is required</p>}
                   {errors?.license_no?.type === "pattern" && <p className="error_p">Please enter valid License number </p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Class</Form.Label>
                <Form.Select aria-label="Default select example"
                {...register("class", {
                    required: true,
                  })}>
                    <option value="">- Select -</option>
                    <option value="1">Heavy</option>
                    <option value="2">Medium</option>
                    <option value="3">Light</option>
                </Form.Select>
                {errors?.class?.type === "required" && <p className="error_p">Select the class</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" 
                {...register("date", {
            required: true,
          })} />
           {errors?.date?.type === "required" && <p className="error_p">Date is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Vaild Upto</Form.Label>
                <Form.Control type="date" 
                {...register("valid_upto",{
                    required: true,
                  })}/>
                   {errors?.valid_upto?.type === "required" && <p className="error_p">Field is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Authority</Form.Label>
                <Form.Control type="text" 
                {...register("authority", {
                    required: true,
                  })}/> 
 {errors?.authority?.type === "required" && <p className="error_p">Authority is required</p>}
            </Form.Group>
            <div style={{ clear: "both" }}></div>
        </Form>
    )
}

export default LicenceDetails