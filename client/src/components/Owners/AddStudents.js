import React, { useState } from 'react';

function AddStudent() {
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate password using the first name and append '2023'
    const password = studentData.first_name + '2023';

    try {
      const response = await fetch('/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...studentData, password }),
      });

      if (response.ok) {
        console.log('Student Added Successfully');
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }

   
    setStudentData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
    });
  };

  return (
    <div id='StudentForm'>
      <h2 id='Header'>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            type='text'
            className='form-control'
            name='first_name'
            value={studentData.first_name}
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
            value={studentData.last_name}
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
            value={studentData.email}
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
            value={studentData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
