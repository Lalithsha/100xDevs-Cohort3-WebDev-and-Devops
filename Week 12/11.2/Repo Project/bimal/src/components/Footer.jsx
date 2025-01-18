function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center px-4 py-4 gap-4 " >
    <div className="flex flex-col items-center justify-center max-w-sm gap-2" >
        <a href="/" >
            <h1 className="text-orange-50 text-2xl font-extrabold tracking-tighter hover:text-orange-700 transition-all duration-300" >
                bimal
            </h1>
        </a>
            <p className="text-sm text-orange-50 text-center" >
            Bimal cannot be held accountable for any health issues, including cancer, that may arise from consumption.
            </p>
    </div>
        <p className="text-sm text-orange-100" >
            &copy;{new Date().getFullYear()} Bolo Zubaan Canceri. All rights reserved.
        </p>
    </footer>
  )
}

export default Footer
