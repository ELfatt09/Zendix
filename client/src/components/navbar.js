import { useState } from 'react'
import { useAuth } from '../authContext'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const { logout, user, auth } = useAuth()

  const [openMenu, setOpenMenu] = useState(false)

  return (
    <nav class="bg-white whitespace-nowrap shadow-lg sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto p-4">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.svg" class="h-8" alt="Logo" />
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {auth ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-slate-200 rounded-full md:me-0 0"
                  id="user-menu-button"
                  aria-expanded={openMenu}
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.pfpPath}
                    alt=""
                  />
                </button>
                <div
                  className={`z-50 ${openMenu ? 'absolute' : 'hidden'} my-4 text-base list-none bg-white border border-violet-600 divide-y divide-gray-300 rounded-lg shadow-sm top-12 right-4 w-44`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-base text-violet-600 font-semibold ">{user?.username}</span>
                    <span className="block text-xs text-gray-500 truncate dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <NavLink
                        to="/user/edit"
                        className="text-center block px-4 py-2 text-sm text-gray-700 hover:text-violet-600 font-semibold hover:bg-slate-100 "
                      >
                        Edit Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className=" w-full text-center block px-4 py-2 text-sm text-gray-700 hover:text-violet-600 font-semibold hover:bg-slate-100 "
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                                <NavLink to="/auth/login"  className="transition ease-in-out duration-300 text-violet-600 px-4 hover:text-slate-950 hover:border-b-[3px] hover:border-orange-400 font-semibold" aria-current="page">Login</NavLink>

                                <NavLink to="/auth/register"  className="transition ease-in-out duration-300 text-violet-600 px-4 hover:text-slate-950 hover:border-b-[3px] hover:border-orange-400 font-semibold" aria-current="page">Register</NavLink>

              </>
            )}
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <NavLink to="/"  className="transition ease-in-out duration-300 text-violet-600 px-4 hover:text-slate-950 hover:border-b-[3px] hover:border-orange-400 font-semibold" aria-current="page">Home</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

