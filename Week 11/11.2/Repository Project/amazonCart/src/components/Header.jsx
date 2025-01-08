import React from 'react'
import { ShoppingCart } from 'lucide-react';

function Header() {
  return (
    <header className='flex flex-row justify-between text-white bg-gray-800 items-center top-0 left-0 right-0 fixed py-4  ' >
      <h1 className='ml-10 text-xl font-bold' >
        Amazon.in
      </h1>
    <div className='flex flex-row content-between' >
      <span className='mr-10  ' >Hello, user</span>
      {/* <span></span> */}
      <ShoppingCart  />
      </div>
    </header>
  )
}

export default Header
