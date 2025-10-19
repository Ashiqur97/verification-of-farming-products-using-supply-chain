import React from 'react';
import { useRoleCheck } from '../hooks/useRoleCheck';
import { ROLE_NAMES, BATCH_STATUS } from '../utils/constants';

const Dashboard = () => {
  const { currentRole, userRoles, canCreateBatch, canManageLogistics, canProcessBatch, canUpdateRetail } = useRoleCheck();

  const roleCards = [
    {
      role: 'FARMER',
      icon: '🌾',
      description: 'Create batches and manage logistics',
      active: userRoles.FARMER,
      actions: ['Create Batches', 'Set Logistics', 'Assign Distributors']
    },
    {
      role: 'DISTRIBUTOR', 
      icon: '🚚',
      description: 'Process and package batches for distribution',
      active: userRoles.DISTRIBUTOR,
      actions: ['Mark Processed', 'Package Batches']
    },
    {
      role: 'RETAILER',
      icon: '🏪',
      description: 'Manage retail information and sales',
      active: userRoles.RETAILER,
      actions: ['Update Retail Info', 'Put for Sale', 'Sell to Consumers']
    },
    {
      role: 'CONSUMER',
      icon: '👥',
      description: 'View batch information and purchase products',
      active: userRoles.CONSUMER,
      actions: ['View Batch Details', 'Purchase Products']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="card animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Supply Chain Dashboard
            </h1>
            <p className="text-gray-300 text-lg">Manage your agricultural supply chain efficiently</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/50">
              <span className="text-2xl mr-2">{currentRole.split(' ')[1]}</span>
              <span className="text-white font-semibold">{currentRole}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleCards.map((roleCard, index) => (
          <div
            key={roleCard.role}
            className={`card transform transition-all duration-500 hover:scale-105 ${
              roleCard.active 
                ? 'border-2 border-primary-500 animate-glow' 
                : 'opacity-50 grayscale'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4 animate-float">{roleCard.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {ROLE_NAMES[`${roleCard.role}_ROLE`]}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{roleCard.description}</p>
              
              <div className="space-y-2">
                {roleCard.actions.map((action, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      roleCard.active ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                    }`}></div>
                    <span className={roleCard.active ? 'text-gray-200' : 'text-gray-500'}>
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
        <div className="card bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📊</div>
            <div>
              <p className="text-gray-300 text-sm">Available Actions</p>
              <p className="text-2xl font-bold text-white">
                {[canCreateBatch, canManageLogistics, canProcessBatch, canUpdateRetail].filter(Boolean).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🔄</div>
            <div>
              <p className="text-gray-300 text-sm">Batch Status</p>
              <p className="text-2xl font-bold text-white">{Object.keys(BATCH_STATUS).length}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500/20 to-emerald-500/20">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🌍</div>
            <div>
              <p className="text-gray-300 text-sm">Supply Chain</p>
              <p className="text-2xl font-bold text-white">4 Stages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;