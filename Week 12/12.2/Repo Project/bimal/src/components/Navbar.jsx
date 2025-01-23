
function Navbar() {
  return (
    <nav className='flex flex-row items-center justify-between mx-auto px-4 max-w-7xl py-4 lg:px-20 sm:px-16'>
        <a href="/">
      <h1 className="tracking-tight text-orange-600 text-2xl font-extrabold" >
        bimal
      </h1>
      </a>

      <div className="flex items-center gap-4"  >
        <a href="/products" className="text-orange-950 font-medium tracking-tighter hover:text-orange-900 trnasition-all duration-300" >
            Products
        </a>
       
          <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all duration-300" >
              Login
          </button>
       
      </div>
    </nav>
  )
}

export default Navbar
