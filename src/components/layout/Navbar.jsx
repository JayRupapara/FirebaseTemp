import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">MediCare</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('services')} 
              className="text-gray-700 hover:text-blue-600"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('features')} 
              className="text-gray-700 hover:text-blue-600"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavigation('testimonials')} 
              className="text-gray-700 hover:text-blue-600"
            >
              Testimonials
            </button>
            <button 
              onClick={() => navigate('/signin')} 
              className="text-blue-600 hover:text-blue-700"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 