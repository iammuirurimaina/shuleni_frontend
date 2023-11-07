import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import EducatorSidebar from './EducatorSideBar';

const AddClass = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    class_name: yup.string().required('Class Name is required'),
    educator_id: yup.number().required('Educator ID is required'),
    school_id: yup.number().required('School ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      class_name: '',
      educator_id: '',
      school_id: '',
    },
    validationSchema,
    onSubmit: (values) => {
      fetch('/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then(() => {
          setFormSubmitted(true);
          navigate('/classes');
        })
        .catch((error) => {
          console.error('Error adding class:', error);
          alert('An error occurred while adding the class.');
        });
    },
  });

  return (
    <div className="mx-auto">
      <EducatorSidebar />
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Add Class</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-blue-600 mb-6 md:mb-12">Class added successfully!</p>
            <Link
              to="/classes"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded-xl cursor-pointer"
            >
              Back to Classes
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="m-5">
              <input
                type="text"
                id="class_name"
                placeholder="Class Name"
                name="class_name"
                onChange={formik.handleChange}
                value={formik.values.class_name}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.class_name && (
                <p className="text-red-500 mt-1">{formik.errors.class_name}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="number"
                id="educator_id"
                placeholder="Educator ID"
                name="educator_id"
                onChange={formik.handleChange}
                value={formik.values.educator_id}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.educator_id && (
                <p className="text-red-500 mt-1">{formik.errors.educator_id}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="number"
                id="school_id"
                placeholder="School ID"
                name="school_id"
                onChange={formik.handleChange}
                value={formik.values.school_id}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.school_id && (
                <p className="text-red-500 mt-1">{formik.errors.school_id}</p>
              )}
            </div>

            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Add Class
              </button>
              <Link
                to="/classes"
                className="bg-blue-600 hover-bg-orange-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Back
              </Link>
            </div>
            <button type="submit" className="hidden" />
          </form>
        )}
      </div>
    </div>
  );
};

export default AddClass;
