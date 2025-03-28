import React, { useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { addFeed } from '../utils/feedSlice'
import DisplayCard from './DisplayCard'
import{useState} from "react"

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(store => store.user)
  const[feedData, setFeedData] = useState([])
  let limit = 3



  useEffect(() => {



    if(!userData.firstName || !userData.lastName || !userData.DOB || !userData.bio || !userData.image)
      {
        navigate("/profile/edit")
        toast.error("Please complete your profile")
        return
      }
    async function getData() {
     
      let res = await axios.get(baseUrl + `/user?limit=${limit}&skip=0`, {withCredentials : true})
      setFeedData(res.data)
      console.log(res.data)
    }
    if(feedData.length == 0)
    {
      getData()

    }
  }, [feedData])

  return !feedData.length ? <h1>No users found</h1> : <div>
  <Navbar />

  {feedData.length && <DisplayCard feedData={feedData} setFeedData={setFeedData} id={feedData[0]._id} lastName={feedData[0].lastName} bio={feedData[0].bio} image={feedData[0].image} DOB={feedData[0].DOB} firstName={feedData[0].firstName} />}


</div>
}

export default Home