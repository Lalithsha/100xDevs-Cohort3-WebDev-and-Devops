// import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function Courses(){
  return (
    <div>
      <h1> neet course </h1>
    </div>
  )
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

    {/* <Header/> */}
    
    <BrowserRouter>
      <Routes>
        <Route index element={<Header/>}  />
        <Route path='/neet' element={<Layout/>}>{/* This make sure that it's child route starts with neet */}
        <Route path='/neet/courses' element={<Courses/>} />
        <Route path="/neet/test-series" element={<TestSeries />} />
        <Route path="/neet/Scholarships" element={<Scholarships />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

/* {/* <Outlet/>  */

function TestSeries(){
  return (
    <div>
      <h1> Need online test series</h1>
    </div>
  )
}
function Scholarships(){
  return (
    <div>
      <h1> adsat-register </h1>
    </div>
  )
}

function Layout(){
  return (
    <>
    {/* <Header></Header>
    <div>body</div>
    <div>footer</div> */}
    <Outlet/> {/* Outlet is used that in the browser router the element passed inside the route will be added here (children will be displayed here)  */}
    </>
  )
}

export default App
