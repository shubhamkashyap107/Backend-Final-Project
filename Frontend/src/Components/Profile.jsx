import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { baseUrl } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate()
    const[image, setImage] = useState("")
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[DOB, setDOB] = useState("")
    const[bio, setBio] = useState("")

    console.log(firstName, lastName, DOB, bio)


    const[img, setImg] = useState("")
    let defaultImg = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4 mt-10 flex flex-col items-center">
        <img className='h-[150px] w-[150px] rounded-full' src={img ? img : defaultImg} alt="" />
    <input
        onChange={async(e) => {
            //creating a temp , local url for displaying purposes
            const url = URL.createObjectURL(e.target.files[0])
            setImg(url)


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
      onChange={(e) => {
        setFirstName(e.target.value)
      }}
        type="text"
        placeholder="First name"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
      onChange={(e) => {
        setLastName(e.target.value)
      }}
        type="text"
        placeholder="Last name"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
      onChange={(e) => {
        setDOB(e.target.value)
      }}
        type="date"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
      onChange={(e) => {
        setBio(e.target.value)
      }}
        placeholder="Bio"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
      />
    <button onClick={async() => {
        if(!firstName || !lastName || !DOB || !image || !bio)
        {
            toast.error("Please enter all the fields")
            return
        }
        let res = await axios.patch(baseUrl + "/profile/edit", {firstName, lastName, DOB, image, bio}, {withCredentials : true})
        if(res.status == 202)
        {
            console.log(res)
            // navigate("/home")
        }
        else
        {
            toast.error("Please Enter valid data")
        }
    }} className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
        Update Profile
      </button>
    </div>
    </>

  );
};

export default Profile;