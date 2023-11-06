import React, { useState } from 'react';

function AddSchool() {
  const [schoolData, setSchoolData] = useState({
    school_name: '',
    poster: '',
    location: '',
    owner_id: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        console.log('School Created Successfully');
        
      } else {
        console.error('Failed to create school');
        
      }
    } catch (error) {
      console.error('Error adding school:', error);
    }

    
    setSchoolData({
      school_name: '',
      poster: '',
      location: '',
      owner_id: 0,
    });
  };

  return (
    <div id='SchoolForm'>
      <h2 id='Header'>Add School</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>School Name:</label>
          <input
            type='text'
            className='form-control'
            name='school_name'
            value={schoolData.school_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Poster URL:</label>
          <input
            type='text'
            className='form-control'
            name='poster'
            value={schoolData.poster}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Location:</label>
          <input
            type='text'
            className='form-control'
            name='location'
            value={schoolData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Owner ID:</label>
          <input
            type='number'
            className='form-control'
            name='owner_id'
            value={schoolData.owner_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add School
        </button>
      </form>
    </div>
  );
}

export default AddSchool;
