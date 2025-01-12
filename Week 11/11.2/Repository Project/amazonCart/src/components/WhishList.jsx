import React from 'react'
import Header from "./Header"
import Sidebar from './Sidebar'

function WhishList() {
  return (
    <div>
      <Header/>
      <div className='py-10 p-5 m-5' >
        <Sidebar/>
        <main  className='border border-white-600 m-8'  >

        </main>
      </div>
    </div>
  )
}

export default WhishList
