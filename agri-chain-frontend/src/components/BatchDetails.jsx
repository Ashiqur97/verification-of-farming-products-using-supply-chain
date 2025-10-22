import React from 'react';
import StatusTimeline from './StatusTimeline';
import { BATCH_STATUS } from '../constants/contract.js';

const BatchDetails = ({ batch, onBack }) => {
  const [batchCore, logistics, retail] = batch;

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 font-semibold mb-4"
      >
        ← Back to Batches
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{batchCore.batchId}</h2>
            <p className="text-gray-600 text-lg mt-2">{batchCore.crop}</p>
          </div>
          <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold">
            {BATCH_STATUS[batchCore.status]}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard title="Basic Information" items={[
                { label: 'Certificate ID', value: batchCore.certificateId },
                { label: 'Category', value: BATCH_STATUS[batchCore.category] },
                { label: 'Origin', value: batchCore.origin },
                { label: 'Harvest Date', value: batchCore.harvestDate }
              ]} />

              <InfoCard title="Logistics" items={[
                { label: 'Destination', value: logistics.destination || 'Not set' },
                { label: 'Storage Conditions', value: logistics.storageConditions || 'Not set' }
              ]} />

              {retail.farmerName && (
                <InfoCard title="Retail Information" items={[
                  { label: 'Farmer', value: retail.farmerName },
                  { label: 'Retailer', value: retail.retailerName },
                  { label: 'Quality', value: retail.quality },
                  { label: 'Weight', value: `${retail.weight} kg` },
                  { label: 'Stock', value: retail.stockQuantity?.toString() },
                  { label: 'Price', value: formatPrice(retail.sellingPrice) },
                  { label: 'Certified', value: retail.certificationVerified ? 'Yes' : 'No' }
                ]} />
              )}
            </div>
          </div>

          {/* Status Timeline */}
          <div>
            <StatusTimeline currentStatus={batchCore.status} />
            
            {/* Additional Info */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{formatDate(batchCore.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{formatDate(batchCore.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator:</span>
                  <span className="font-medium text-xs">{batchCore.creator}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, items }) => (
  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
    <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span className="text-gray-600">{item.label}:</span>
          <span className="font-medium text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default BatchDetails;