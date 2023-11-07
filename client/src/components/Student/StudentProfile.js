import React from 'react';





const StudentProfile = ({ }) => {
  return (
    <div className="flex items-center mb-8">
      <div className="flex-shrink-0 w-16 h-16 mr-4">
        <img
          className="w-full h-full object-cover rounded-full"
          src={/*user.photo ||*/ 'client/src/components/Student/placeholder.jpg'}
          // alt={`/*${user.name}"&/'s profile`}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold">name</h2>
        <p className="text-gray-600">Email</p>
        <p className="text-gray-600">Phone Number</p>
        <p className="text-gray-600">Role</p>
      </div>
    </div>
  );
};

export default StudentProfile;
