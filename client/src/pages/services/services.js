import { useEffect, useState } from 'react'
import axios from 'axios';

function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/services/all')
      .then(res => {
      console.log(res.data);
      setServices(res.data.services);
      })
    .catch(err => console.error(err));
  }, [])
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full px-2 lg:px-10 mt-10 gap-2'> 
        
        {services.map((service, index) => (
        <div className='w-full rounded-3xl border p-2 min-h-52 shadow-lg bg-text'>
          <div className='w-full bg-orange-100 rounded-xl flex flex-col items-start justify-between p-4 min-h-64'>
            <div className='w-full flex flex-row items-center justify-between'>
                <div className='bg-text text-slate-950 px-3 py-2 rounded-3xl text-md font-semibold'>{service.user.PersonalInfo.Job.Name}</div>
              <button className='bg-accent hover:bg-orange-500 transition ease-in-out duration-300 text-text px-3 py-2 rounded-3xl text-md font-semibold'>save</button>
            </div>
            <div className='w-full flex flex-row items-center space-x-4'>
              <div className='w-2/3 flex flex-col'>
                  <h3 className='text-md font-medium text-slate-800'>{ service.user.PersonalInfo.Fullname}</h3>
                  <h1 className='text-2xl font-semibold text-slate-800'>{ service.Title}</h1>
              </div>
              <div className='w-1/3 flex items-end justify-center'>
                <img className='w-12 h-12 rounded-full' src={"http://localhost:8080" + service.user.PersonalInfo.PfpPath} alt='Profile' />
              </div>
            </div>
            <p className='text-sm text-gray-700 mt-4'>{service.Description.slice(0, 100)}...</p>
          </div>  
          <div className='w-full flex flex-row items-center justify-between mt-4 px-5 my-4'>
            <div className='flex flex-col'>
              <p className='text-sm tracking-tight font-normal text-slate-950'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(service.MinPrice)} - {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(service.MaxPrice)}</p>
              <p className='text-xs tracking-tight font-normal text-slate-700'>Indonesia</p>
            </div>
            <button className='bg-slate-950 hover:bg-orange-600 transition ease-in-out duration-300 text-text px-4 py-2  font-bold rounded-3xl'>Details</button>
          </div>
          </div>
                ))}
      </div>
    </section>
  )
}

export default Services
