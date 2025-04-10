import axios from 'axios';
import React from 'react'
import { baseUrl } from '../utils/constants';
import { useDispatch } from 'react-redux';


const DisplayCard = ({image, firstName, lastName, bio, DOB, id, feedData, setFeedData}) => {

    const dispatch = useDispatch()

    async function btnClickHandler(status, id)
    {
        const res = await axios.post(baseUrl + `/connection/send/${status}/${id}`, {}, {withCredentials : true})
        if(res.status == 201)
        {
            const fa = feedData.filter((item) => {
                return item._id != id
            })
            setFeedData(fa)
        }
    }

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
    <div className="bg-white shadow-xl mx-auto mt-20 rounded-3xl p-6 max-w-sm text-center border border-gray-300  hover:shadow-2xl">
    <div className="relative">
        <img 
            onError={(e) => {
                e.target.src="https://media.istockphoto.com/id/1345109915/photo/young-beautiful-woman-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=aSsoOe4Jr1EchEp4eoso_lNGKJ9QT8U_FnPRIcJJEa0="
            }}
            src={image} 
            alt={firstName + " " + lastName} 
            className="w-36 h-36 object-cover rounded-full mx-auto border-4 border-pink-500" 
        />
    </div>
    <h2 className="text-2xl font-bold mt-4 text-gray-800">{firstName + " " + lastName}, {calculateAge(DOB)}</h2>
    <p className="text-gray-600 mt-2 text-sm px-6">{bio}</p>
    <div className="mt-6 flex justify-center gap-6">
        <button onClick={() => {
            btnClickHandler("interested", id)
        }} className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-full shadow-md text-lg font-medium hover:opacity-90">❤️ Like</button>
        <button onClick={() => {
            btnClickHandler("ignored", id)
        }} className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full shadow-md text-lg font-medium hover:bg-gray-400">❌ Skip</button>
    </div>
</div>
  )
}

export default DisplayCard