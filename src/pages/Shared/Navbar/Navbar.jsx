import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/loggo.png'

const Navbar = () => {
  const { user, signOutUser } = useAuth() || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(userData?.user?.photoURL);
  const [userName, setUserName] = useState(userData?.user?.displayName);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // console.log(user);
  // console.log(userData);




  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        setUserData(null);
        setPhoto(null);
        setUserName(null);
        console.log("User Sign Out Successfully");
      })
      .catch(error => {
        console.log("ERROR", error.message);
      }

      )
  }

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/user/${user.email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => {
          setUserData(data);
          setPhoto(data.user?.photoURL);
          setUserName(data.user?.displayName);
          //console.log(data);
        })
        .catch(error => {
          console.log('Error fetching user data:', error);
        })


    }
  }, [user])

  useEffect(() => { 
    const handleClickOutside = (event)=> {
      if(!event.target.closest(".profile-dropdown") ) { 
        setIsProfileOpen(false)
      }
     }
     document.addEventListener("click", handleClickOutside);
     return () => document.removeEventListener("click", handleClickOutside)
  }, []);

  return (
    <div className="bg-orange-300 text-white ">
      {/* Welcome Message */}
      {userData && (
        <div className="text-center mt-2 text-lg font-semibold">
          Welcome, <span className="text-orange-800">{user.displayName || 'User'}</span>
        </div>
      )}

      {/* Navbar */}
      <div className="flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className='flex gap-3'>
          <div>
            <img className="w-12 h-12 rounded-full" src={logo} alt="Logo" />
          </div>
          <div>
            <div className="navbar-end">

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
  className={`lg:flex flex-col lg:flex-row lg:space-x-5 text-2xl absolute lg:static top-20 left-0 w-full lg:w-auto bg-gray-500 lg:bg-transparent p-4 lg:p-0 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'
    }`}
>
  <NavLink to="/" className="block lg:inline hover:underline">
    Home
  </NavLink>
  <NavLink to="/all-artifacts" className="block lg:inline hover:underline">
    All Artifacts
  </NavLink>

  {user && (
    <>
      <NavLink to="/add-artifacts" className="block lg:inline hover:underline">
        Add Artifacts
      </NavLink>

      {/* Profile Dropdown - Fixing Disappearance Issue */}
      <div className="relative profile-dropdown">
        <button className="block lg:inline hover:underline focus:outline-none"
        onClick={() => setIsProfileOpen(!isProfileOpen)}>
        My Profile
        </button>

        {/* Dropdown Menu */}
        { isProfileOpen && ( 
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-all duration-200 ease-in-out"
          onClick={(e) => e.stopPropagation()}
          >
          <NavLink
            to="/my-artifacts"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-lg"
          >
            My Artifacts
          </NavLink>
          <NavLink
            to="/my-liked-artifacts"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-lg"
          >
            My Liked Artifacts
          </NavLink>
          
        </div>
        
        )
        

        }
      </div>
      <NavLink to="/profile"> Profile</NavLink>
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
              <div className='relative group'>
                <img
                  className="w-8 h-8 rounded-full cursor-pointer"
                  // src={user? user.photoURL : userData.user.photoURL} // Use default placeholder if no image is available
                  src={user.photoURL}
                  alt="User"
                />

                <span className='absolute left-0 bottom-full mb-1 hidden group-hover:block text-orange-800 text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-md'>
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="btn text-black hover:bg-zinc-700 px-4 py-2 rounded-lg "
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/signIn" className="hover:underline">
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