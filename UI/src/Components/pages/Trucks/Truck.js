import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Truck() {
  return (
    <>
    <h1>This is a demo Truck page</h1>
    <Link to="/addtruck" className='btn dark-btn'>
        Add Truck
    </Link>
    
    </>
  )
}

export default Truck