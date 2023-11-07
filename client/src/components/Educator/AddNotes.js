import React, { useState } from 'react';

const AddNote = ({ classId, onAddNote }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteData.title && noteData.content) {
      onAddNote(classId, noteData);
      
      setNoteData({
        title: '',
        content: '',
      });
    }
  };

  return (
    <div id='NoteForm'>
      <h2 id='Header'>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title:</label>
          <input
            type='text'
            className='form-control'
            name='title'
            value={noteData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Content:</label>
          <textarea
            className='form-control'
            name='content'
            value={noteData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
