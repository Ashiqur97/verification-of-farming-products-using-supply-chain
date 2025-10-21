import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ 
  children, 
  account, 
  batchCount, 
  onConnectWallet, 
  isLoading,
  activeTab,
  onTabChange 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar
        account={account}
        batchCount={batchCount}
        onConnectWallet={onConnectWallet}
        isLoading={isLoading}
      />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
        />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;