import ProfileCard from './ProfileCard'
import WebinarList from './WebinarList'
import MeetButtons from "./MeetButtons"

function Dashboard() {
  return (
    <div className='bg-white w-full ' >
        <img src="https://images.unsplash.com/photo-1652267113336-8bba86c7cc44?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="random image"
                    className='w-full h-[20vh] object-cover' />
            <div className='flex flex-col items-center lg:items-start lg:flex-row p-8 gap-8' >
                <ProfileCard/>
                <div className='w-full' >
                    <h3 className='text-gray-800 text-lg md:text-xl font-medium' >Monday, 14th October</h3>
                    <h1 className='text-xl md:text-3xl mt-5 lg:mb-10 text-[#0D2149] font-bold' >Good Morning, Lalith! 👋</h1>
                    <div className='flex flex-row items-center justify-start gap-8 -mt-5'>
                      <WebinarList/>
                      <MeetButtons/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Dashboard

