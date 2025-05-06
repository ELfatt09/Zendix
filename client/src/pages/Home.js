import { useEffect } from 'react'
import { useAuth } from '../authContext'
import { NavLink } from 'react-router-dom'


function Home() {
  const { user } = useAuth()
  useEffect(() => {
    console.log(user)
    console.log(user?.username)
  }, [user])

  return (
    <section className="bg-white">
      <div className="w-full flex flex-row items-center h-min-screen">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <h1 className="text-center md:text-start text-7xl leading-normal font-bold text-slate-950 max-w-xl">
            Dari <span className='text-violet-600'>Desain</span> hingga <span className='text-violet-600'>Kode</span>, Semua di <span className="bg-orange-400 text-orange-100 px-3 rounded-md">Zendix</span>
          </h1>
          <div className="flex items-center mt-10 justify-center max-w-xl">
          <p className="text-xl w-2/3 font-light text-slate-950 max-w-xl leading-relaxed">
            Temukan kolaborator teknologi & desain dalam hitungan menit.
            </p>
            <div className='w-1/3 flex items-center justify-center'>
            <NavLink to="/auth/register" className="text-center bg-violet-600 text-white px-5 py-3 font-bold rounded-md  hover:bg-orange-400 hover:scale-105 transition ease-in-out duration-300">Register Now</NavLink>
            </div>          </div>
        </div>
        <div className="w-0 md:w-1/3 min-h-screen h-full bg-violet-600">

        </div>
      </div>
    </section>
  )
}

export default Home