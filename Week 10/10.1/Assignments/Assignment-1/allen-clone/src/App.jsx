// import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' />
            <Outlet/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
