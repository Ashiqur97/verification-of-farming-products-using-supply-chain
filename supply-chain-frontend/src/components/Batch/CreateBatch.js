import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import Button from '../UI/Button';
import { CATEGORIES } from '../../utils/constants';

const CreateBatch = ({ contract, executeContractFunction, isLoading }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    certificateId: '',
    category: 0,
    crop: '',
    origin: '',
    harvestTimestamp: '',
    harvestDate: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await executeContractFunction(
        () => contract.createBatch(
          formData.batchId,
          formData.certificateId,
          formData.category,
          formData.crop,
          formData.origin,
          Math.floor(new Date(formData.harvestTimestamp).getTime() / 1000),
          formData.harvestDate
        ),
        'Batch created successfully!'
      );

      // Reset form
      setFormData({
        batchId: '',
        certificateId: '',
        category: 0,
        crop: '',
        origin: '',
        harvestTimestamp: '',
        harvestDate: ''
      });
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-green-100 p-2 rounded-lg">
            <Plus className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Batch</h2>
        </div>
        <p className="text-gray-600">Add a new product batch to the supply chain</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Batch ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID *
              </label>
              <input
                type="text"
                value={formData.batchId}
                onChange={(e) => handleInputChange('batchId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter unique batch ID"
                required
              />
            </div>

            {/* Certificate ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate ID *
              </label>
              <input
                type="text"
                value={formData.certificateId}
                onChange={(e) => handleInputChange('certificateId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter certificate ID"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {CATEGORIES.map((category, index) => (
                  <option key={category} value={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Crop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop/Product Name *
              </label>
              <input
                type="text"
                value={formData.crop}
                onChange={(e) => handleInputChange('crop', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., Organic Tomatoes"
                required
              />
            </div>

            {/* Origin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin *
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., California, USA"
                required
              />
            </div>

            {/* Harvest Timestamp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harvest Date & Time *
              </label>
              <input
                type="datetime-local"
                value={formData.harvestTimestamp}
                onChange={(e) => handleInputChange('harvestTimestamp', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Harvest Date String */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harvest Date (Display Format) *
              </label>
              <input
                type="text"
                value={formData.harvestDate}
                onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., December 15, 2024"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!formData.batchId || !formData.certificateId}
              className="flex items-center space-x-2 min-w-[140px]"
            >
              <Package className="w-4 h-4" />
              <span>Create Batch</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;