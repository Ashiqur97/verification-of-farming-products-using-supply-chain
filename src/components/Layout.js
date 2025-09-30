import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Hero from './Hero';

const Layout = ({ children, activeSection, setActiveSection }) => {
  return (
    <div className="bg-gray-100 font-sans flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1">
        <Header />
        <Hero />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;