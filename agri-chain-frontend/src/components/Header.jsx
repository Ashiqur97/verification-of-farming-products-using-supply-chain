import React from 'react';

const Header = ({ account, onConnectWallet }) => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">AgriChain</h1>
              <p className="text-sm text-gray-600">Transparent Supply Chain Tracking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {account ? (
              <div className="bg-primary-50 px-4 py-2 rounded-lg border border-primary-200">
                <p className="text-sm text-primary-700 font-medium">
                  Connected: {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;