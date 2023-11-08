import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import StudentProfile from './StudentProfile';
import { useNavigate } from 'react-router-dom';


const Resources = () => {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/resources');
        if (response.ok) {
          const data = await response.json();
          setResources(data);
        } else {
          console.error('Failed to fetch resources data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleResourceClick = (resourceId) => {
    
    navigate(`/resource/${resourceId}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <SideBar />
      <div className="md:w-1/4 bg-gray-200 p-4">
        <StudentProfile />
      </div>
      <div className="md:w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">Resources</h2>
        <div className="flex flex-wrap">
          {resources.map(resource => (
            <div
              key={resource.id}
              className="w-full md:w-1/2 lg:w-1/3 p-2 cursor-pointer"
              onClick={() => handleResourceClick(resource.id)}
            >
              <div className="bg-white border rounded-xl p-4 h-full hover:shadow-lg transition duration-300 ease-in-out">
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600">Type: {resource.type}</p>
                <p className="text-gray-600">Educator: {resource.educator}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
