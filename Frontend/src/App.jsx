import React from 'react'
import {Routes, Route} from "react-router-dom"
import Auth from './Components/Auth'
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';
import Home from './Components/Home';
import MyProfile from './Components/MyProfile';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Connections from './Components/Connections';
import Chat from './Components/Chat';
import EditPassword from './Components/EditPassword';



const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
          <Route path='/auth' element={<Auth />} />

    
          <Route path='/' element={<ProtectedRoutes />}>

            <Route path='/profile/edit' element={<Profile />} />
            <Route path='/profile/edit/password' element={<EditPassword />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/connections' element={<Connections />} />
            <Route path={`/chat/:receiverId`} element={<Chat />} />

        
          </Route>
   
      </Routes>
    </div>
  )
}

export default App