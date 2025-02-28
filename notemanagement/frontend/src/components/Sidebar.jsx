import React from "react";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaPlus,FaUser
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic">
        Notes Management
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        <Link to="/dashboard">
          <li
            className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white"
          >
            <FaTachometerAlt />
            <span className="hidden md:inline">Dashboard</span>
          </li>
        </Link>
        <Link to="/addnotes">
          <li
            className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white"
          >
            <FaPlus />
            <span className="hidden md:inline">Add Notes</span>
          </li>
        </Link>
        <Link to="/profile">
          <li
            className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white"
          >
            <FaUser />
            <span className="hidden md:inline">Profile</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
