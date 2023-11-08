import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useNavigate } from 'react-router-dom';


const AddEducators = ({ onClose, onSwitchToSignIn }) => {
  const [isSignupSuccessful, setSignupSuccessful] = useState(false);
  const [isAlreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();


  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone_number: yup.string().required('Phone is required'),
    email_address: yup.string().email('Invalid email').required('Email is required'),
    photo: yup.string().required('photo is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),

      role_id: yup.string().required('Role is required'), //role Id set to Student
    
    
  });

  const onSubmit = async (values) => {
    try {
      const isUserRegistered = await checkIfUserIsRegistered(values.email_address);

      if (isUserRegistered) {
        setAlreadyRegistered(true);
      } else {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Sign Up successful:', responseData);
          setSignupSuccessful(true);
          console.log(values)
          alert('Educator added succesfully')
          
          navigate ('/users')
          onClose();
        } else {
          const errorData = await response.json();
          console.error('Sign Up failed:', errorData);
          console.log(values)
        }
      }
    } catch (error) {
      console.error('Sign Up failed:', error);
    }
  };

  const checkIfUserIsRegistered = async (email) => {
    // Simulate the check (replace with actual logic)
    const registeredUsers = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
    return registeredUsers.includes(email);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      photo: '',
      email_address: '',
      password: '',
      
      role_id: '2',
      
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 md:p-8 w-full max-w-md border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Employ An Educator</h2>

        </div>
        {isAlreadyRegistered ? (
          <p className="text-red-500">User already registered with this email.</p>
        ) : isSignupSuccessful ? (
          <p className="text-red-500">Educator Added successful!</p>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Educators's Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.name && <p className="text-red-500 mt-1">{formik.errors.name}</p>}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Educator's Phone"
                name="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.phone_number && <p className="text-red-500 mt-1">{formik.errors.phone_number}</p>}
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Educator's Email"
                name="email_address"
                onChange={formik.handleChange}
                value={formik.values.email_address}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.email_address && <p className="text-red-500 mt-1">{formik.errors.email_address}</p>}
              
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Educator's Photo"
                name="photo"
                onChange={formik.handleChange}
                value={formik.values.photo}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.photo && <p className="text-red-500 mt-1">{formik.errors.photo}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.password && <p className="text-red-500 mt-1">{formik.errors.password}</p>}
            </div>

            <div className="mb-4">
   

              {formik.errors.Role && <p className="text-red-500 mt-1">{formik.errors.Role}</p>}  
              </div>

   

             <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-blue-600 hover-bg-blue-700 text-white rounded-xl px-4 py-2 font-semibold"
              >
                Enroll
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AddEducators;