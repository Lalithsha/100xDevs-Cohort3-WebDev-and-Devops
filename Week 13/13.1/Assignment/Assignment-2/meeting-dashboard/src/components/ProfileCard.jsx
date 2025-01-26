import React from 'react'

function ProfileCard() {
  return (
    <div className='py-12 px-3 bg-white rounded-xl items-center flex flex-col shadow-lg h-fit w-64 -mt-20 ' >
      <img src="/image.avif" alt="Profile"
            className='w-24 h-24 rounded-lg object-cover' />
            <h2 className='text-lg font-bold pt-5 ' >Lalith Sharma</h2>
            <h2 className='text-gray-600 text-sm pt-3 pb-1 ' >lalithsharma.mech@gmail.com</h2>
            <p className='text-gray-600 text-sm ' >9040433333</p>
            <p className='text-gray-500 text-sm pt-3' >Chennai, India</p>
    </div>
  )
}

export default ProfileCard
