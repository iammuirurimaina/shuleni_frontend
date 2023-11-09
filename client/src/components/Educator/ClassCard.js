import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EducatorProfile from './EducatorProfile';
import EducatorSidebar from "./EducatorSideBar";

const EducatorDashboard = () => {
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
          setUser(user_id);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }

        // Fetch classes data
        const classesResponse = await fetch('/classes');
        if (classesResponse.ok) {
          const classesData = await classesResponse.json();
          // Filter classes based on educator_id
          const filteredClasses = classesData.filter(classItem => classItem.educator_id === user_id);
          setClasses(filteredClasses);
        } else {
          console.error('Failed to fetch classes data:', classesResponse.statusText);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <EducatorSidebar />
      <div className="md:w-1/4 flex justify-center md:items-center bg-gray-200 p-4">
        <EducatorProfile user={user} />
      </div>
      <div className="md:w-3/4 md:flex flex-col">
        <div className="p-8">
          <div className="w-3/4 p-8">
            <h2 className="text-2xl font-bold mb-4">My Classes</h2>
            <div className="flex flex-wrap">
              {classes.map(classItem => (
                <div key={classItem.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                  <div className="bg-white border rounded-xl p-4 h-full">
                    <h3 className="text-xl font-semibold mb-2">{classItem.class_name}</h3>
                    {/* Add other class information here */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add Students
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;
