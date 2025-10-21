import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import { STATUSES } from '../../utils/constants';

const UpdateStatus = ({ contract, executeContractFunction, isLoading }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    status: 0
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await executeContractFunction(
        () => contract.updateBatchStatus(formData.batchId, formData.status),
        'Status updated successfully!'
      );

      setFormData({
        batchId: '',
        status: 0
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (statusIndex) => {
    const colors = {
      0: 'bg-gray-100 text-gray-800', // Created
      1: 'bg-blue-100 text-blue-800', // In Transit
      2: 'bg-yellow-100 text-yellow-800', // Processed
      3: 'bg-orange-100 text-orange-800', // Packaged
      4: 'bg-green-100 text-green-800', // For Sale
      5: 'bg-emerald-100 text-emerald-800', // Sold
      6: 'bg-red-100 text-red-800', // Recalled
    };
    return colors[statusIndex] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-orange-100 p-2 rounded-lg">
            <RefreshCw className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Update Batch Status</h2>
        </div>
        <p className="text-gray-600">Track and update the progress of your batches</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Batch ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID *
              </label>
              <input
                type="number"
                value={formData.batchId}
                onChange={(e) => handleInputChange('batchId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter batch ID number"
                required
                min="1"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                {STATUSES.map((status, index) => (
                  <option key={status} value={index}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Preview */}
            {formData.status !== '' && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Status Preview</span>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(formData.status)}`}>
                  {STATUSES[formData.status]}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!formData.batchId}
              className="flex items-center space-x-2 min-w-[140px] bg-orange-600 hover:bg-orange-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Update Status</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatus;