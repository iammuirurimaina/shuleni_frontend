import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import StudentProfile from './StudentProfile';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch('/users', {
          headers: {
            Authorization: `Bearer ${user_id}`,
          },
        });
        
        if (response.ok) {
          setUser(user_id);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }

        const classResponse = await fetch('/student_classes');
        if (classResponse.ok) {
          const classData = await classResponse.json();
          // Filter classes based on user_id from local storage
          const filteredClasses = classData.filter(classItem => classItem.student_id === user_id);
          setFilteredClasses(filteredClasses);
        } else {
          console.error('Failed to fetch classes data:', classResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  const openGoogleMeet = () => {
    // Redirect to the Google Meet website
    window.open('https://meet.google.com/', '_blank');
  };

  // const handleClassClick = (classId) => {
  //   // Navigate to the individual class resource page when the card is clicked
  //   navigate(`/student-dashboard`);
  // };

  function handleClick(id){
    // console.log(id)
    localStorage.setItem('class_id', id)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="md:w-1/4 bg-gray-200 p-4">
        <StudentProfile user={user} />
      </div>
      <div className="md:w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">My Classes</h2>
        <div className="flex flex-wrap">
          {filteredClasses.map(classItem => (
            <div key={classItem.id} className="w-full md:w-1/2 lg:w-1/3 p-2" onClick={() =>handleClick(classItem.id)}>
              {/* Wrap the card with a clickable element */}
              <button
                // onClick={() => handleClassClick(classItem.id)}
                className="bg-white border rounded-xl p-4 h-full cursor-pointer hover:shadow-lg transition duration-300 ease-in-out w-full"
              >
                <h3 className="text-xl font-semibold mb-2">{classItem.class}</h3>
                <p className="text-gray-600">Class ID: {classItem.class_id}</p>
                <button className='btn btn-primary' onClick={() => navigate('/roomchat')}> chats</button>
                <br></br>
                <button
                  className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={openGoogleMeet}
                >
                  Google Meet
                </button>

     
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
