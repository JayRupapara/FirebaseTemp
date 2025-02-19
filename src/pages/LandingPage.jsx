import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FeatureBox = ({ feature }) => (
  <div 
    className={`bg-blue-600 rounded-lg shadow-lg hover:shadow-2xl 
      transition-all duration-300 transform hover:-translate-y-1 
      ${feature.animation} group cursor-pointer overflow-hidden`}
  >
    {/* Icon header with white background */}
    <div className="bg-white p-4 flex justify-between items-center group-hover:bg-gray-50 transition-colors duration-300">
      <div className="text-3xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <div className="h-px flex-grow mx-4 bg-blue-100"></div>
    </div>
    
    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        {feature.title}
      </h3>
      <p className="text-white text-sm opacity-90">
        {feature.description}
      </p>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      element?.scrollIntoView({ behavior: 'smooth' });
      navigate('/', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const features = [
    {
      title: "Easy Reporting",
      description: "Submit complaints with just a few clicks and receive location for faster resolution.",
      icon: "📝",
      animation: "float-up-down-1"
    },
    {
      title: "Real-time Tracking",
      description: "Monitor the status of your complaints in real-time with detailed progress updates.",
      icon: "🔍",
      animation: "float-up-down-2"
    },
    {
      title: "Direct Communication",
      description: "Stay connected with authorities through our integrated messaging system.",
      icon: "💬",
      animation: "float-up-down-1"
    },
    {
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security and encryption.",
      icon: "🔒",
      animation: "float-up-down-2"
    }
  ];

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleBookAppointment = () => {
    navigate('/signup');
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left side - Feature boxes */}
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <FeatureBox key={index} feature={feature} />
              ))}
            </div>

            {/* Right side - Text content */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Your Voice for a{' '}
                <span className="text-blue-600">Better</span>{' '}
                <br />
                Community
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Empowering citizens with a seamless platform to report, track, and resolve civic issues. 
                Our innovative solution connects you directly with authorities, ensuring faster resolution 
                of your concerns.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Join thousands of citizens who are already making a difference in their communities. 
                Experience real-time tracking, secure communication, and efficient problem resolution 
                all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </button>
                <button 
                  onClick={handleBookAppointment}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition duration-300"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved right after hero */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Happy Patients" },
              { number: "50+", label: "Expert Doctors" },
              { number: "15+", label: "Years Experience" },
              { number: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-white group hover:transform hover:scale-105 
                  transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl font-bold mb-2 group-hover:text-blue-100 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-blue-100 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Key Features
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover how our platform makes civic engagement easier and more effective
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Complaint Management",
                description: "AI-powered system to categorize and route complaints to the right department automatically.",
                icon: "🎯"
              },
              {
                title: "Location Tracking",
                description: "Precise GPS integration for accurate location reporting and faster response times.",
                icon: "📍"
              },
              {
                title: "Mobile Notifications",
                description: "Get instant updates about your complaints directly on your mobile device.",
                icon: "📱"
              },
              {
                title: "Document Upload",
                description: "Easily attach photos and documents to support your complaints.",
                icon: "📎"
              },
              {
                title: "Analytics Dashboard",
                description: "Track complaint patterns and resolution metrics with detailed analytics.",
                icon: "📊"
              },
              {
                title: "Multi-language Support",
                description: "Access the platform in multiple languages for better accessibility.",
                icon: "🌐"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-lg 
                  hover:shadow-2xl transition-all duration-300 
                  hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Our Services
          </h2>
          <p className="text-center text-blue-100 mb-12 max-w-3xl mx-auto">
            Comprehensive healthcare solutions tailored to your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "24/7 Emergency Care",
                description: "Round-the-clock emergency medical services with quick response times.",
                icon: "🏥"
              },
              {
                title: "Expert Consultation",
                description: "Get expert medical advice from our team of specialized doctors.",
                icon: "👨‍⚕️"
              },
              {
                title: "Lab Services",
                description: "State-of-the-art laboratory testing and diagnostic services.",
                icon: "🔬"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg 
                  border border-white/20 hover:bg-white/20 
                  transition duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-blue-100">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Patient",
                text: "Excellent service and very professional staff. The platform made it incredibly easy to track my reports and get timely updates.",
                image: "https://randomuser.me/api/portraits/men/1.jpg"
              },
              {
                name: "Jane Smith",
                role: "Regular User",
                text: "The communication system is fantastic! I love how I can easily stay in touch with the authorities and get quick responses.",
                image: "https://randomuser.me/api/portraits/women/1.jpg"
              },
              {
                name: "Mike Johnson",
                role: "Patient",
                text: "Security and ease of use are top-notch. I feel confident knowing my data is protected while using this platform.",
                image: "https://randomuser.me/api/portraits/men/2.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-lg 
                  hover:shadow-2xl transition-all duration-300 
                  hover:-translate-y-1 group cursor-pointer"
              >
                <div className="flex items-center mb-4 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-600 group-hover:border-blue-700 transition-colors duration-300"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic group-hover:text-gray-700 transition-colors duration-300">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage; 