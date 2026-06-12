import axios from 'axios';
import React, { useState, useEffect } from 'react';


const MyNotes = () => {

  const [notes, setNotes] = useState([]);

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
          <h3>{note.fileName}</h3>
        </div>
      ))}
    </div>
  )

}

export default MyNotes;
