import React, { useState, useEffect } from 'react';

function EditSchool({ school, onUpdateSchool }) {
  const [schoolData, setSchoolData] = useState({
    school_name: '',
    poster: '',
    location: '',
    owner_id: ownerId,
  });

  useEffect(() => {
    
    setSchoolData({
      school_name: school.school_name,
      poster: school.poster,
      location: school.location,
      owner_id: school.owner_id,
    });
  }, [school]); 

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
      const response = await fetch(`/schools/${school.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        console.log('School Updated Successfully');
        
        onUpdateSchool(school.id, schoolData); 
      } else {
        console.error('Failed to update school');
       
      }
    } catch (error) {
      console.error('Error updating school:', error);
    }
  };

  return (
    <div id='SchoolForm'>
      <h2 id='Header'>Edit School</h2>
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
          Update School
        </button>
      </form>
    </div>
  );
}

export default EditSchool;
