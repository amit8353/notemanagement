import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/notes";

const useNotesApi = (token) => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate()

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const saveNote = async (selectedColor, editingId) => {
    if (!title.trim()) return alert("Title is required");
  
    try {
      const url = editingId 
        ? `${API_BASE_URL}/update-note/${editingId}` 
        : API_BASE_URL;
  
      const method = editingId ? "put" : "post"; 
  
      await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { title, content, category, selectedColor },
      });
  
      alert(editingId ? "Note updated successfully!" : "Note added successfully!");
      navigate("/dashboard");
  
      setEditingId(null);
      setTitle("");
      setContent("");
      setCategory("");
      fetchNotes(); 
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Something went wrong!");
    }
  };
  

  // Delete Note
  const deleteNote = async (id) => {
    try {
      console.log(`Deleting note with ID: ${id}`); 

      const response = await axios.delete(`${API_BASE_URL}/delete-note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Delete response:", response.data); 

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); 
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  return {
    notes,
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    editingId,
    setEditingId,
    fetchNotes,
    saveNote,
    deleteNote,
  };
};

export default useNotesApi;
