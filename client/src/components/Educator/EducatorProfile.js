import React from 'react';
import placeholderImage from './placeholder.jpg'; 

const EducatorProfile = ({  }) => {
  const imageUrl = placeholderImage

  return (
    <div className="flex items-center p-4 bg-gray-200">
      <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
        <img src={imageUrl} alt="Educator's Profile" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-xl font-semibold"> name</h2>
        <p>UserEmail</p>
      </div>
    </div>
  );
};

export default EducatorProfile;
