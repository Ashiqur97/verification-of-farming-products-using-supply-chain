import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <i className="fas fa-leaf text-green-600 text-2xl mr-2"></i>
        <h1 className="text-xl font-bold text-green-700">VeriFarm</h1>
        <span className="text-xl font-bold text-green-600/100">(verification of farming products)</span>
      </div>
      <span className="text-gray-600">Welcome, User 👤</span>
    </header>
  );
};

export default Header;