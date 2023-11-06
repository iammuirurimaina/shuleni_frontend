import React from 'react';
import Sidebar from './Sidebar';

const OwnerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10">
        
        <h1 className="text-3xl font-semibold mb-6">Owner's Dashboard</h1>
        
      </div>
    </div>
  );
};

export default OwnerDashboard;
