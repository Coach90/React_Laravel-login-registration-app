import React from 'react'
import { Link } from 'react-router-dom'

function Firms() {
  return (
    <>
      <h1>This is a demo Firms page</h1>
      <Link to="/addfirms" className='btn dark-btn'>
        Add Firms
      </Link>
    </>
  )
}

export default Firms