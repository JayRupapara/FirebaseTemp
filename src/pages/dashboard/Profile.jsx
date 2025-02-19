import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.email}</h2>
            <p className="text-gray-600">Patient</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm">Email</label>
                <p className="text-gray-800">{user?.email}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Member Since</label>
                <p className="text-gray-800">{user?.metadata?.creationTime}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <button className="text-blue-600 hover:text-blue-700">
                Change Password
              </button>
              <button className="text-blue-600 hover:text-blue-700 block">
                Update Email
              </button>
              <button className="text-red-600 hover:text-red-700 block">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 