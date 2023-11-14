import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSchool() {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem('user_id');
  const [schoolData, setSchoolData] = useState({
    school_name: '',
    poster: '',
    location: '',
    owner_id: owner_id,
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
        alert('School created Successfully')
        
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
      owner_id: owner_id,
    });
    navigate('/owner-dashboard')
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
     
      <h2 className="text-2xl font-semibold mb-4">Add School</h2>
      <form onSubmit={handleSubmit} className="w-full md:w-1/2">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">School Name:</label>
          <input
            type="text"
            className="form-input mt-1 block w-full"
            name="school_name"
            value={schoolData.school_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Poster URL:</label>
          <input
            type="text"
            className="form-input mt-1 block w-full"
            name="poster"
            value={schoolData.poster}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Location:</label>
          <input
            type="text"
            className="form-input mt-1 block w-full"
            name="location"
            value={schoolData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Add School
        </button>
      </form>
    </div>
  );
}

export default AddSchool;
