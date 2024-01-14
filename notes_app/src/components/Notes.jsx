// src/components/Notes.js
import React, { useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Notes App</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a new note"
          className="border p-2 w-64"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2" onClick={addNote}>
          Add Note
        </button>
      </div>

      <ul>
        {notes.map((note, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-200 p-2 mb-2">
            <span>{note}</span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2"
              onClick={() => deleteNote(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
