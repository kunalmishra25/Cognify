import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/summary', {
          withCredentials: true
        });

        const data = response.data.data;
        setNotes(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getNotes();
  }, [])

  return (
    <div>
      <h1>My Notes</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <h3 className='cursor-pointer'
            onClick={() => navigate(`/summary/${note._id}`)}>
            {note.fileName}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default MyNotes;
