import React from 'react';
import { BATCH_STATUS } from '../constants/contract.js';

const BatchCard = ({ batch, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      0: 'bg-blue-100 text-blue-800',
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-purple-100 text-purple-800',
      4: 'bg-indigo-100 text-indigo-800',
      5: 'bg-gray-100 text-gray-800',
      6: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{batch.batchId}</h3>
            <p className="text-gray-600">{batch.crop}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(batch.status)}`}>
            {BATCH_STATUS[batch.status]}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-20">Origin:</span>
            <span>{batch.origin}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-20">Harvest:</span>
            <span>{batch.harvestDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-20">Category:</span>
            <span className="capitalize">{batch.category}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Created: {new Date(batch.createdAt * 1000).toLocaleDateString()}</span>
            <span>ID: #{batch.id.toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchCard;