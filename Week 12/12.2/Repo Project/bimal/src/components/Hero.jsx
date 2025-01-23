import heroImage from '../assets/hero-image.png'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center max-w-7xl mx-auto pt-12 px-4' >
      <div className='flex flex-col items-center justify-center pt-8' >
        <h1 className="md:text-6xl text-4xl font-extrabold text-orange-950 tracking-tighter" >
            Bolo Zubaan <span className='text-orange-50' >Canceri</span>
        </h1>
        <p className="md:text-xl text-lg text-orange-950" >
        More you eats, sooner you dies
        </p>
      </div>
      <img src={heroImage} alt="Bolo Zubaan Canceri" className='w[80%] md:w-[40%] h-full sticky top-0 right-0'  width={500}
        height={500}  />
    </div>
  )
}

export default Hero
