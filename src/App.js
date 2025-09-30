import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';

function App() {
  const [activeSection, setActiveSection] = useState('farmer');

  return (
    <Router>
      <div className="bg-gray-100 font-sans flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1">
          <Header />
          <Hero />
          {/* <main className="p-6">
            <Farmer active={activeSection === 'farmer'} />
            <Distributor active={activeSection === 'distributor'} />
            <Retailer active={activeSection === 'retailer'} />
            <Consumer active={activeSection === 'consumer'} />
            <History active={activeSection === 'history'} />
            <Admin active={activeSection === 'admin'} />
          </main> */}
        </div>
      </div>
    </Router>
  );
}

export default App;