/* export default function Header(){
    return (
        <nav className="z-50 bg-red-800">
      <div className="h-10vh flex justify-between gap-10 lg:py-5 px-20  py-20 border-b flex-row items-center">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-pink-500 bg-red-800"> BOWANA </h2>
        </div>
        <div>

        <ul className="flex items-center space-x-8">
            <li className="hover:text-pink-500 cursor-pointer">Home</li>
            <li className="hover:text-pink-500 cursor-pointer">Blogs</li>
            <li className="hover:text-pink-500 cursor-pointer">Services</li>
            <li className="hover:text-pink-500 cursor-pointer">Book An Appointment</li>
            <li className="hover:text-pink-500 cursor-pointer">Contact Us</li>
          </ul>
          
        </div>
      </div>
    </nav>
    )
} */


export default function Header() {
  return (
    <nav className="w-full bg-white border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          
            {/* Logo */}
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-blue-600">ALLEN</h2>
                </div>
  
                {/* Navigation Links */}
                <div className="flex-1 flex items-center justify-start ml-16">
                        <ul className="flex items-center space-x-8">
                        <li className="cursor-pointer hover:text-blue-600">Courses</li>
                        <li className="cursor-pointer hover:text-blue-600 flex items-center">
                            Test Series
                            <span className="ml-1 text-xs bg-orange-400 text-white px-1 rounded">NEW</span>
                        </li>
                        <li className="cursor-pointer hover:text-blue-600">Scholarships</li>
                        <li className="cursor-pointer hover:text-blue-600">Results</li>
                        <li className="cursor-pointer hover:text-blue-600">Study Materials</li>
                        <li className="cursor-pointer hover:text-blue-600">About us</li>
                        </ul>
                </div>
  
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Talk to us
                    </button>
                    <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                    Login
                    </button>
            </div>
        </div>
      </nav>
  );
}