import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'farmer', label: '👨‍🌾 Farmer' },
    { id: 'distributor', label: '🚚 Distributor' },
    { id: 'retailer', label: '🏬 Retailer' },
    { id: 'consumer', label: '🛒 Consumer' },
    { id: 'history', label: '📜 History' },
    { id: 'admin', label: '⚙️ Admin' },
  ];

  return (
    <aside className="w-64 bg-green-700 text-white h-screen sticky top-0 flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-green-500">
        🌱 AgriChain
      </div>
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`sidebar-item block w-full text-left py-2 px-4 rounded-lg hover:bg-green-600 ${
              activeSection === item.id ? 'active' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-green-500">
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg">
          Connect MetaMask
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;