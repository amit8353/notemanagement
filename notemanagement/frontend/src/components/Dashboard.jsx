import React, { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useNotesApi from "../CustomHooks/useNotesApi";
import InformationCard from "./InformationCard";

const Dashboard = () => {
  const { token } = useAuth();
  const { notes, deleteNote, fetchNotes } = useNotesApi(token);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const handleEdit = (note) => {
    navigate("/addnotes", { state: { note } });
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //  **Filter Notes Based on Category & Search Query**
  const filteredNotes = notes.filter(
    (note) =>
      (category === "" || note?.category === category) &&
      (searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 dashboard">
      <div className="filter-select">
        <div className="notfount flex justify-between items-center">
          <h3 className="font-semibold mb-3">Your Notes</h3>
          <Link className="font-semibold mb-3" to="/addnotes">
            Create New Note
          </Link>
        </div>

         <div className="filterinput">
         <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-200 text-gray-700 text-base focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full mb-4"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-200 text-gray-700 text-base sm:text-lg focus:outline-none focus:shadow-outline border border-gray-300 rounded py-3 px-4 block w-full appearance-none mb-4"
        >
          <option value="">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="finance">Finance</option>
        </select>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <h3 className="text-xl font-semibold mb-3">Data not Found</h3>
        ) : (
          filteredNotes.map((note) => (
            <InformationCard
              key={note._id}
              icon={<FaBox />}
              title={note.title}
              value={note.content}
              category={note.category}
              onUpdate={() => handleEdit(note)}
              onDelete={() => handleDelete(note._id)}
              adddate={note}
              backgroundColor={note.selectedColor}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
