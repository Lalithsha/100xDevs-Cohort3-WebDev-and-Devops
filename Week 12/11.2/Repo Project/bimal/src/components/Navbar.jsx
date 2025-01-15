
function Navbar() {
  return (
    <nav className='flex flex-row items-center justify-between mx-auto px-2'>
        <a href="/">
      <h1 className="tracking-tight text-orange-600 text-2xl" >
        bimal
      </h1>
      </a>

      <div className="flex items-center   gap-4"  >
        <a href="/products" >
            Products
        </a>
       
            <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg" >
                Login
            </button>
       
      </div>
    </nav>
  )
}

export default Navbar
