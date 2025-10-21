import React, { useState } from 'react';
import { Truck, MapPin } from 'lucide-react';
import Button from '../UI/Button';

const Logistics = ({ contract, executeContractFunction, isLoading }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    destination: '',
    storageConditions: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await executeContractFunction(
        () => contract.setLogistics(
          formData.batchId,
          formData.destination,
          formData.storageConditions
        ),
        'Logistics updated successfully!'
      );

      setFormData({
        batchId: '',
        destination: '',
        storageConditions: ''
      });
    } catch (error) {
      console.error('Error updating logistics:', error);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Update Logistics</h2>
        </div>
        <p className="text-gray-600">Set transportation and storage details for batches</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter batch ID number"
                required
                min="1"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter destination address"
                  required
                />
              </div>
            </div>

            {/* Storage Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Conditions *
              </label>
              <textarea
                value={formData.storageConditions}
                onChange={(e) => handleInputChange('storageConditions', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Refrigerated at 4°C, Humidity controlled"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!formData.batchId || !formData.destination}
              variant="secondary"
              className="flex items-center space-x-2 min-w-[140px]"
            >
              <Truck className="w-4 h-4" />
              <span>Update Logistics</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logistics;