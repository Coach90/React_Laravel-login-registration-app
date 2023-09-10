import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";

function PageNotFound() {
  return (
    <div className='text-center'>
      <Link to="/">
        <Navbar.Brand>
          <img src="/logo.png" className="img-fluid site-logo" />
        </Navbar.Brand>
      </Link>
      <div className='d-flex w-100 justify-content-center '>
        <h2 className='text-center fs-1 m-5 p-3  fw-bold'>Sorry This Page does not Exists</h2>
      </div>
    </div>
  )
}

export default PageNotFound