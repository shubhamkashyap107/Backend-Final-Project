import React, { useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DisplayCard from './DisplayCard'
import{useState} from "react"

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(store => store.user)
  const[feedData, setFeedData] = useState([])
  console.log(feedData)
  const[isDbEmpty, setIsDbEmpty] = useState(false)
  let limit = 3


  useEffect(() => {
    async function getData() {
     
      let res = await axios.get(baseUrl + `/user?limit=${limit}`, {withCredentials : true})
      setFeedData(res.data)
      if(res.data.length == 0)
      {
        setIsDbEmpty(true)
      }
      console.log(res.data)
    }
    if(feedData.length == 0)
    {
      getData()
    }
  }, [])


  useEffect(() => {

    if(isDbEmpty)
    {
      return
    }
  

    if(!userData.firstName || !userData.lastName || !userData.DOB || !userData.bio || !userData.image)
      {
        navigate("/profile/edit")
        toast.error("Please complete your profile")
        return
      }
    

      const intervalID = setInterval(() => {
        console.log("API Called")
        async function getData() {
     
          let res = await axios.get(baseUrl + `/user?limit=${limit}`, {withCredentials : true})
          setFeedData(res.data)
          if(res.data.length == 0)
          {
            setIsDbEmpty(true)
          }
          console.log(res.data)
        }
        if(feedData.length == 0)
        {
          getData()
        }
      }, 30000)


      return () => {
        clearInterval(intervalID)
      }
  }, [feedData])

  return !feedData.length ? (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-600"> No Users Found</h1>
        <p className="text-sm text-gray-500 mt-2">Try again later</p>
      </div>
    </div>
  ) : (
    <div>
      {feedData.length && (
        <DisplayCard
          feedData={feedData}
          setFeedData={setFeedData}
          id={feedData[0]._id}
          lastName={feedData[0].lastName}
          bio={feedData[0].bio}
          image={feedData[0].image}
          DOB={feedData[0].DOB}
          firstName={feedData[0].firstName}
        />
      )}
    </div>
  );
  
}

export default Home