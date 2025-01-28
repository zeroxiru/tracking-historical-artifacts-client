import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/loggo.png'

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext) || {} ;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto]= useState(userData?.user?.photoURL);
  const [userName, setUserName] = useState(userData?.user?.name);
  // console.log(user);
  // console.log(userData);

  useEffect(() => {

    document.querySelector('html').setAttribute('data-theme', theme);
    // Store the theme in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // Toggle between dark and light theme
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User Sign Out Successfully");
      })
      .catch(error => {
        console.log("ERROR", error.message);
      }

      )
  }

   useEffect(() => {
    if(user?.email) { 
      fetch(`https://localhost:6000/user?email=${user.email}`)
      .then(response => {
        if(!response.ok) { 
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setPhoto(data.user.photoURL);
        setUserName(data.user.name);
        //console.log(data);
      })
      .catch(error => {
        console.log('Error fetching user data:', error);
      })


    }
   }, [user])

  return (
    <div className="bg-[#274b7b] text-white">
      {/* Welcome Message */}
      {userData && (
        <div className="text-center mt-2 text-lg font-semibold">
          Welcome, <span className="text-gray-400">{userName  || 'User'}</span>
        </div>
      )}

      {/* Navbar */}
      <div className="flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className='flex gap-3'>
        <div>
          <img className="w-8 h-8 rounded-full" src={logo} alt="Logo" />
        </div>
        <div>
        <div className="navbar-end">
        <label className="swap swap-rotate">
          {/* This hidden checkbox controls the theme state */}
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

          {/* Sun Icon */}
          <svg
            className="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17.65 4.22 19.07l1.41 1.41 1.42-1.42-1.41-1.41zM12 22h-2v-2h2v2zm7.07-4.93-1.41 1.41 1.42 1.42 1.41-1.41-1.42-1.42zM17.65 5.64l1.41-1.41-1.42-1.42-1.41 1.42 1.42 1.41zM22 12h-2v-2h2v2zm-4.93-7.07L19.07 4.22l-1.42-1.41-1.41 1.42 1.42 1.41zM12 2h-2v2h2V2zM6.34 6.34 4.22 4.22 2.81 5.64l1.41 1.42L6.34 6.34zm0 11.31-1.42 1.42L4.22 19.07l1.41-1.42 1.42 1.42zM2 12H0v2h2v-2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>

          {/* Moon Icon */}
          <svg
            className="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.91 13.94A9 9 0 0 1 12 4a8.76 8.76 0 0 0-1.89.2 9 9 0 1 0 11.8 9.74z" />
          </svg>
        </label>
      </div>
        </div>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        

        {/* Navigation Links */}
        <div
          className={`lg:flex flex-col lg:flex-row lg:space-x-5 text-2xl absolute lg:static top-20 left-0 w-full lg:w-auto bg-blue-500 lg:bg-transparent p-4 lg:p-0 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'
            }`}
        >
          <NavLink to="/" className="block lg:inline hover:underline">
            Home
          </NavLink>
          <NavLink to="/all-visas" className="block lg:inline hover:underline">
            All Visas
          </NavLink>
          {user && (
            <>
              <NavLink to="/add-visa" className="block lg:inline hover:underline">
                Add Visa
              </NavLink>
              <NavLink to="/my-added-visa" className="block lg:inline hover:underline">
                My Added Visas
              </NavLink>
              <NavLink to="/my-visa-application" className="block lg:inline hover:underline">
                My Visa Applications
              </NavLink>
              <NavLink to="/profile" className="block lg:inline hover:underline">
                Profile
              </NavLink>
            </>
          )}
          <NavLink to="/about" className="block lg:inline hover:underline">
            About-Us
          </NavLink>

          
        </div>
        
        {/* Login/Logout Section */}
        <div className="login flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Dynamic User Image */}
              <img
                className="w-8 h-8 rounded-full"
                // src={user? user.photoURL : userData.user.photoURL} // Use default placeholder if no image is available
                src={photo} 
                alt="User"
              />

              <span>{user.name || user.email}</span>
              <button
                onClick={handleSignOut}
                className="btn text-black hover:bg-zinc-100 px-4 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
              <NavLink to="/register" className="hover:underline">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default Navbar;