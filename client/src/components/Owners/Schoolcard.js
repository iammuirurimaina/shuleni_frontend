import React from 'react';

const SchoolCard = ({ school, onDelete, onUpdate }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img src={school.image} alt={school.school_name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{school.school_name}</h2>
        <p className="text-gray-700 mb-2">{school.location}</p>
        <div className="flex justify-between">
          <button onClick={() => onUpdate(school.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
          <button onClick={() => onDelete(school.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
