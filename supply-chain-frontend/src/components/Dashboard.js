import React from 'react';
import { BATCH_STATUS } from '../utils/constants';

const Dashboard = () => {
  const roleCards = [
    {
      role: 'FARMER',
      icon: '🌾',
      description: 'Create batches and manage logistics',
      actions: ['Create Batches', 'Set Logistics', 'Assign Distributors']
    },
    {
      role: 'DISTRIBUTOR', 
      icon: '🚚',
      description: 'Process and package batches for distribution',
      actions: ['Mark Processed', 'Package Batches']
    },
    {
      role: 'RETAILER',
      icon: '🏪',
      description: 'Manage retail information and sales',
      actions: ['Update Retail Info', 'Put for Sale', 'Sell to Consumers']
    },
    {
      role: 'CONSUMER',
      icon: '👥',
      description: 'View batch information and purchase products',
      actions: ['View Batch Details', 'Purchase Products']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="card border border-gray-300/50 animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
              Supply Chain Dashboard
            </h1>
            <p className="text-gray-600 text-lg">All features unlocked for testing</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-700 border border-green-500/50">
              <span className="text-2xl mr-2">✅</span>
              <span className="font-semibold">All Roles Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleCards.map((roleCard, index) => (
          <div
            key={roleCard.role}
            className="card border border-gray-300 bg-gray-50 transition-all duration-500 hover:scale-105 hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4 animate-float">{roleCard.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {roleCard.role}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{roleCard.description}</p>
              
              <div className="space-y-2">
                {roleCard.actions.map((action, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                    <span className="text-gray-700">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300/50">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📊</div>
            <div>
              <p className="text-gray-600 text-sm">Available Actions</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300/50">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🔄</div>
            <div>
              <p className="text-gray-600 text-sm">Batch Status</p>
              <p className="text-2xl font-bold text-gray-800">{Object.keys(BATCH_STATUS).length}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-300/50">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🌍</div>
            <div>
              <p className="text-gray-600 text-sm">Supply Chain</p>
              <p className="text-2xl font-bold text-gray-800">4 Stages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;