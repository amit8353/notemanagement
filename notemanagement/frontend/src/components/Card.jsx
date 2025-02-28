import { FaEdit, FaTrash } from "react-icons/fa";

const Card = ({ icon, title, value, onEdit, onDelete }) => {
  return (
    <div className="bg-white text-dark p-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-white flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-3xl text-gray-500">{icon}</div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xl">{value}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-gray-300 flex justify-between items-center">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 transition"
        >
          <FaEdit size={18} />
          <span>Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 flex items-center space-x-1 transition"
        >
          <FaTrash size={18} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Card;

