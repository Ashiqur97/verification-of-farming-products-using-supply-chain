import React from 'react';
import { useRoleCheck } from '../hooks/useRoleCheck';
import { TEST_ADDRESSES } from '../utils/constants';

const RoleIndicator = () => {
  const { currentRole, userRoles, userAddress, loading, refreshRoles } = useRoleCheck();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
        <span className="ml-2 text-gray-300">Detecting roles...</span>
      </div>
    );
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Farmer 🌾': return 'from-green-500 to-emerald-500';
      case 'Distributor 🚚': return 'from-blue-500 to-cyan-500';
      case 'Retailer 🏪': return 'from-purple-500 to-pink-500';
      case 'Consumer 👥': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTestAccountInfo = (address) => {
    for (const [role, testAddress] of Object.entries(TEST_ADDRESSES)) {
      if (testAddress.toLowerCase() === address.toLowerCase()) {
        return { type: 'Test Account', role: role.charAt(0) + role.slice(1).toLowerCase() };
      }
    }
    return { type: 'Custom Account', role: 'Unknown' };
  };

  const accountInfo = getTestAccountInfo(userAddress);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Account & Role</h3>
        <button
          onClick={refreshRoles}
          className="text-sm btn-secondary py-1 px-3"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Current Role Badge */}
      <div className={`bg-gradient-to-r ${getRoleColor(currentRole)} rounded-xl p-4 text-center mb-4 animate-pulse`}>
        <div className="text-2xl mb-2">{currentRole.split(' ')[1]}</div>
        <div className="text-white font-bold text-lg">{currentRole}</div>
        <div className="text-white/80 text-sm mt-1">Active Role</div>
      </div>

      {/* Account Information */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Address:</span>
          <span className="text-white font-mono text-sm">
            {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Account Type:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            accountInfo.type === 'Test Account' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-blue-500/20 text-blue-400'
          }`}>
            {accountInfo.type}
          </span>
        </div>

        {/* All Available Roles */}
        <div className="mt-4">
          <h4 className="text-gray-400 text-sm font-semibold mb-2">Available Roles:</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(userRoles).map(([role, hasRole]) => (
              <div
                key={role}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  hasRole ? 'bg-green-500/20 border border-green-500/30' : 'bg-gray-500/20'
                }`}
              >
                <span className={`text-sm ${hasRole ? 'text-green-400' : 'text-gray-500'}`}>
                  {role}
                </span>
                <span className={hasRole ? 'text-green-400' : 'text-gray-500'}>
                  {hasRole ? '✅' : '❌'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-400 text-sm">
          💡 <strong>Switch Accounts:</strong> Change account in MetaMask to automatically update roles
        </p>
      </div>
    </div>
  );
};

export default RoleIndicator;