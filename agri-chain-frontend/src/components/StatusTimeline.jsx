import React from 'react';
import { BATCH_STATUS } from '../constants/contract.js';

const StatusTimeline = ({ currentStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Supply Chain Journey</h3>
      <div className="space-y-4">
        {BATCH_STATUS.map((status, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-4 ${
              index <= currentStatus 
                ? 'bg-primary-500 ring-4 ring-primary-100' 
                : 'bg-gray-300'
            }`} />
            <span className={`font-medium ${
              index <= currentStatus ? 'text-primary-700' : 'text-gray-400'
            }`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTimeline;