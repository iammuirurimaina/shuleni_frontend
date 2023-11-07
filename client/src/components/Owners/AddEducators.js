import React, { useState } from 'react';

function AddEducator() {
  const [educatorData, setEducatorData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducatorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const password = educatorData.first_name + '2023';

    try {
      const response = await fetch('/educators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...educatorData, password }),
      });

      if (response.ok) {
        console.log('Educator Added Successfully');
      } else {
        console.error('Failed to add educator');
      }
    } catch (error) {
      console.error('Error adding educator:', error);
    }

    
    setEducatorData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
    });
  };

  return (
    <div id='EducatorForm'>
      <h2 id='Header'>Add Educator</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            type='text'
            className='form-control'
            name='first_name'
            value={educatorData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Last Name:</label>
          <input
            type='text'
            className='form-control'
            name='last_name'
            value={educatorData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={educatorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Phone Number:</label>
          <input
            type='text'
            className='form-control'
            name='phone_number'
            value={educatorData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Educator
        </button>
      </form>
    </div>
  );
}

export default AddEducator;
