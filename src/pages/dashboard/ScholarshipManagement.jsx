import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast from 'react-hot-toast';

const ScholarshipManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [formData, setFormData] = useState({
    scholarshipName: '',
    amount: '',
    maxFamilyIncome: '',
    minAcademicPercentage: '',
    qualification: 'Select',
    category: 'Select',
    disability: 'No',
    duration: 'Select',
    sahayType: 'Select',
    lastDate: '',
    otherRequirements: ''
  });

  // Add these arrays for select options
  const qualificationOptions = [
    'Select',
    '10th',
    '12th',
    'Undergraduate',
    'Postgraduate',
    'PhD'
  ];

  const categoryOptions = [
    'Select',
    'General',
    'OBC',
    'SC',
    'ST',
    'Minority'
  ];

  const durationOptions = [
    'Select',
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    'Course Duration'
  ];

  const sahayTypeOptions = [
    'Select',
    'Merit Based',
    'Means Based',
    'Cultural',
    'Sports',
    'Research'
  ];

  // Fetch scholarships on component mount
  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'scholarships'));
      const scholarshipsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setScholarships(scholarshipsData);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast.error('Failed to fetch scholarships');
    }
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      scholarshipName: scholarship.scholarshipName,
      amount: scholarship.amount,
      maxFamilyIncome: scholarship.maxFamilyIncome,
      minAcademicPercentage: scholarship.minAcademicPercentage,
      qualification: scholarship.qualification,
      category: scholarship.category,
      disability: scholarship.disability,
      duration: scholarship.duration,
      sahayType: scholarship.sahayType,
      lastDate: scholarship.lastDate,
      otherRequirements: scholarship.otherRequirements
    });
    setShowModal(true);
  };

  const handleDelete = async (scholarshipId) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await deleteDoc(doc(db, 'scholarships', scholarshipId));
        toast.success('Scholarship deleted successfully');
        fetchScholarships(); // Refresh the list
      } catch (error) {
        console.error('Error deleting scholarship:', error);
        toast.error('Failed to delete scholarship');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingScholarship) {
        // Update existing scholarship
        await updateDoc(doc(db, 'scholarships', editingScholarship.id), {
          ...formData,
          updatedAt: new Date().toISOString()
        });
        toast.success('Scholarship updated successfully!');
      } else {
        // Create new scholarship
        await addDoc(collection(db, 'scholarships'), {
          ...formData,
          createdAt: new Date().toISOString()
        });
        toast.success('Scholarship created successfully!');
      }

      setShowModal(false);
      fetchScholarships();
      setFormData({
        scholarshipName: '',
        amount: '',
        maxFamilyIncome: '',
        minAcademicPercentage: '',
        qualification: 'Select',
        category: 'Select',
        disability: 'No',
        duration: 'Select',
        sahayType: 'Select',
        lastDate: '',
        otherRequirements: ''
      });
      setEditingScholarship(null);
    } catch (error) {
      console.error('Error saving scholarship:', error);
      toast.error(`Failed to ${editingScholarship ? 'update' : 'create'} scholarship`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Scholarships</h1>
        <button
          onClick={() => {
            setEditingScholarship(null);
            setFormData({
              scholarshipName: '',
              amount: '',
              maxFamilyIncome: '',
              minAcademicPercentage: '',
              qualification: 'Select',
              category: 'Select',
              disability: 'No',
              duration: 'Select',
              sahayType: 'Select',
              lastDate: '',
              otherRequirements: ''
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New
        </button>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qualification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{scholarship.scholarshipName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{scholarship.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{scholarship.maxFamilyIncome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{scholarship.minAcademicPercentage}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">{scholarship.qualification}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{scholarship.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{scholarship.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{scholarship.lastDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(scholarship)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(scholarship.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Scholarship Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingScholarship ? 'Edit Scholarship' : 'Create New Scholarship'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Scholarship Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  value={formData.scholarshipName}
                  onChange={(e) => setFormData({...formData, scholarshipName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Amount and Max Family Income */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Family Income (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.maxFamilyIncome}
                    onChange={(e) => setFormData({...formData, maxFamilyIncome: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Min Academic % */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Min Academic %
                </label>
                <input
                  type="number"
                  value={formData.minAcademicPercentage}
                  onChange={(e) => setFormData({...formData, minAcademicPercentage: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Qualification, Category, and Disability */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Qualification
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {qualificationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {categoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Disability
                  </label>
                  <select
                    value={formData.disability}
                    onChange={(e) => setFormData({...formData, disability: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* Duration, Sahay Type, and Last Date */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {durationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sahay Type
                  </label>
                  <select
                    value={formData.sahayType}
                    onChange={(e) => setFormData({...formData, sahayType: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {sahayTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Date
                  </label>
                  <input
                    type="date"
                    value={formData.lastDate}
                    onChange={(e) => setFormData({...formData, lastDate: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Other Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Other Requirements
                </label>
                <textarea
                  value={formData.otherRequirements}
                  onChange={(e) => setFormData({...formData, otherRequirements: e.target.value})}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter any additional requirements"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Scholarship'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipManagement; 