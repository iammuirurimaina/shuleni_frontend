import React from 'react';

const OwnerSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed">
      <div className="p-4 text-2xl font-bold text-center">School Dashboard</div>
      <ul className="mt-8">
        <li className="py-2 pl-4 hover:bg-gray-700">
          <a href="/profile">Profile</a>
        </li>
        <li className="py-2 pl-4 hover:bg-gray-700">
          <a href="/schools">Schools</a>
        </li>
        <li className="py-2 pl-4 hover:bg-gray-700">
          <a href="/users">Users</a>
        </li>
        <li className="py-2 pl-4 hover:bg-gray-700">
          <a href="/attendance">Attendance</a>
        </li>
        <li className="py-2 pl-4 hover:bg-gray-700">
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default OwnerSidebar;
