import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)

  const handleLogout = async () => {
    try {
      await axios.get(baseUrl + "/auth/logout", { withCredentials: true })
      dispatch(removeUser())
      navigate("/auth")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <nav className='bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4 flex items-center justify-between shadow-lg relative z-50'>
      <Link to="/home">
        <img src={logo} className='h-10 object-contain hover:opacity-90 transition duration-200' alt="Logo" />
      </Link>

      {userData.username && (
        <div className='relative'>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white hover:text-gray-100 focus:outline-none"
          >
            <i className="fa-solid fa-bars fa-xl"></i>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-fade-in-up backdrop-blur-sm">
              <Link
                to="/home"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition rounded-md"
                onClick={() => setShowDropdown(false)}
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition rounded-md"
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </Link>
              <Link
                to="/connections"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition rounded-md"
                onClick={() => setShowDropdown(false)}
              >
                Connections
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 transition rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
