import React from 'react';

const ClassCard = ({ className, onAddStudents, onDelete }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{className}</h2>
        <div className="flex justify-between">
          <button /*onClick={onAddStudents}*/ className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add Students
          </button>
          <button /*onClick={onDelete}*/ className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
