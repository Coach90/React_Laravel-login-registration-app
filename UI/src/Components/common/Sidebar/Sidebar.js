import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <NavLink to="/">
            <i className="bi bi-house"></i><span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink data-bs-toggle="collapse" to="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            <i class="bi bi-person-rolodex"></i> <span>Drivers</span><i class="bi bi-chevron-down"></i>
          </NavLink>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <NavLink to="/adddriver">
                Add Driver
              </NavLink>
              <NavLink to="/expense">
                View List
              </NavLink>
            </div>
          </div>
        </li>
        <li>
          <NavLink to="/firms">
            <i className="bi bi-buildings"></i><span>Firms</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/trucks">
            <i className="bi bi-truck"></i><span>Trucks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/trips">
            <i className="bi bi-rocket-takeoff"></i><span>Trips</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/expense">
            <i className="bi bi-currency-rupee"></i><span>Expeneses</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar