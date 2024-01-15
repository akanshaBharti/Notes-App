import React, { useState, useEffect } from 'react';
import './notes.css'

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteHeading, setNewNoteHeading] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteBackgroundColor, setNoteBackgroundColor] = useState('#68D391'); // Default color

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== '' || newNoteHeading.trim() !== '') {
      if (selectedNote !== null) {
        // Modify existing note
        const updatedNotes = [...notes];
        updatedNotes[selectedNote] = {
          heading: newNoteHeading,
          content: newNote,
          backgroundColor: noteBackgroundColor,
        };
        setNotes(updatedNotes);
        setSelectedNote(null);
      } else {
        // Create new note
        setNotes([
          ...notes,
          { heading: newNoteHeading, content: newNote, backgroundColor: noteBackgroundColor },
        ]);
      }
      setNewNoteHeading('');
      setNewNote('');
      setNoteBackgroundColor('#68D391'); 
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  const editNote = (index) => {
    const noteToEdit = notes[index];
    setNewNoteHeading(noteToEdit.heading);
    setNewNote(noteToEdit.content);
    setNoteBackgroundColor(noteToEdit.backgroundColor);
    setSelectedNote(index);
  };

  const downloadNotes = (format) => {
    const data =
      format === 'json'
        ? JSON.stringify(notes, null, 2)
        : notes.map((note) => `${note.heading}: ${note.content}`).join('\n');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto my-8 p-4 flex flex-wrap gap-4">
      {notes.map((note, index) => (
        <div
          key={index}
          className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded-md shadow-md `}
          style={{ backgroundColor: note.backgroundColor }}
        >
          <h2 className="text-lg font-semibold mb-2 text-decoration-line: underline ">{note.heading}</h2>
          <p className="text-white ">{note.content}</p>
          <div className="flex mt-2 ">
            <button onClick={() => deleteNote(index)} className="text-red-500 mr-2 font-semibold">
              Delete
            </button>
            <button onClick={() => editNote(index)} className="text-purple-500 font-semibold">
              Edit
            </button>
          </div>
        </div>
      ))}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-white mb-4">
          {selectedNote !== null ? 'Edit Note' : 'Create Note'}
        </h1>
        <div className="mb-4">
          <input
            type="text"
            value={newNoteHeading}
            onChange={(e) => setNewNoteHeading(e.target.value)}
            className="w-full p-2 mb-2 border-2 border-white rounded focus:outline-none"
            placeholder="Add a heading..."
          />
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2 border-2 border-white rounded focus:outline-none"
            placeholder="Add a note..."
          />
          <label className="block text-white mt-4">Choose Note Color:</label>
          <input
            type="color"
            value={noteBackgroundColor}
            onChange={(e) => setNoteBackgroundColor(e.target.value)}
            className="border-2 border-white rounded focus:outline-none"
          />
        </div>
        <div className="flex mb-4">
          <button
            onClick={addNote}
            className={`bg-white text-gray-800 px-4 py-2 rounded mr-2 ${
              selectedNote !== null ? 'hidden' : ''
            }`}
          >
            Add
          </button>
          <button
            onClick={downloadNotes.bind(null, 'json')}
            className="bg-white text-gray-800 px-4 py-2 rounded mr-2"
          >
            Download JSON
          </button>
          <button
            onClick={downloadNotes.bind(null, 'txt')}
            className="bg-white text-gray-800 px-4 py-2 rounded"
          >
            Download TXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
