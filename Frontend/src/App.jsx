import React from 'react'
import {Routes, Route} from "react-router-dom"
import Auth from './Components/Auth'
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App