import React from 'react';


const StudentProfile = ({ user }) => {
  const imageUrl = user.image ? user.image : placeholderImage;

  return (
    <div className="flex items-center p-4 bg-gray-200">
      <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
        <img src={imageUrl} alt="Students Profile" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default StudentProfile;
