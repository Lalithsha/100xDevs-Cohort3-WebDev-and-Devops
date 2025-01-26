import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import {faBars, faCog, faCreditCard, faHome, faTimes, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    const [activeItem, setActiveItem] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
    
  const menuItems=[
    {name:'Home', icon:faHome},
    {name:'Webinars', icon:faUsers},
    {name:'Billing', icon: faCreditCard},
    {name:'User Managment', icon: faUser},
    {name:'Settings', icon: faCog}
  ]
  
  return (
    <div className='relative' >
        <button className='lg:hidden p-4 text-gray-600 ' onClick={()=> setIsSidebarOpen((curr)=>!curr) } >
            <FontAwesomeIcon icon={isSidebarOpen ?faTimes:faBars} className='w-6 h-6'   />
        </button>

        <div className={`flex flex-col h-full w-[18rem] fixed top-0 left-0 bg-white border-gray-200 border-r-2 py-6 pl-6 pr-6
                        lg:static transform ${isSidebarOpen ? 'translate-x-0':'-translate-x-full'} lg:translate-x-0 
                        transition-transform duration-300 ease-in-out z-20`} >

            <div className='mb-10 justify-between flex items-center' >
                <button className='items-center py-2 px-3 text-sm rounded-lg bg-[#00264F] text-white font-semibold'>
                    Webinar<span className='text-gray-400 text-sm'>.gg</span>
                </button>
                <img src="/image.avif" alt="sample image" className='w-10 h-10 rounded-lg' />
            </div>

        <nav className='space-y-6 text-gray text-sm' >
            {
                menuItems.map((item,index)=>{
                    return (
                        <div key={index} onClick={()=>{
                            setActiveItem(item.name)
                            setIsSidebarOpen(false)
                        }} className={`flex flex-row justify-between items-center py-3 px-3 rounded-lg cursor-pointer 
                            ${activeItem===item.name ?" text-blue-900 bg-[#E2E6EA] font-semibold ":"text-gray-400" }`} >
                            <span>{item.name}</span>
                            <a href="#" className='flex  justify-center space-x-3' >
                            <FontAwesomeIcon icon={item.icon} className={`w-6 h-6 ${activeItem===item.name?"text-blue-900":"text-gray-400"}`} />
                            </a>
                        </div>
                    )
                })
            }
        </nav>
        </div>
        
        {isSidebarOpen && (
            <div className='fixed inset-0 bg-black opacity-50 z-10 lg:hidden' onClick={()=>setIsSidebarOpen(false)}
            ></div>
        )}
        
    </div>
  )
}

export default Sidebar
