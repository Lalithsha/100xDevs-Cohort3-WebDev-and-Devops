import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faVideo, faPlus } from '@fortawesome/free-solid-svg-icons';

function MeetButton() {
  return (
    <div className='lg:w-[40%] shadow-lg bg-white h-fit p-6 space-x-4 rounded-lg w-full border-2 border-gray-100 -translate-y-13' >
      <div className='flex flex-row justify-between items-center gap-6' >
        <div className='flex flex-col  items-center' >
          <button className='bg-[#3EDACB] text-blue-950 rounded-lg flex items-center justify-center w-12 h-12 p-4 ' >
            <FontAwesomeIcon icon={faCalendar} className='w-5 h-5' />
          </button>
          <h4 className='md:text-xs text-xs font-semibold leading-tighter my-2'>Schedule a Webinar</h4>
        </div>
        <div className='flex flex-col content-center justify-items-center items-center' >
        <button className='bg-[#3EDACB] text-blue-950 rounded-lg flex items-center justify-center w-12 h-12 p-4' >
            <FontAwesomeIcon icon={faPlus} className='w-5 h-5' />
        </button>
          <h4 className='md:text-xs text-xs font-semibold text-center my-2'>Join a Webinar</h4>
      </div>
      </div>
      <div className='flex flex-row justify-between items-center gap-6 pt-6 ' >
      <div className='flex flex-col items-center' >
      <button className='bg-[#3EDACB] text-blue-950 rounded-lg flex items-center content-center justify-center w-12 h-12 p-4' >
          <FontAwesomeIcon icon={faVideo} className='w-5 h-5' />
        </button>
          <h4 className='md:text-xs text-xs font-semibold leading-tighter items-center my-2'>Open Recording</h4>
      </div>
      </div>
    </div>
  )
}

export default MeetButton
