import React from 'react'
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div className='bg-black flex justify-between items-center px-5 '>
        <img src={logo} className='h-[80px]' alt="" />
        


        <i className="fa-solid fa-bars text-white fa-xl" ></i>
    </div>
  )
}

export default Navbar