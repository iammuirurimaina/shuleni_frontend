import React from 'react';
import placeholderImage from './placeholder.jpg'; 

const OwnerProfile = ({ owner }) => {
  const imageUrl = owner.image ? owner.image : placeholderImage;

  return (
    <div className="flex items-center p-4 bg-gray-200">
      <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
        <img src={imageUrl} alt="Owner's Profile" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{owner.name}</h2>
        <p>{owner.email}</p>
      </div>
    </div>
  );
};

export default OwnerProfile;
