import React, { useState } from 'react';

const Auth = () => {

    const[isSignupPage, setIsSignupPage] = useState(true)

    function toggleBtnHandler()
    {
        setIsSignupPage(!isSignupPage)
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">{isSignupPage ? "Sign up" : "Log in"}</h2>
        <div className="space-y-4">
          {isSignupPage && <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />}
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
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