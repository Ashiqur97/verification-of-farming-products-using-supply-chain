import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import Farmer from './components/farmer';
import Distributor from './components/Distributor';
import Retailer from './components/Retailer';
import Consumer from './components/Consumer';
import History from './components/History';
import Admin from './components/Admin';
import ChatWidget from './components/ChatWidget';

function App() {
  const [activeSection, setActiveSection] = useState('farmer');

  return (
    <div className="bg-gray-100 font-sans flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1">
        <Header />
        <Hero />
        <main className="p-6">
          <Farmer active={activeSection === 'farmer'} />
          <Distributor active={activeSection === 'distributor'} />
          <Retailer active={activeSection === 'retailer'} />
          <Consumer active={activeSection === 'consumer'} />
          <History active={activeSection === 'history'} />
          <Admin active={activeSection === 'admin'} />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}

export default App;