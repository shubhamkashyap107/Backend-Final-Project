import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/constants'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'


const Connections = () => {
    const[selectValue, setSelectValue] = useState("my-connections")
    const[friends, setFriends] = useState([])
    const[requests, setRequests] = useState([])
    const dispatch = useDispatch()


    async function btnClickHandler(status, id)
    {
        const res = await axios.patch(baseUrl + `/connection/review/${status}/${id}`, {}, {withCredentials : true})
        if(res.status == 201)
        {
            setRequests(requests.filter((item) => {
                return item._id != id
            }))
        }
        
    }

    useEffect(() => {
      console.log("Connections wala UE")
        async function getData()
        {
           if(selectValue == "my-connections")
           {
                let res = await axios.get(baseUrl + "/user/connections", {withCredentials : true})
                setFriends(res.data)
                dispatch(addConnections(res.data))
                console.log(res.data)
           }
           else
           {
                let res = await axios.get(baseUrl + "/user/connection-requests", {withCredentials : true})
                setRequests(res.data)
                console.log(res.data)

           }
        }
        getData()
    }, [selectValue])

return (
    <div className="flex flex-col items-center w-full p-4">
      <select
        onChange={(e) => setSelectValue(e.target.value)}
        className="mb-4 p-2 border rounded-lg text-lg"
      >
        <option value="my-connections">My Connections</option>
        <option value="connections-requests">Connection Requests</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(selectValue === "my-connections" ? friends : requests).map((item, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-2xl p-4 w-80 flex flex-col items-center hover:scale-105 transition-transform"
          >
            <img
                onError={(e) => {
                    e.target.src = "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
                }}
              src={item.image}
              alt={item.firstName}
              className="w-32 h-32 object-cover rounded-full border-4 border-pink-500"
            />
            <div className="text-center mt-4">
              <h2 className="text-xl font-bold">{item.firstName} {item.lastName}</h2>
              <p className="text-gray-600">{item.bio}</p>
            </div>
                {selectValue === "my-connections" && (<Link to={`/chat/${item._id}`} className='bg-blue-700 text-white px-4 rounded py-2'>Chat</Link>)}
            {selectValue === "connections-requests" && (
              <div className="flex gap-4 mt-4">
                <button onClick={() => {
                    btnClickHandler("accepted", item._id)
                }} className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">Accept</button>
                <button onClick={() => {
                    btnClickHandler("rejected", item._id)
                }} className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

)
}

export default Connections