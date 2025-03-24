import React from 'react'
import {Routes, Route} from "react-router-dom"
import Auth from './Components/Auth'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App