import { useState, useEffect } from 'react'
import { useAuth } from '../../authContext'
import { NavLink } from 'react-router-dom';
import Loading from '../../layout/loading';
function Register() {
  const { register, error, loading } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [checking, setChecking] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    register(email, password, confirmPassword, username)
  }
  useEffect(() => {
    // Ketika loading selesai, kita berhenti checking
    if (!loading) {
      setChecking(false);
    }
  }, [loading]);

  if (checking) {
    return <Loading />
  }




  return (
    <section className="bg-white ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-violet-600 md:text-2xl ">
          Create an account
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
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-950 ">
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
              <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-950 ">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-slate-400 text-slate-950 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-950 ">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-slate-400 text-slate-950 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full text-center bg-violet-600 text-white px-5 py-3 font-bold rounded-md  hover:bg-orange-400 hover:scale-105 transition ease-in-out duration-300"              
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <NavLink to="/auth/login" className="font-medium text-orange-400 hover:underline">Login here</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register

