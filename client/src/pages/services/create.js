import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateServices() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/services/create', { title, description, minPrice, maxPrice }, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        console.log(res.data);
        navigate('/services');
      })
      .catch(err => console.error(err));
  }


  return (
    <div className="bg-text flex flex-col w-full lg:w-3/4 px-4 py-8 mx-auto rounded-lg border-2 my-5">
      <h2 className="mb-4 text-xl font-bold text-slate-950">
        Create a Service
      </h2>
      <form onSubmit={submitHandler}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-slate-950"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-slate-950 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              value={title}
              placeholder="Enter service title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Enter service description..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className='sm:col-span-2 flex flex-row justify-between gap-2'>
          <div className="sm:col-span-2 w-full">
            <label
              htmlFor="minPrice"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              className="bg-gray-50 border border-gray-300 text-slate-950 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              value={minPrice}
              placeholder="Enter min price"
              onChange={(e) => setMinPrice(e.target.valueAsNumber)}
              required
            />
          </div>
          <div className="sm:col-span-2 w-full">
            <label
              htmlFor="maxPrice"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              className="bg-gray-50 border border-gray-300 text-slate-950 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              value={maxPrice}
              placeholder="Enter max price"
              onChange={(e) => setMaxPrice(e.target.valueAsNumber)}
              required
            />
            </div>
            </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-10">
          <button
            type="submit"
            className="text-text bg-primary hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateServices