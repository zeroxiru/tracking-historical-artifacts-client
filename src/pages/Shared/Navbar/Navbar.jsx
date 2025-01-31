import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
 import useAuth from '../../../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/loggo.png'

const Navbar = () => {
  const { user, signOutUser } = useAuth() || {} ;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto]= useState(userData?.user?.photoURL);
  const [userName, setUserName] = useState(userData?.user?.displayName);
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
    if(user?.email) { 
      fetch(`${import.meta.env.VITE_API_URL}/user?email=${user.email}`)
      .then(response => {
        if(!response.ok) { 
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

  return (
    <div className="bg-orange-300 text-white">
      {/* Welcome Message */}
      {userData && (
        <div className="text-center mt-2 text-lg font-semibold">
          Welcome, <span className="text-orange-400">{user.displayName  || 'User'}</span>
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
          <NavLink to="/all-artifacts" className="block lg:inline hover:underline">
          All Artifacts
          </NavLink>
          {user && (
            <>
              <NavLink to="/add-artifacts" className="block lg:inline hover:underline">
              Add Artifacts
              </NavLink>
              <NavLink to="/my-added-artifacts" className="block lg:inline hover:underline">
              My Artifacts
              </NavLink>
              <NavLink to="/my-visa-application" className="block lg:inline hover:underline">
                My Liked Artifacts 
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
                src={user.photoURL} 
                alt="User"
              />

              <span>{user.displayName || user.email}</span>
              <button
                onClick={handleSignOut}
                className="btn text-black hover:bg-zinc-100 px-4 py-2 rounded-lg"
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