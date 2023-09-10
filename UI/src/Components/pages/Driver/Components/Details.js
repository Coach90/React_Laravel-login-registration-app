import React from 'react'
import Form from 'react-bootstrap/Form';
// import '../../Driver/AddDriver.css'
import { useForm} from 'react-hook-form';

function Details() {
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
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" 
                {...register("photo", {
                  required: true,
                })}/>
                {errors?.photo?.type === "required" && <p className="error_p">File is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Type</Form.Label>
                <Form.Select aria-label="Default select example"
                {...register("type_", {
                    required: true,
                 })}>
                    <option value="">- Select -</option>
                    <option value="1">Driver</option>
                    <option value="2">2nd Driver</option>
                    <option value="3">Cleaner</option>
                    <option value="3">Helper</option>
                </Form.Select>
                {errors?.type_?.type === "required" && <p className="error_p">Type field is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" 
                {...register("name_", {
                    required: true,
                  })}/>
                   {errors?.name_?.type === "required" && <p className="error_p"> Driver Name is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Father's Name</Form.Label>
                <Form.Control type="text"
                {...register("father_name", {
                    required: true,
                  })} />
                  {errors?.father_name?.type === "required" && <p className="error_p">Driver's father name is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Link Account</Form.Label>
                <Form.Control type="text" 
                {...register("link_account", {
                    required: true,
                  })}/>
                  {errors?.link_account?.type === "required" && <p className="error_p">This field is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date"
                {...register("dob", {
                    required: true,
                  })} />
                  {errors?.dob?.type === "required" && <p className="error_p">Date of Birth is required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control type="date" 
                {...register("join_date", {
                    required: true,
                  })}/>
                  {errors?.join_date?.type === "required" && <p className="error_p">Joining dateis required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Reason of Leaving</Form.Label>
                <Form.Control type="text" 
                {...register("leaving_reason", {
                    required: true,
                  })}/>
                  {errors?.leaving_reason?.type === "required" && <p className="error_p">Leaving reason is  required</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="">
                <Form.Label>Date Of Leaving</Form.Label>
                <Form.Control type="date" 
                {...register("leaving_date", {
                    required: true,
                  })}/>
                  {errors?.leaving_date?.type === "required" && <p className="error_p"> Leaving date is  required</p>}
            </Form.Group>
            <div style={{ clear: "both" }}></div>
        </Form>
    )
}

export default Details