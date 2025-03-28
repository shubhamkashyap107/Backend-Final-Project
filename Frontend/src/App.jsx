import React from 'react'
import {Routes, Route} from "react-router-dom"
import Auth from './Components/Auth'
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';
import Home from './Components/Home';
import MyProfile from './Components/MyProfile';



const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile/edit' element={<Profile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<MyProfile />} />
      </Routes>
    </div>
  )
}

export default App