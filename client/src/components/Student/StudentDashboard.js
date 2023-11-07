import React from 'react';



const StudentDashboard = ({ user}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between p-4 bg-gray-200">
        <div className="flex items-center">
          <img
            src={user.photo || 'placeholder.jpg'} 
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>{user.email_address}</p>
          </div>
        </div>
        <div>
          <p>Phone: {user.phone_number}</p>
        </div>
      </div>
      <div className="flex flex-wrap p-4">
        
        {user.classes.map((className, index) => (
          <div key={index} className="m-2 p-4 bg-blue-200 cursor-pointer rounded-lg">
            {className}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
