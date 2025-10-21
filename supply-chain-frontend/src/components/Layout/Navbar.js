import React from 'react';
import { Package, Wallet } from 'lucide-react';

const Navbar = ({ account, batchCount, onConnectWallet, isLoading }) => {
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SupplyChain</h1>
              <p className="text-xs text-gray-500">Track & Trace System</p>
            </div>
          </div>

          {/* Stats and Wallet */}
          <div className="flex items-center space-x-4">
            {/* Batch Count */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                {batchCount} Batches
              </span>
            </div>

            {/* Wallet Connection */}
            {account ? (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg border border-green-200">
                <Wallet className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {formatAddress(account)}
                </span>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;