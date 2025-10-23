import React, { useState } from 'react';

const BatchActions = ({ batchId, onUpdateLogistics, onUpdateRetail, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState('logistics');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Batch</h3>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('logistics')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'logistics' 
              ? 'border-b-2 border-primary-500 text-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Logistics
        </button>
        <button
          onClick={() => setActiveTab('retail')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'retail' 
              ? 'border-b-2 border-primary-500 text-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Retail Info
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'status' 
              ? 'border-b-2 border-primary-500 text-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Status
        </button>
      </div>

      {/* Logistics Form */}
      {activeTab === 'logistics' && (
        <LogisticsForm batchId={batchId} onSubmit={onUpdateLogistics} />
      )}

      {/* Retail Form */}
      {activeTab === 'retail' && (
        <RetailForm batchId={batchId} onSubmit={onUpdateRetail} />
      )}

      {/* Status Form */}
      {activeTab === 'status' && (
        <StatusForm batchId={batchId} onSubmit={onUpdateStatus} />
      )}
    </div>
  );
};

// Sub-components for each form
const LogisticsForm = ({ batchId, onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    storageConditions: '',
    processor: '',
    processingDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(batchId, formData);
    // Reset form
    setFormData({
      destination: '',
      storageConditions: '',
      processor: '',
      processingDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Processor</label>
        <input
          type="text"
          value={formData.processor}
          onChange={(e) => setFormData({...formData, processor: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., Dinajpur Rice Mills Ltd."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Processing Date</label>
        <input
          type="text"
          value={formData.processingDate}
          onChange={(e) => setFormData({...formData, processingDate: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., 5 December 2025"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., Dhaka Distribution Center"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Storage Conditions</label>
        <input
          type="text"
          value={formData.storageConditions}
          onChange={(e) => setFormData({...formactData, storageConditions: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., Cool, dry place"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
      >
        Update Logistics
      </button>
    </form>
  );
};

const RetailForm = ({ batchId, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: '',
    packagingDate: '',
    weight: '',
    quality: '',
    sellingPrice: '',
    certificationVerified: false,
    certifications: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(batchId, formData);
    // Reset form
    setFormData({
      brand: '',
      packagingDate: '',
      weight: '',
      quality: '',
      sellingPrice: '',
      certificationVerified: false,
      certifications: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., Golden Harvest Rice"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Date</label>
        <input
          type="text"
          value={formData.packagingDate}
          onChange={(e) => setFormData({...formData, packagingDate: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., 10 December 2025"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="25"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
          <input
            type="number"
            value={formData.sellingPrice}
            onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="100"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
        <input
          type="text"
          value={formData.quality}
          onChange={(e) => setFormData({...formData, quality: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., Premium"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
        <input
          type="text"
          value={formData.certifications}
          onChange={(e) => setFormData({...formData, certifications: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., ISO 22000, Halal"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.certificationVerified}
          onChange={(e) => setFormData({...formData, certificationVerified: e.target.checked})}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Certification Verified</label>
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
      >
        Update Retail Info
      </button>
    </form>
  );
};

const StatusForm = ({ batchId, onSubmit }) => {
  const [status, setStatus] = useState('2'); // Default to Processed

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(batchId, parseInt(status));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="0">Created</option>
          <option value="1">InTransit</option>
          <option value="2">Processed</option>
          <option value="3">Packaged</option>
          <option value="4">ForSale</option>
          <option value="5">Sold</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
      >
        Update Status
      </button>
    </form>
  );
};

export default BatchActions;