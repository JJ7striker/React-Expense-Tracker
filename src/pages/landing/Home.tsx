import LandingImg1 from "../../../public/LandingImg1.png"

const Home = () => {
  return (
    <div className='px-3 py-5'>
      <section className='w-full h-auto flex flex-col md:flex-row items-start gap-5 md:gap-0 pt-8'>
        <div className='flex-1 w-full px-6 pt-7 gap-6 flex flex-col'>
          <h2 className="md:text-5xl text-4xl font-bold text-blue-600 text-center md:text-left">TRACK. ANALYZE. TAKE CONTROL</h2>
          <p className="text-lg md:text-xl px-4 font-medium">A modern expense tracker that helps you manage your money, reach your goals and build better habits</p>

          <div className="w-full flex items-center flex-col md:flex-row gap-4">
            <button className="btn flex-1 bg-blue-600 px-3 py-2 rounded-md text-sm md:text-base text-white font-medium hover:bg-white hover:text-black transition-all duration-200 ease-in-out">See Demo</button>
            <button className="btn flex-1 bg-blue-600 px-3 py-2 rounded-md text-sm md:text-base text-white font-medium hover:bg-white hover:text-black transition-all duration-200 ease-in-out">Get Started Free</button>
          </div>
        </div>
        <img src={LandingImg1} alt="Landing Image 1" width={200} height={300} className="object-contain w-full md:w-2/5 rounded-md " />
        </section> 
    </div>
  )
}

export default Home