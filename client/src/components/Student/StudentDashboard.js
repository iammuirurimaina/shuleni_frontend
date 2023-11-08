import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import StudentProfile from './StudentProfile';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
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
          console.log(user_id);
          setUser(user_id);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }

        const classResponse = await fetch('/student_classes');
        if (classResponse.ok) {
          const classData = await classResponse.json();
          setClasses(classData);
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

  const handleClassClick = (classId) => {
    // Navigate to the individual class resource page when the card is clicked
    navigate(`/class/${classId}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="md:w-1/4 bg-gray-200 p-4">
        <StudentProfile user={user} />
      </div>
      <div className="md:w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">My Classes</h2>
        <div className="flex flex-wrap">
  {classes.map(classItem => (
    <div key={classItem.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
      {/* Wrap the card with a clickable element */}
      <button
        onClick={() => handleClassClick(classItem.id)}
        className="bg-white border rounded-xl p-4 h-full cursor-pointer hover:shadow-lg transition duration-300 ease-in-out w-full"
      >
        <h3 className="text-xl font-semibold mb-2">{classItem.class}</h3>
        <p className="text-gray-600">Educator: {classItem.educator_id}</p>
        <p className="text-gray-600">School: {classItem.school_id}</p>
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
