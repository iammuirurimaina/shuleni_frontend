import React from 'react';
import TeacherProfile from './EducatorProfile';
import ClassCard from './ClassCard';

const TeacherDashboard = ({ teacher, classes, onAddStudents, onDeleteClass }) => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <TeacherProfile teacher={teacher} />
      </div>
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4">My Classes</h2>
        <div className="flex flex-wrap">
          {classes.map((className) => (
            <ClassCard
              key={className.id}
              className={className.name}
              onAddStudents={() => onAddStudents(className.id)}
              onDelete={() => onDeleteClass(className.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
