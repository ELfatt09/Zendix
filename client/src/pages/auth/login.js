import { useState } from 'react'
import { useAuth } from '../../authContext'
import { NavLink } from 'react-router-dom'
function Login() {
  const { login, error, message } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-violet-600 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-950 ">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-slate-400 text-slate-950 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-950 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-slate-400 text-slate-950 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
        
            
              {error && <p className="text-red-600">{error}</p>}
              {message && <p className="text-green-600">{message}</p>}
              <button
                type="submit"
                className="w-full text-center bg-violet-600 text-white px-5 py-3 font-bold rounded-md  hover:bg-orange-400 hover:scale-105 transition ease-in-out duration-300"              >
                Sign in to your account
              </button>
              <p className="text-sm font-light text-slate-700">
                Dont have an account yet? <NavLink to="/auth/register" className="font-medium text-orange-400 hover:underline">Register here</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login