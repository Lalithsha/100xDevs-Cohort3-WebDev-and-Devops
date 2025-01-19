/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'

function App() {
  

  return (
    <>
    {/* <div className='grid grid-cols-12'  >
      <div className=' sm:col-span-12 col-span-4 bg-red-400 ' >
        Hi
      </div>
      <div className='bg-blue-400 sm:col-span-12 col-span-6' > 
        Hi
      </div>
      <div className='bg-orange-400 sm:col-span-12 col-span-2' > 
        Hi
      </div>
    </div> */}


    <div className='min-h-screen bg-blue-900 flex flex-col justify-center items-center' >
      <div className='py-9 flex flex-col justify-center items-center gap-12' >
        <h1 className='text-cyan-600 font-semibold text-lg' >
          Webinar<span className='text-white'>.gg</span>
        </h1>
        <h2 className='text-white  font-bold' >
          Verify you age
        </h2>
      </div>
      <p className='text-sm text-white'>
        Please confirm your birth year. This data will not be stored.
      </p>
      <div className="gap-8 flex flex-col items-center justify-center" >
      <input type='number' className='bg-blue-200 text-white p-2 rounded-lg mt-4 opacity-15 border-spacing-2 ' placeholder='Your birth Birth'>
      </input>
      <button className='bg-slate-300 text-white py-2 px-16 rounded-lg hover:bg-cyan-700' >Continue</button>
    </div>
    </div>
     
    </>
  )
}

export default App
