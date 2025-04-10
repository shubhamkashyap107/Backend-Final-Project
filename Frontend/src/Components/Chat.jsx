import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client"
import { baseUrl } from '../utils/constants';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


function connectToSocket()
{
    return io(baseUrl)
}

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const socket = useRef()
  const{receiverId} = useParams()
  const userSliceData = useSelector(store => store.user)
  const connectionSlice = useSelector(store => store.connection)
  const currUser = connectionSlice.find((item) => {
    return item._id == receiverId
  })
  console.log(userSliceData._id, messages)
  

  function btnClickHandler()
  {
    if(input.length == 0)
    {
        toast.error("Please Enter your msg")
        return
    }
    socket.current.emit("sendMsg", {message : input, senderId : userSliceData._id, receiverId})
    setInput("")
  }

  useEffect(() => {
    socket.current = connectToSocket()
    socket.current.emit("joinRoom", {receiverId, senderId : userSliceData._id})
    socket.current.on("receiveMsg", ({message, senderId}) => {
        setMessages((prev) => [...prev, {text : message, sender : senderId}])
    })

    return () => {
        socket.current.disconnect()
    }
  }, [])

  useEffect(() => {
    async function getChats()
    {
      const res = await axios.get(baseUrl + "/chat/" + receiverId, {withCredentials : true})
      let foundMsgs = res?.data?.messages?.map((item) => {
        const{text, senderId} = item
        return {
          text, sender : senderId
        }
      })
      // console.log(foundMsgs)
      setMessages(foundMsgs)

      
    }
    getChats()
  }, [])


  return (
    <div className='w-full max-w-2xl mx-auto mt-5 bg-white rounded-lg flex flex-col h-[80vh] shadow-lg'>

    {/* Top Bar */}
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <img
        src={currUser.image }
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <h2 className="font-semibold text-gray-800">
        {currUser.firstName + " " + currUser.lastName}
      </h2>
    </div>
  
    {/* Messages */}
    <div className='flex flex-col h-[70vh] overflow-y-auto p-4 space-y-3 bg-gray-50'>
  {
    messages.map((item, idx) => {
      const isSender = userSliceData._id === item.sender
      return (
        <div
          key={idx}
          className={`
            max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md 
            ${isSender
              ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white self-end rounded-br-none'
              : 'bg-white text-gray-800 self-start border border-gray-200 rounded-bl-none'}
          `}
        >
          {item.text}
        </div>
      )
    })
  }
</div>

  
    {/* Input */}
    <div className='border-t border-gray-200 p-3 flex items-center gap-2'>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        type="text"
        placeholder="Type your message..."
        className='flex-1 border border-gray-300 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-400'
      />
      <button
        onClick={btnClickHandler}
        className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition'
      >
        Send
      </button>
    </div>
    
  </div>
  
  );
};

export default Chat;
