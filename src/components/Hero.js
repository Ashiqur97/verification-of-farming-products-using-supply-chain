import React from 'react';
import { FaSeedling, FaShieldAlt, FaSearch, FaCertificate } from 'react-icons/fa';

const Hero = () => {
  const handleExploreCategories = () => {
    // Find the categories button in the sidebar and click it
    const categoriesButton = Array.from(document.querySelectorAll('.sidebar-item'))
      .find(button => button.textContent.includes('Agriculture Categories'));
    
    if (categoriesButton) {
      categoriesButton.click();
    }
  };

  return (
    <section className="hero-bg text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Revolutionizing Food Supply Chain with Blockchain</h1>
            <p className="text-xl mb-8 text-green-100">Track your food from farm to table with transparent, secure, and immutable records.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-6 rounded-lg btn-hover">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-green-700 text-white font-bold py-3 px-6 rounded-lg btn-hover">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 float-animation"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full opacity-10 float-animation" style={{ animationDelay: '1s' }}></div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaSeedling className="text-2xl" />
                    </div>
                    <h3 className="font-bold">Farmers</h3>
                    <p className="text-sm text-green-100">Direct market access</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaShieldAlt className="text-2xl" />
                    </div>
                    <h3 className="font-bold">Security</h3>
                    <p className="text-sm text-green-100">Tamper-proof records</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaSearch className="text-2xl" />
                    </div>
                    <h3 className="font-bold">Traceability</h3>
                    <p className="text-sm text-green-100">End-to-end tracking</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCertificate className="text-2xl" />
                    </div>
                    <h3 className="font-bold">Quality</h3>
                    <p className="text-sm text-green-100">Verified certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Link to Agriculture Categories */}
        <div className="mt-12 text-center">
          <div className="inline-flex rounded-md shadow">
            <button 
              onClick={handleExploreCategories}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 text-green-900"
            >
              Explore Agriculture Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;