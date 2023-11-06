import React from 'react';
import OwnerProfile from './OwnerProfile';
import SchoolCard from './SchoolCard';

const OwnerDashboard = ({ owner, schools, onDeleteSchool, onUpdateSchool }) => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <OwnerProfile owner={owner} />
      </div>
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4">My Schools</h2>
        <div className="flex flex-wrap">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} onDelete={onDeleteSchool} onUpdate={onUpdateSchool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
