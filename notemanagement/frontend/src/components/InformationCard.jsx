import React from "react";
import { FaListAlt, FaEdit, FaTrash } from "react-icons/fa";

const InformationCard = ({
  title,
  value,
  onDelete,
  onUpdate,
  category,
  adddate,
  backgroundColor,
}) => {
  let Created = new Date(adddate?.createdAt)?.toLocaleDateString();
  let Updated = new Date(adddate?.createdAt)?.toLocaleDateString();
  return (
    <>
      <div
        className="addshodow w-full overflow-hidden flex flex-col justify-between bg-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg border border-gray-300 mb-6 py-5 px-4"
        style={{ background: backgroundColor }}
      >
        <div>
          <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3 break-words">
            {title}
          </h4>
          <p className="text-gray-800 dark:text-gray-100 text-sm break-words">
            {value}
          </p>
        </div>
        <div>
          <b style={{ color: "green" }}>{category}</b>
          <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
            <div>
              <p className="text-sm break-words">Created date: {Created}</p>
              <p className="text-sm break-words">Last update: {Updated}</p>
            </div>
            {/* <p>last update:{Updated}</p> */}
            <div className="flex items-center gap-x-1">
              <button
                onClick={onUpdate}
                className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black"
                aria-label="edit note"
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-pencil"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                </svg>
              </button>

              <button
                onClick={onDelete}
                className="w-8 h-8 rounded-full bg-red-600 text-white dark:bg-red-400 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-red-500"
                aria-label="delete note"
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M4 7h16"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                  <path d="M9 7v-3h6v3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationCard;
