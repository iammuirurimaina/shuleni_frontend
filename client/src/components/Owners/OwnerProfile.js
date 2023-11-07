import React from 'react';
import placeholderImage from './placeholder.jpg';

const OwnerProfile = ({ user }) => {
  const imageUrl = user.image ? user.image : placeholderImage;

  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-gray-200 mb-4">
      <div className="md:w-20 md:h-20 w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0">
        <img src={imageUrl} alt="Owner's Profile" className="w-full h-full object-cover" />
      </div>
      <div className="md:ml-4 text-center md:text-left">
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
        <p className="mb-2">{user.email}</p>
        
      </div>
    </div>
  );
};

export default OwnerProfile;
