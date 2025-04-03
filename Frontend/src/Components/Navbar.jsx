import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {

  const[showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)

  return (
    <div className='bg-black flex justify-between items-center px-5 '>
        <img src={logo} className='h-[80px]' alt="" />
        

        {userData.username && <i onClick={() => {
          setShowDropdown(!showDropdown)
        }} className="fa-solid fa-bars text-white fa-xl" ></i>}

        {showDropdown ? (<div className='shadow-2xl rounded-2xl border border-gray-200 fixed right-0 top-20 flex flex-col w-[180px] p-3'>
          <Link to={"/home"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/connections"}>Connections</Link>
          <p className='cursor-pointer' onClick={() => {
            axios.get(baseUrl + "/auth/logout", {withCredentials : true})
            dispatch(removeUser())
            navigate("/auth")
          }}>Logout</p>
        </div>) : ""}
    </div>
  )
}

export default Navbar