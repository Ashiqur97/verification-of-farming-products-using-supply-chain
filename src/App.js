import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; // lowercase
import Header from './components/Header'; // lowercase
import Hero from './components/Hero'; // lowercase
import Farmer from './components/farmer'; // lowercase
import Distributor from './components/Distributor'; // lowercase
import Retailer from './components/Retailer'; // lowercase
import Consumer from './components/Consumer'; // lowercase
import AgricultureCategories from './components/AgricultureCategories'; // This one is correct
import History from './components/History'; // lowercase
import Admin from './components/Admin'; // lowercase
import ChatWidget from './components/ChatWidget'; // This one is correct

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
          <AgricultureCategories active={activeSection === 'categories'} />
          <History active={activeSection === 'history'} />
          <Admin active={activeSection === 'admin'} />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}

export default App;