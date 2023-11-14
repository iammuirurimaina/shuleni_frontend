import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// import EducatorSidebar from './EducatorSideBar';

const CreateAssessment = () => {
  const navigate = useNavigate();
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [assessmentData, setassessmentData] = useState({
    class_id : '',
    title: '',
    body: '',
    start_time: '',
    end_time: '',
    duration: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setassessmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        console.log('Test Posted Successfully');
        alert('Test Posted Successfully')
        
      } else {
        console.error('Failed to create test');
      }
    } catch (error) {
      console.error('Error adding Test:', error);
    }

    setassessmentData({
      class_id : '',
      title: '',
      body: '',
      start_time: '',
      end_time: '',
      duration: '',
    });
    console.log(assessmentData)
    setFormSubmitted(true);
    navigate('/assessment_responses')
  };

return (
  <div className="mx-auto">
    
    
      <h2 className="text-2xl font-semibold text-white">Add Class</h2>
    

    <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
      {formSubmitted ? (
        <div>
          <p className="text-blue-600 mb-6 md:mb-12">Class added successfully!</p>

        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full md:w-1/2">
          <div className="mb-6">
            <input
              type="number"
              
              id="class_id"
              placeholder="Class ID"
              name="class_id"
              onChange={handleChange}
              value={assessmentData.class_id}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />

          </div>
          <div className="mb-6">
            <input
              type="text"
              id="title"
              placeholder="Title"
              name="body"
              onChange={handleChange}
              value={assessmentData.title}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />
            </div>



          <div className="mb-6">
            <input
              type="text"
              id="body"
              placeholder="Assesment Link"
              name="body"
              onChange={handleChange}
              value={assessmentData.body}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />

          </div>
          
          <div className="mb-6">
            <input
              type="text"
              id="start_time"
              placeholder="Start Time"
              name="start_time"
              onChange={handleChange}
              value={assessmentData.start_time}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />

          </div>
          
          <div className="mb-6">
            <input
              type="text"
              id="end_time"
              placeholder="End Time"
              name="end_time"
              onChange={handleChange}
              value={assessmentData.end_time}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />

          </div>
          <div className="mb-6">
            <input
              type="text"
              id="duration"
              placeholder="Duration"
              name="duration"
              onChange={handleChange}
              value={assessmentData.duration}
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />

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
          <button on type="submit" className="hidden" />
        </form>
      )}
    </div>
  </div>
);
}

export default CreateAssessment;
