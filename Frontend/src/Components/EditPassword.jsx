import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { baseUrl } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const nav = useNavigate()

  const handlePasswordUpdate = async() => {
   try {
    if(currentPassword == "" || newPassword == "" )
        {
            toast.error("Password cannot be empty")
            return
        }
        else if(currentPassword == newPassword)
        {
            toast.error("New password cant be same as Old password")
            return
        }
    
        const res = await axios.patch(baseUrl + "/profile/edit/password", {existingPassword : currentPassword, newPassword}, {withCredentials : true})
        toast.success("Password changed successfully")
        nav("/profile")
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.error)
    nav("/profile")
   }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new password"
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPassword
