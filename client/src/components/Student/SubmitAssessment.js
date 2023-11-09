import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



 

const SubmitAssessment = () => {
  const navigate = useNavigate();
  const student_id = localStorage.getItem('user_id');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [assessmentData, setassessmentData] = useState({



    
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
      const response = await fetch('/assessmentResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        console.log('Assignment Submitted Successfully');
        alert('Assessment Submitted Successfully')
        
      } else {
        console.error('Failed to submit');
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }

    setassessmentData({
        'id': '',
        'assessment_id': '',
        'student_id': student_id,
        'work': '',
        'student': 'Student'
    });
    console.log(assessmentData)
    setFormSubmitted(true);
    navigate('/student-assessments')
  };
 


  return (
    
        <div className="mx-auto">
          
          
            <h2 className="text-2xl font-semibold text-white">Submit Assessment</h2>
          
      
          <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
            {formSubmitted ? (
              <div>
                <p className="text-blue-600 mb-6 md:mb-12">Assignment Submitted successfully!</p>
      
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full md:w-1/2">
                <div className="mb-6">
                  <input
                    type="number"
                    
                    id="assessment_id"
                    placeholder="Assessment ID"
                    name="assessment_id"
                    onChange={handleChange}
                    value={assessmentData.assessment_id}
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
                  />
      
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="work"
                    placeholder="Assessment link"
                    name="work"
                    onChange={handleChange}
                    value={assessmentData.work}
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
                  />
                  </div>
      
      
  
               
                
                

                
      
      
                <div className="flex flex-row justify-center items-center mt-8 space-x-20">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
                  >
                    Submit
                  </button>
                  <Link
                    to="student-assessment"
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
};
    
export default SubmitAssessment;
