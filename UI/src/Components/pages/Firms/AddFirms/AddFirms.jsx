import React from "react";
import { useForm } from "react-hook-form";
import "../AddFirms/AddFirms.css"
const AddFirms = () => {
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
<form className='addtruck-form'  
 onSubmit={handleSubmit(onSubmit)}>

            <div class="form-group">
                <label for="">Name</label>
                <input  type="text" class="form-control" id="name" 
                {...register("firmname", {
                  required: true,
                  
           })}/>
           {errors?.firmname?.type === "required" && <p className="error_p">Firm name is required</p>}
           
            </div>
            <div class="form-group">
                <label type="text" for="">Contact</label>
                <input type="contact" class="form-control" id="" 
                {...register("contact",{
                  required: true,
            pattern:/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
           })}/>
          {errors?.contact?.type === "required" && <p className="error_p">Contact number is required</p>}
           {errors?.contact?.type === "pattern" && <p className="error_p">Please entre a valid Contact number</p>}
            </div>
            <div class="form-group">
                <label for="">Email</label>
                <input type="email" class="form-control" id="" 
                {...register("email", {
                  required: true,
           })}/>
           {errors?.email?.type === "required" && <p className="error_p">Email is required</p>}
            </div>
            <div class="form-group">
                <label for="">Address</label>
                <input type="text" class="form-control" id="" 
                {...register("address", {
                  required: true,
                  minLength:5
           })}/>
           {errors?.address?.type === "required" && <p className="error_p">Address is required</p>}
           {errors?.address?.type === "minLength" && <p className="error_p">Address must be atleast 5 character</p>}
            </div>
            <div class="form-group">
                <label for="">GST</label>
                <input type="text" class="form-control" id="" 
                {...register("gst", {
                  required: true,
           })}/>
           {errors?.gst?.type === "required" && <p className="error_p">GST is required</p>}
            </div>
            <div class="form-group">
                <label for="">PAN </label>
                <input type="text" class="form-control" id="" 
                {...register("pan", {
                  required: true,
                  minLength:10,
                  maxLength:10,
                  pattern:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
           })}/>
           {errors?.pan?.type === "pattern" && <p className="error_p">Please entre valid PAN number </p>}
           {errors?.pan?.type === "maxLength" && <p className="error_p">PAN number cannot exceed 10 characters</p>}
           {errors?.pan?.type === "minLength" && <p className="error_p">PAN number cannot be less than 10 characters</p>}
           {errors?.pan?.type === "required" && <p className="error_p">PAN card number is required</p>}
           </div> 
            <button type="submit" class="btn dark-btn mx-auto d-block mt-5">
             Submit
            </button>
           </form>
             )
           }
export default AddFirms