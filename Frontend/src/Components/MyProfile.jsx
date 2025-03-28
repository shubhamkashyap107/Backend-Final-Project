import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

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


  return (
    <div className='bg-gray-100 h-[100vh]'>
      <Navbar />

      <div className="max-w-sm mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-6 text-center mt-20">
  <img
    src={userData.image}
    alt="Profile"
    className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-500 shadow-md"
  />
  <h2 className="text-2xl font-bold text-gray-800 mt-4">
    {userData.firstName + " " + userData.lastName}
  </h2>
  <span className="text-gray-500 text-sm block mt-1">
    {calculateAge(userData.DOB)} years old
  </span>
  <p className="text-gray-600 mt-3 px-4 italic">{userData.bio}</p>
  <div className="mt-4">
    <button onClick={() => {
      navigate("/profile/edit")
    }} className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition">
      Edit profile
    </button>
  </div>
</div>

    </div>
  )
}

export default MyProfile