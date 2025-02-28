import React from "react";

const Toster = ({ title }) => {
  return (
    <div
      className="fixed top-5 right-5 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700 p-4 flex items-center animate-slide-in"
      role="alert"
    >
      <svg
        className="size-6 text-green-500 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
      </svg>
      <p className="text-sm text-gray-700 dark:text-neutral-400">{title} dddddddd</p>
    </div>
  );
};

export default Toster;
