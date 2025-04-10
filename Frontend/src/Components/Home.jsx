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
  const[isDbEmpty, setIsDbEmpty] = useState(false)
  let limit = 3



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
  }, [feedData])

  return !feedData.length ? <h1>No users found</h1> : <div>


  {feedData.length && <DisplayCard feedData={feedData} setFeedData={setFeedData} id={feedData[0]._id} lastName={feedData[0].lastName} bio={feedData[0].bio} image={feedData[0].image} DOB={feedData[0].DOB} firstName={feedData[0].firstName} />}


</div>
}

export default Home