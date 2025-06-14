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
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-primary/30 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-text ">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-secondary/50 text-text text-sm rounded-lg focus:border-accent block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mt-6'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-text">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-secondary/50 text-text text-sm rounded-lg focus:border-accent block w-full p-2.5 "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
        
            
              {error && <p className="text-red-600">{error}</p>}
              {message && <p className="text-green-600">{message}</p>}
              <button
                type="submit"
                className="mt-10 mb-6 w-full text-center bg-accent text-text px-5 py-3 font-bold rounded-md  hover:bg-accent/70 transition ease-in-out duration-300"              >
                Sign in to your account
              </button>
              <p className="text-sm font-light text-text">
                Dont have an account yet? <NavLink to="/auth/register" className="font-medium text-accent hover:underline">Register here</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login