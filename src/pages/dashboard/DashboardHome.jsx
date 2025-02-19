import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Upcoming</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
          <p className="text-3xl font-bold text-gray-600 mt-2">16</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 