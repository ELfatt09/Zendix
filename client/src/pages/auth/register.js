import { useState, useEffect } from 'react'
import { useAuth } from '../../authContext'
import { NavLink } from 'react-router-dom';
import Loading from '../../layout/loading';
function Register() {
  const { register, error, loading } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [checking, setChecking] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    register(email, password, confirmPassword, fullname)
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
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-primary/30 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl">
              Create an account
            </h1>
            <form className="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-text">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-secondary/50 text-text text-sm rounded-lg focus:border-accent block w-full p-2.5"
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
                  className="bg-secondary/50 text-text text-sm rounded-lg focus:border-accent block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='mt-6'>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-text">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-secondary/50 text-text text-sm rounded-lg focus:border-accent block w-full p-2.5"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className='mt-6'>
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-text">
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="bg-secondary/50 text-text text-sm rounded-lg focus:border-accent block w-full p-2.5"
                  placeholder="fullname"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="mt-10 mb-6 w-full text-center bg-accent text-text px-5 py-3 font-bold rounded-md hover:bg-accent/70 transition ease-in-out duration-300"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-text">
                Already have an account? <NavLink to="/auth/login" className="font-medium text-accent hover:underline">Login here</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register

