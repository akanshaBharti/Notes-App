import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteHeading, setNewNoteHeading] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== '' || newNoteHeading.trim() !== '') {
      setNotes([...notes, { heading: newNoteHeading, content: newNote }]);
      setNewNoteHeading('');
      setNewNote('');
    }
  };

  const downloadNotes = () => {
    const data = JSON.stringify(notes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto my-8 p-4 flex flex-wrap gap-4">
      {notes.map((note, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-yellow-200 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">{note.heading}</h2>
          <p className="text-white">{note.content}</p>
        </div>
      ))}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-white mb-4">Notes</h1>
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
        </div>
        <div className="flex mb-4">
          <button
            onClick={addNote}
            className="bg-white text-gray-800 px-4 py-2 rounded mr-2"
          >
            Add
          </button>
          <button
            onClick={downloadNotes}
            className="bg-white text-gray-800 px-4 py-2 rounded"
          >
            Download Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
