import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav>
        <Link to="/"></Link>
        <Link to="/parent">Parent</Link>
        <Link to="/patent">Patent</Link>
        <Link to="/student">Student</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </>
  )
}

export default Navbar;