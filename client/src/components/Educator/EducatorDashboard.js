import React, { useEffect, useState } from "react";
import { useNavigate, navigate } from 'react-router-dom';

import ClassCard from './ClassCard';
import EducatorProfile from './EducatorProfile';
import EducatorSidebar from "./EducatorSideBar";



const EducatorDashboard = ({ }) => {
  const [user, setUser] = useState(null);
 
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


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="flex flex-col md:flex-row">
      < EducatorSidebar />
      <div className="md:w-1/4 flex justify-center md:items-center bg-gray-200 p-4">
        <EducatorProfile user={user} />
      </div>
      <div className="md:w-3/4 md:flex flex-col">
        <div className="p-8">
          <div className="w-3/4 p-8">
              <h2 className="text-2xl font-bold mb-4">My Classes</h2>

              <p>Loading ...... Please Wait</p>
              {/* <div className="flex flex-wrap">
                {classes.map((className) => (
                  <ClassCard
                    key={className.id}
                    className={className.name}
                    onAddStudents={() => onAddStudents(className.id)}
                    onDelete={() => onDeleteClass(className.id)}
                  />
                ))}
              </div> */}
            </div>
          
        </div>

      </div>
    </div>
  );
};

export default EducatorDashboard;
