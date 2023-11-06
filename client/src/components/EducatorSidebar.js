import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <h2 className="text-2xl font-bold mb-4">Educator Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <a href="/attendance" className="text-blue-500 hover:underline">
            Attendance
          </a>
        </li>
        <li>
          <a href="/assessment" className="text-blue-500 hover:underline">
            Assessment
          </a>
        </li>
        <li>
          <a href="/resources" className="text-blue-500 hover:underline">
            Resources
          </a>
        </li>
        <li>
          <a href="/classes" className="text-blue-500 hover:underline">
            Classes
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
