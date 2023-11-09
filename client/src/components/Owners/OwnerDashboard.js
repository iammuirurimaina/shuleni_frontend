import React, { useEffect, useState } from "react";
import OwnerProfile from './OwnerProfile';
import SchoolCard from './Schoolcard';
import OwnerSideBar from './OwnerSideBar';


import { useNavigate, navigate } from 'react-router-dom';






const OwnerDashboard = () => {
  const [user, setUser] = useState(null);
  const [schools, setSchools] = useState([]);
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

        const schoolsResponse = await fetch('/schools'); 
        if (schoolsResponse.ok) {
          const schoolsData = await schoolsResponse.json();
          // Filter schools based on owner_id before setting the state
          const filteredSchools = schoolsData.filter(school => school.owner_id === parseInt(user_id));
          console.log (filteredSchools)
          setSchools(filteredSchools);
        } else {
          console.error('Failed to fetch schools data:', schoolsResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  if (!user) {
    return <div>Loading...</div>; 
  }
  const handleDelete = async (schoolId) => {
    try {
   
      const response = await fetch(`'/schools'/${schoolId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
  
      if (response.ok) {

        setSchools((prevSchools) => prevSchools.filter((school) => school.id !== schoolId));
      } else {
        // Handle error scenario when the server responds with an error status
        console.error('Failed to delete school:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error deleting school:', error);
    }
  };
  
  const onUpdateSchool = async (schoolId, updatedSchoolData) => {
    try {
      
      const response = await fetch(`'/schools/${schoolId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(updatedSchoolData),
      });
  
      if (response.ok) {
   
        setSchools((prevSchools) =>
          prevSchools.map((school) =>
            school.id === schoolId ? { ...school, ...updatedSchoolData } : school
          )
        );
      } else {
        
        console.error('Failed to update school:', response.statusText);
      }
    } catch (error) {
      
      console.error('Error updating school:', error);
    }
  };
  


  return (
        <div className="flex flex-col md:flex-row">
      < OwnerSideBar />
      <div className="md:w-1/4 flex justify-center md:items-center bg-gray-200 p-4">
        <OwnerProfile user={user} />
      </div>
      <div className="md:w-3/4 md:flex flex-col">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">My Schools</h2>
          <div className="flex flex-wrap mb-8">
          
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} onDelete={handleDelete} onUpdate={onUpdateSchool} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );

};

export default OwnerDashboard;
