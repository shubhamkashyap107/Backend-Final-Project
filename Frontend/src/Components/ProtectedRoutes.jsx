import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import Loader from './Loader'
import { addConnections } from '../utils/connectionSlice'


const ProtectedRoutes = () => {

    const nav = useNavigate()
    const userData = useSelector(store => store.user)
    const dispatch = useDispatch()



    useEffect(() => {

        const getUserData = async() => {
           try {
            let res = await axios.get(baseUrl + "/profile", {withCredentials : true})
            let res2 = await axios.get(baseUrl + "/user/connections", {withCredentials : true})
            dispatch(addUser(res.data))
            dispatch(addConnections(res2.data))
           } catch (error) {
            nav("/auth")
           }
        }

        getUserData()
    }, [])


    if(!userData.username)
    {
        return <Loader />
    }




    return userData.username ? <><Navbar /><Outlet /></> : <Navigate to={"/auth"} />
}

export default ProtectedRoutes