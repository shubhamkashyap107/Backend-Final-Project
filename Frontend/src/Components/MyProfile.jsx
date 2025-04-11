import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyProfile = () => {

  const navigate = useNavigate()
  const userData = useSelector(store => store.user)

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}



useEffect(() => {

  if(!userData.firstName || !userData.lastName || !userData.DOB || !userData.bio || !userData.image)
    {
      navigate("/profile/edit")
      toast.error("Please complete your profile")
      return
    }
}, [])

  return (

      <div className="bg-gradient-to-br from-indigo-100 to-white min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white shadow-2xl rounded-3xl overflow-hidden p-8 text-center">
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-500 shadow-lg object-cover"
          />
          <h2 className="text-3xl font-semibold text-gray-800 mt-6">
            {userData.firstName + " " + userData.lastName}
          </h2>
          <span className="text-gray-500 text-base mt-1 block">
            {calculateAge(userData.DOB)} years old
          </span>
          <p className="text-gray-600 mt-4 px-4 italic">
            {userData.bio}
          </p>
    
          <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => navigate("/profile/edit")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              Edit Profile
            </button>
    
            <button
              onClick={() => navigate("/profile/edit/password")}
              className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

    
  )
}

export default MyProfile