import React from 'react'
import {Routes, Route} from "react-router-dom"
import Auth from './Components/Auth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App