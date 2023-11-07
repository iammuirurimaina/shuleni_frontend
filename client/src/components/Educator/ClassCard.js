import React from 'react';

const ClassCard = ({ classItem /*onAddStudents, onDelete */}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={classItem.image} alt={classItem.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold mb-2">{classItem.name}</h3>
      <p className="text-gray-600 mb-4">{classItem.createdAt}</p>
      <div className="flex justify-between">
        <button /*onClick={onAddStudents}*/ className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Add Students
        </button>
        <button /*onClick={onDelete}*/ className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
