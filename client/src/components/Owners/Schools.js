import React, { useState, useEffect } from 'react';
import OwnerDashboard from './OwnerDashboard';

const Schools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    
    fetch('/schools')
      .then((response) => response.json())
      .then((data) => {
        setSchools(data.schools);
      })
      .catch((error) => {
        console.error('Error fetching schools:', error);
      });
  }, []); 

  const onDeleteSchool = (schoolId) => {
    
    fetch(`/schools/${schoolId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          
          const updatedSchools = schools.filter((school) => school.id !== schoolId);
          setSchools(updatedSchools);
          console.log(`School with ID ${schoolId} deleted successfully.`);
        } else {
          console.error('Failed to delete school.');
        }
      })
      .catch((error) => {
        console.error('Error deleting school:', error);
      });
  };

  const onUpdateSchool = (updatedSchool) => {
    
    fetch(`schools/${updatedSchool.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSchool),
    })
      .then((response) => {
        if (response.ok) {
         
          const updatedSchools = schools.map((school) =>
            school.id === updatedSchool.id ? updatedSchool : school
          );
          setSchools(updatedSchools);
          console.log('School updated successfully:', updatedSchool);
        } else {
          console.error('Failed to update school.');
        }
      })
      .catch((error) => {
        console.error('Error updating school:', error);
      });
  };

//   const user = {
//     // User data
//     // ...
//   };

  return (
    <div className="App">
      <OwnerDashboard user={user} schools={schools} onDeleteSchool={onDeleteSchool} onUpdateSchool={onUpdateSchool} />
      
    </div>
  );
};

export default Schools;
