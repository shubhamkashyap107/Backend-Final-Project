import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'


const ProtectedRoutes = () => {
    const navigate = useNavigate()

    const userData = useSelector(store => store.user)

    return userData.username ? <><Navbar /><Outlet /></> : <Navigate to={"/auth"} />
}

export default ProtectedRoutes