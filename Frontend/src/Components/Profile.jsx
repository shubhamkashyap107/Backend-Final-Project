import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { baseUrl, promptAI } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyD_P1qqLOdoUJZeJkQeEERW7_X6awegOCE" });


const Profile = () => {
  const date = new Date()
  const temp = date.toISOString().slice(0,10) //"yyyy-mm-dd" -> ["yyyy", "mm", "dd"] -> ["yyyy" - 15, "mm", "dd"] -> yyyy-mm-dd
  let arr = temp.split("-")
  arr[0] = Number(arr[0]) - 18
  const finalDate = arr.join("-")
  // console.log(finalDate)

  const dispatch = useDispatch()
  const userSliceData = useSelector((store) => {
    return store.user
  })
    const navigate = useNavigate()
    const[image, setImage] = useState(userSliceData.image || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png")
    const[firstName, setFirstName] = useState(userSliceData.firstName || "")
    const[lastName, setLastName] = useState(userSliceData.lastName || "")
    const[DOB, setDOB] = useState(userSliceData.DOB || "")
    const[bio, setBio] = useState(userSliceData.bio || "")


    useEffect(() => {
      
    }, [])

  return (
    <>

    {userSliceData && 
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4 mt-10 flex flex-col items-center">
        <img className='h-[150px] w-[150px] rounded-full' src={image} alt="" />
    <input
        onChange={async(e) => {
            //creating a temp , local url for displaying purposes
            const url = URL.createObjectURL(e.target.files[0])
            setImage(url)


            let obj = e.target.files[0]
            let newFormData = new FormData()

            //appending necessary details to the formData object
            newFormData.append("file", obj);
            newFormData.append("upload_preset", "tidy9idl");

            let res = await axios.post("https://api.cloudinary.com/v1_1/derddgaed/image/upload", newFormData)
            setImage(res.data.url)
        }}
        type="file"
        placeholder="Image Url"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
      value={firstName}
      onChange={(e) => {
        setFirstName(e.target.value)
      }}
        type="text"
        placeholder="First name"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
      value={lastName}

      onChange={(e) => {
        setLastName(e.target.value)
      }}
        type="text"
        placeholder="Last name"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
      value={DOB}

      onChange={(e) => {

        setDOB(e.target.value)
      }}

      max={finalDate} 
        type="date"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
      value={bio}


      onChange={(e) => {
        setBio(e.target.value)
      }}
        placeholder="Bio"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
      />
      <div className='w-[100%] flex justify-end'>

        <p onClick={() => {
          if(bio.length < 20)
          {
            toast.error("Please enter atleast 20 characters")
            return
          }
          async function getAIRes() {
            const response = await ai.models.generateContent({
              model: "gemini-2.0-flash",
              contents: promptAI + bio,
            });
            setBio(response.text)
          }
          getAIRes()
        }} className='text-xs text-blue-400 cursor-pointer hover:text-blue-800'>Get AI Generated Bio</p>
      </div>
    <button onClick={async() => {
        if(!firstName || !lastName || !DOB || !image || !bio)
        {
            toast.error("Please enter all the fields")
            return
        }
        let res = await axios.patch(baseUrl + "/profile/edit", {firstName, lastName, DOB, image, bio}, {withCredentials : true})
        if(res.status == 202)
        {
            // console.log(res)
            dispatch(addUser(res.data.data))
            toast.success(res.data.msg)
            navigate("/profile")
        }
        else
        {
            toast.error("Please Enter valid data")
        }
    }} className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
        Update Profile
      </button>
    </div>

  }
    </>

  );
};

export default Profile;