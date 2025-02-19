import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  // Protect dashboard routes
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="h-screen flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 