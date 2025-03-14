import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/loggo.png'
import useScroll from '../../../hooks/useScroll';

const Navbar = () => {
  const { user, signOutUser } = useAuth() || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(userData?.user?.photoURL);
  const [userName, setUserName] = useState(userData?.user?.displayName);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const scrolled = useScroll(40);
  const location = useLocation();
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
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside)
  }, []);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "All Artifacts", link: "/all-artifacts" },
    { name: "Add Artifacts", link: "/add-artifacts", auth: true },
    { name: "About-Us", link: "/about" },
  ];
  const activeLink = "text-secondary";
  const inActiveLink = "hover:text-secondary text-gray-700 hover:scale-105";
  const navLink = "btn transition-all transform duration-300 btn-sm bg-transparent hover:bg-transparent border-none text-base font-semibold shadow-none";

  return (
    <div className="sticky px-2 top-0 z-30 w-full border-b bg-orange-300 text-white">
    <div className="flex justify-between items-center ">
      {/* Logo Section */}
      <div className='flex items-center'>
        <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
      </div>
  
      {/* Hamburger Icon */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl focus:outline-none">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
  
      {/* Navigation Links */}
      <div className={`lg:flex flex-col lg:flex-row lg:space-x-5 text-2xl absolute lg:static top-20 left-0 w-full lg:w-auto bg-gray-500 lg:bg-transparent p-4 lg:p-0 transition-transform ${isMenuOpen ? 'block' : 'hidden'}`}>
        {navLinks.map(({ name, link, auth }) => (
          (!auth || user) && (
            <NavLink 
              key={name} 
              to={link} 
              className={({ isActive }) => 
                `${navLink} ${isActive ? activeLink : inActiveLink}`
              }>
              {name}
            </NavLink>
          )
        ))}
  
        {user && (
          <div className="relative profile-dropdown">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="hover:underline focus:outline-none">
              My Profile
            </button>
            {isProfileOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <NavLink to="/my-artifacts" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  My Artifacts
                </NavLink>
                <NavLink to="/my-liked-artifacts" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  My Liked Artifacts
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
  
      {/* Login/Logout Section */}
      <div className="flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <div className='relative group'>
              <img className="w-8 h-8 rounded-full cursor-pointer" src={user.photoURL} alt="User" />
              <span className='absolute left-0 bottom-full mb-1 hidden group-hover:block text-orange-800 text-xs px-2 py-1 rounded-lg shadow-md'>
                {user.displayName || user.email}
              </span>
            </div>
            <button onClick={handleSignOut} className="btn text-black hover:bg-zinc-700 px-4 py-2 rounded-lg">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <NavLink 
              to="/signIn" 
              className={({ isActive }) => `${navLink} ${isActive ? activeLink : inActiveLink}`}>
              Login
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => `${navLink} ${isActive ? activeLink : inActiveLink}`}>
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