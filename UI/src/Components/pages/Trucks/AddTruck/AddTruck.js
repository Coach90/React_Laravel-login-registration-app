import React from 'react'
import './AddTruck.css'
import '../../../common/Form/Form.css';
import "../AddTruck/AddTruck.css"
import { useForm } from "react-hook-form";

function AddTruck() {
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
    <form className='addtruck-form' onSubmit={handleSubmit(onSubmit)}>
      <div class="form-group">
        <label for="">Truck Number</label>
        <input type="text" class="form-control" id="" aria-describedby="emailHelp"
          {...register("TruckNumber", {
            required: true,
          })} />
        {errors?.TruckNumber?.type === "required" && <p className="error_p">Truck number is required</p>}
      </div>

      <div class="form-group">
        <label for="modal">Model</label>
        <select class="form-control" id="modal"
          {...register("ModelNumber", {
            required: true,
          })}>
          <option value="">-Select-</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
        </select>
        {errors?.ModelNumber?.type === "required" && <p className="error_p">Model field is required</p>}
      </div>

      <div class="form-group">
        <label for="">Old Registration</label>
        <input type="text" class="form-control" id=""
          {...register("Registration", {
            required: true,
           })}/>
        {errors?.Registration?.type === "required" && <p className="error_p">Registration number is required</p>}
       </div>
      <div class="form-group">
        <label for="">New Registration</label>
        <input type="text" class="form-control" id=""
          {...register("Registration", {
            required: true,
          })} />
        {errors?.Registration?.type === "required" && <p className="error_p">Registration number is required</p>}

      </div>
      <div class="form-group">
        <label for="">Mfg. Year</label>
        <input type="number" class="form-control" id=""
          {...register("Mfg", {
            required: true,
            maxLength: 4,
          })} />
        {errors?.Mfg?.type === "required" && <p className="error_p">Manufacture year is required</p>}
      </div>

      <div class="form-group">
        <label for="">Valid Upto</label>
        <input type="Date" class="form-control" id=""
          {...register("valid", {
            required: true,
          })} />
        {errors?.valid?.type === "required" && <p className="error_p">Valid date is required</p>}
      </div>

      <div class="form-group">
        <label for="">Ownership</label>
        <input type="text" class="form-control" id=""
          {...register("ownership", {
            required: true,
          })} />
        {errors?.ownership?.type === "required" && <p className="error_p">ownership field is required</p>}
      </div>

      <div class="form-group">
        <label for="">Registration date</label>
        <input type="Date" class="form-control" id=""
          {...register("regisDate", {
            required: true,
          })} />
        {errors?.regisDate?.type === "required" && <p className="error_p">Registration date is required</p>}
      </div>

      <div class="form-group">
        <label for="">RTO passing</label>
        <input type="text" class="form-control" id=""
          {...register("rto", {
            required: true,
            minLength: 2,
            maxLength: 2,
            pattern: /^[A-Za-z]+$/i
          })} />
        {errors?.rto?.type === "required" && <p className="error_p">RTO code is required</p>}
        {errors?.rto?.type === "minLength" && <p className="error_p">RTO code cannot less then 2 characters</p>}
        {errors?.rto?.type === "maxLength" && <p className="error_p">RTO code cannot exceed 2 characters</p>}
        {errors?.rto?.type === "pattern" && <p className="error_p">RTO code must be in the form of Alphabte</p>}
      </div>

      <div class="form-group">
        <label for="">Fasttag Number</label>
        <input type="number" class="form-control" id="" {...register("fasttag", {
          required: true,
        })} />
        {errors?.fasttag?.type === "required" && <p className="error_p">Fasttag Number is required</p>}
      </div>

      <div class="form-group">
        <label for="">Engine Number</label>
        <input type="number" class="form-control" id="" {...register("engine", {
          required: true,
        })} />
        {errors?.engine?.type === "required" && <p className="error_p">Engine Number is required</p>}
      </div>

      <div class="form-group">
        <label for="">Chassis Number</label>
        <input type="number" class="form-control" id=""
          {...register("chassis", {
            required: true,
          })} />
        {errors?.chassis?.type === "required" && <p className="error_p">Chassis Number is required</p>}
      </div>

      <div class="form-group">
        <label for="">Truck Length</label>
        <input type="number" class="form-control" id="" {...register("trucklen", {
          required: true,
        })} />
        {errors?.trucklen?.type === "required" && <p className="error_p">Truck Length is required</p>}
      </div>

      <div class="form-group">
        <label for="">Trolly length</label>
        <input type="number" class="form-control" id="" {...register("trollylen", {
          required: true,
        })} />
        {errors?.trollylen?.type === "required" && <p className="error_p">Trolly Length is required</p>}
      </div>

      <div class="form-group">
        <label for="">Gross weight</label>
        <input type="number" class="form-control" id="" {...register("gross", {
          required: true,
        })} />
        {errors?.gross?.type === "required" && <p className="error_p">Gross Weight is required</p>}
      </div>

      <div class="form-group">
        <label for="">Unloading weigth</label>
        <input type="number" class="form-control" id=""
          {...register("unloading", {
            required: true,
          })} />
        {errors?.unloading?.type === "required" && <p className="error_p">Unloading weigth is required</p>}
      </div>

      <div class="form-group">
        <label for="">Pay load weight</label>
        <input type="number" class="form-control" id="" {...register("payload", {
          required: true,
        })} />
        {errors?.payload?.type === "required" && <p className="error_p">Pay load weight is required</p>}
      </div>

      <div class="form-group">
        <label for="modaltype">Model Type</label>
        <select class="form-control" id="modaltype"
          {...register("modeltype", {
            required: true,
          })}>
          <option value="">-Select-</option>
          <option>New</option>
          <option>Old</option>
        </select>
        {errors?.modeltype?.type === "required" && <p className="error_p">Model type is required</p>}
      </div>
      <div class="form-group">
        <label for="">Purchase date</label>
        <input type="Date" class="form-control" id="" {...register("purchase", {
          required: true,
        })} />
        {errors?.purchase?.type === "required" && <p className="error_p">Purchase Date is required</p>}
      </div>

      <div class="form-group">
        <label for="">Invoice date</label>
        <input type="Date" class="form-control" id=""
          {...register("invoice", {
            required: true,
          })} />
        {errors?.invoice?.type === "required" && <p className="error_p">Invoice Date is required</p>}
      </div>

      <div class="form-group">
        <label for="">Total cost</label>
        <input type="number" class="form-control" id=""
          {...register("totalcost", {
            required: true,
          })} />
        {errors?.totalcost?.type === "required" && <p className="error_p">Total cost is required</p>}
      </div>

      <div class="form-group">
        <label for="bodytype">Body Type</label>
        <select class="form-control" id="bodytype"
          {...register("bodytype",{
            required: true,
          })}>
          <option value="">-Select-</option>
          <option>Refrigerated</option>
          <option>trailer</option>
          <option>Open trailer</option>
        </select>
        {errors?.bodytype?.type === "required" && <p className="error_p">Body Type field is required</p>}
      </div>

      <button type="submit" class="btn dark-btn mx-auto d-block mt-5" >
      Submit
       </button>
    </form>
  )
}

export default AddTruck


