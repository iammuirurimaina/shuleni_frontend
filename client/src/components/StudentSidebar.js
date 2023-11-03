import React from 'react';

const StudentSidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 fixed top-0 left-0 z-50">
      <div className="p-4 text-white">
        <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
        <ul>
          <li className="mb-2">
            <a href="/profile" className="text-white hover:text-yellow-500">Profile</a>
          </li>
          <li className="mb-2">
            <a href="/classes" className="text-white hover:text-yellow-500">Classes</a>
          </li>
          <li className="mb-2">
            <a href="/assessment" className="text-white hover:text-yellow-500">Assessment</a>
          </li>
          <li className="mb-2">
            <a href="/resources" className="text-white hover:text-yellow-500">Resources</a>
          </li>
          <li className="mb-2">
            <a href="/logout" className="text-white hover:text-yellow-500">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentSidebar;
