import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/loggo.png';
import { ModeToggle } from '../../../components/mode-toggle';

const Navbar = () => {
  const { user, signOutUser } = useAuth() || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("User signed out successfully"))
      .catch(error => console.log("ERROR", error.message));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "All Artifacts", link: "/all-artifacts" },
    { name: "Add Artifacts", link: "/add-artifacts", auth: true },
    { name: "About Us", link: "/about" }
  ];

  const activeLink = "text-secondary";
  const inActiveLink = "hover:text-secondary text-gray-700 hover:scale-105";
  const navLink = " btn transition-all transform duration-300 btn-sm bg-transparent hover:bg-transparent border-none text-base font-semibold shadow-none";

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-orange-300 text-white px-4">
      <div className="flex justify-between items-center h-16 ">
        {/* Nav Start - Logo & Theme Toggle */}
        <div className="flex items-center gap-3 ">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
          <ModeToggle />
        </div>
        
        {/* Nav Center - Navigation Links */}
        <div className="hidden lg:flex space-x-5 ">
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
        </div>
        
        {/* Nav End - Login/Logout */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative group profile-dropdown">
              <img className="w-8 h-8 rounded-full cursor-pointer" src={user.photoURL} alt="User" />
              <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-orange-800 text-xs px-2 py-1 rounded-lg shadow-md">
                {user.displayName || user.email}
              </span>
              <button onClick={handleSignOut} className="btn text-black hover:bg-zinc-700 px-4 py-2 rounded-lg">
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/signIn" className={({ isActive }) => `${navLink} ${isActive ? activeLink : inActiveLink}`}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `${navLink} ${isActive ? activeLink : inActiveLink}`}>Register</NavLink>
            </>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-2xl focus:outline-none z-50"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden flex flex-col items-center bg-gray-500 w-full absolute left-0 transition-transform ${isMenuOpen ? 'block' : 'hidden'}`}>
        {navLinks.map(({ name, link, auth }) => (
          (!auth || user) && (
            <NavLink 
              key={name} 
              to={link} 
              className="block px-4 py-2 text-white hover:bg-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {name}
            </NavLink>
          )
        ))}
        
        {user ? (
          <>
            <NavLink to="/my-artifacts" className="block px-4 py-2 text-white hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
              My Artifacts
            </NavLink>
            <NavLink to="/my-liked-artifacts" className="block px-4 py-2 text-white hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
              My Liked Artifacts
            </NavLink>
            <button onClick={handleSignOut} className="block px-4 py-2 text-white hover:bg-gray-600">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signIn" className="block px-4 py-2 text-white hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/register" className="block px-4 py-2 text-white hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
