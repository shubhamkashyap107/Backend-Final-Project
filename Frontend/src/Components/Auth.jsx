import React, { useState } from 'react';
import validator, { isStrongPassword } from "validator"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {baseUrl} from "../utils/constants"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[isSignupPage, setIsSignupPage] = useState(true)
    const[emailId, setEmailId] = useState("")
    const[username, setUsername] = useState("chotudon")
    const[password, setPassword] = useState("Qwerty123!")
    const[showPassword, setShowPassword] = useState(false)

    function toggleBtnHandler()
    {
        setIsSignupPage(!isSignupPage)
    }


    async function btnClickHandler() {
        try {
            if(username.length < 6)
                {
                    toast.error("Enter a valid email")
                    return
                }
                if(isSignupPage)
                {
                    let flag1 = validator.isEmail(emailId)
                    if(!flag1)
                    {
                        toast.error("Please enter a valid email")
                        return
                    }
        
                    let flag2 = validator.isStrongPassword(password)
                    if(!flag2)
                    {
                        toast.error("Please enter a strong password")
                        return
                    }
                    let res = await axios.post(baseUrl + "/auth/signup", {username, password, emailId}, {withCredentials : true})
                    console.log(res)
                    navigate("/profile/edit")
                }
                else
                {
                    if(password.length < 8)
                    {
                        toast.error("Password should be atleast 8 characters")
                        return
                    }
                    let res = await axios.post(baseUrl + "/auth/login", {username, password}, {withCredentials : true})
                    // console.log(res)
                    dispatch(addUser(res.data.data))
                    navigate("/home")
                }
        } catch (error) {
            if(error.status == 400)
            {
                toast.error("User already exists")
            }
            else if(error.status == 401)
            {
                toast.error("Invalid Credentials")
            }
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">{isSignupPage ? "Sign up" : "Log in"}</h2>
        <div className="space-y-4">
          {isSignupPage && <input 
          onChange={(e) => {
            setEmailId(e.target.value)
          }}
          value={emailId}
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />}
          <input 
          value={username}
           onChange={(e) => {
            setUsername(e.target.value)
          }}
            type="text" 
            placeholder="Username" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className='relative'>

          <input 
          value={password}
           onChange={(e) => {
            setPassword(e.target.value)
          }}
            type={showPassword ? "text" : "password"}
            placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i onClick={() => {
            setShowPassword(!showPassword)
          }} class={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-5 top-4`} ></i>
          </div>

          <button onClick={btnClickHandler}
            className="cursor-pointer w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            {isSignupPage ? "Sign Up" : "Log In"}
          </button>
            {isSignupPage ? <p className='text-sm text-right'>Already a user? <span onClick={toggleBtnHandler} className='text-blue-500 cursor-pointer'>Log in instead</span></p> : <p className='text-sm text-right'>Not a user? <span onClick={toggleBtnHandler} className='text-blue-500 cursor-pointer'>Create a account</span></p>}
        </div>
      </div>
    </div>
  );
};

export default Auth;