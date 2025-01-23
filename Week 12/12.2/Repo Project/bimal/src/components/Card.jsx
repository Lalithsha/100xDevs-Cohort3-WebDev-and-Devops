import cardImage from '../assets/card-image.png'
function Card() {
  return (
    <div className="group flex flex-col md:flex-row justify-center items-center w-full h-full bg-orange-100 rounded-2xl gap-12 p-6" >
      <img src={cardImage} alt="Card Image" 
        width={270} height={270}
        className='group-hover:-translate-y-1 transition-all duration-300 object-contain'  />
      <div className='flex flex-col gap-6' >
        <div className='flex flex-col text-orange-950' >
            <h3 className='lg:text-2xl text-xl font-semibold tracking-tighter' >
                <span className='text-orange-600'>bimal</span> Elachi
            </h3>
            <p className="text-sm md:text-lg md:max-w-2xl max-w-72">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet enim nec orci lacinia pellentesque.
            </p>
        </div>

        <div className='flex items-center gap-2' >
            <button className='bg-orange-600 text-white rounded-lg py-2 px-4 hover:bg-orange-700 trasition-all duration-300' >
                Die Now
            </button>
            <button className='py-2 px-4 text-orange-950 bg-white rounded-lg hover:bg-orange-50/50 trasition-all duration-300'>
                Die Later
            </button>
        </div>
      </div>
    </div>
  )
}

export default Card
