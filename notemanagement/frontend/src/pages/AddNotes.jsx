import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaBox } from "react-icons/fa";
import useNotesApi from "../CustomHooks/useNotesApi";
import { Link } from "react-router-dom";
import InformationCard from "../components/InformationCard";
import { useLocation, useNavigate } from "react-router-dom";

const COLORS = [
  { name: "gray", value: "#8AAAE5" },
  { name: "Yellow", value: "#FFF9C4" },
  { name: "Green", value: "#C8E6C9" },
  { name: "Blue", value: "#BBDEFB" },
  { name: "Pink", value: "#F8BBD0" },
  { name: "Gray", value: "#E0E0E0" },
];

const AddNotes = () => {
  const { token } = useAuth();
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState(COLORS[0].value); // Default color
  const location = useLocation();
  const navigate = useNavigate();
  const noteToEdit = location.state?.note;

  const {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    editingId,
    saveNote,
  } = useNotesApi(token);

  // const handleAddOrNote = () => {
  //   saveNote(selectedColor);
  // };

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category);
      setSelectedColor(noteToEdit.selectedColor || "#FFF9C4"); // Set color
    }
  }, [noteToEdit]);

  const handleAddOrNote = () => {
    const noteId = noteToEdit?._id || null;
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    if (!category.trim()) {
      setError("Please select a category");
      return;
    }
    setError("");
    saveNote(selectedColor, noteId);
  };

  return (
    <>
      <div className="py-16 loginpage">
        <div className="flex flex-col-reverse lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          {/* Card Section */}
          <div className="w-full lg:w-1/2 bg-cover democard">
            <InformationCard
              key={2}
              icon={<FaBox />}
              title={title || "Note Title"}
              category={category || "Personal"}
              value={
                content ||
                "This section describes how to create, manage, and use Note Templates, Notes, and Note Formats, that are used with the Notes text function."
              }
              onEdit={""}
              onDelete={""}
              adddate={{ createdAt: new Date().toISOString() }}
              backgroundColor={selectedColor}
            />
          </div>

          {/* Form Section */}
          <div className="w-full p-8 lg:w-1/2">
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                Notes Management
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (Required)"
                value={title}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Content
              </label>
              <textarea
                placeholder="Content (Optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              >
                <option value="">Select Category</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            {/* Color Selection */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Background Color
              </label>
              <div className="flex space-x-2">
                {COLORS.map((color) => (
                  <div
                    key={color.name}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      selectedColor === color.value
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                  ></div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                onClick={handleAddOrNote}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                {noteToEdit ? "Note updated" : "Add Note"}
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
