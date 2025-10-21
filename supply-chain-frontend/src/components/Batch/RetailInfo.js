import React, { useState } from 'react';
import { Store, DollarSign, Package, Scale, CheckCircle } from 'lucide-react';
import Button from '../UI/Button';

const RetailInfo = ({ contract, executeContractFunction, isLoading }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    packagingDate: '',
    arrivalDate: '',
    stockQuantity: '',
    sellingPrice: '',
    certificationVerified: false,
    weight: '',
    quality: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await executeContractFunction(
        () => contract.updateRetailInfo(
          formData.batchId,
          formData.packagingDate || 0,
          formData.arrivalDate || 0,
          formData.stockQuantity || 0,
          formData.sellingPrice || 0,
          formData.certificationVerified,
          formData.weight || 0,
          formData.quality
        ),
        'Retail info updated successfully!'
      );

      setFormData({
        batchId: '',
        packagingDate: '',
        arrivalDate: '',
        stockQuantity: '',
        sellingPrice: '',
        certificationVerified: false,
        weight: '',
        quality: ''
      });
    } catch (error) {
      console.error('Error updating retail info:', error);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Store className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Retail Information</h2>
        </div>
        <p className="text-gray-600">Add retail and sales details for batches</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Batch ID */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID *
              </label>
              <input
                type="number"
                value={formData.batchId}
                onChange={(e) => handleInputChange('batchId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter batch ID number"
                required
                min="1"
              />
            </div>

            {/* Packaging Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Packaging Date
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="datetime-local"
                  value={formData.packagingDate}
                  onChange={(e) => handleInputChange('packagingDate', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Arrival Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arrival Date
              </label>
              <input
                type="datetime-local"
                value={formData.arrivalDate}
                onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="e.g., 1000"
                min="0"
              />
            </div>

            {/* Selling Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price (Wei)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.sellingPrice}
                  onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Price in Wei"
                  min="0"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (grams)
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Weight in grams"
                  min="0"
                />
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality Grade
              </label>
              <input
                type="text"
                value={formData.quality}
                onChange={(e) => handleInputChange('quality', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="e.g., Premium, Grade A"
              />
            </div>

            {/* Certification Verified */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.certificationVerified}
                  onChange={(e) => handleInputChange('certificationVerified', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Certification Verified
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!formData.batchId}
              className="flex items-center space-x-2 min-w-[140px] bg-purple-600 hover:bg-purple-700"
            >
              <Store className="w-4 h-4" />
              <span>Update Retail Info</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RetailInfo;