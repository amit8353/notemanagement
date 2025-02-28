import React, { useContext, useState, useEffect, useRef } from "react";
import { FaMoon, FaSun, FaSignOutAlt,FaUser } from "react-icons/fa";
import { ThemeCotext } from "../context/ThemeContextProvider";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeCotext);
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false); 
  const dropdownRef = useRef(null); 
  const avatarRef = useRef(null); 
  const [usedetails, setUserdetails] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserdetails(user)

  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1>Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="text-2xl" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

      

        <div className="fauseset">
          <FaUser 
           ref={avatarRef}
           onClick={toggleDropdown}
           className="w-7 h-7 rounded-full cursor-pointer"
           alt="User avatar"
          />
          {isOpen && (
            <div
              ref={dropdownRef}
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
              style={{
                position: "absolute",
                right:"10px"
              }}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{usedetails.name}</div>
                <div className="font-medium truncate">{usedetails.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                <li>
                <Link to="/dashboard">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                  </Link>
                </li>

               
                <li>
                  <Link to="/addnotes">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Add Notes
                  </a>
                  </Link>
                </li>
              </ul>
              <div className="py-1">
                <a
                 onClick={logout}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
