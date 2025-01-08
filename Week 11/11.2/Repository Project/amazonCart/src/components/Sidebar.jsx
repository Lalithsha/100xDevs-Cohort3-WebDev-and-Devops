import React from 'react'

function Sidebar() {
  return (
    <div className='flex flex-col items-center h-full left-0 fixed rounded-md border border-white-600 w-[256px]' >
    <div className='bg-gray-300 border bg-opacity-25 p-2 w-3/4 rounded-md mt-5' >
      <h1 className='font-bold text-lg ' >Your Wish List</h1>
      <span className='' >Default List</span>
    </div>
    </div>
  )
}

export default Sidebar
