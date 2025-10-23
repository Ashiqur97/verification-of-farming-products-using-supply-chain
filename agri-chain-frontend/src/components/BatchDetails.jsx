import React from 'react';
import StatusTimeline from './StatusTimeline';
import BatchActions from './BatchActions';
import { BATCH_STATUS, CATEGORIES } from '../constants/contract';

const BatchDetails = ({ batch, onBack, onUpdateLogistics, onUpdateRetail, onUpdateStatus, onRefresh }) => {
  const [batchCore, logistics, retail] = batch;

  const handleUpdate = async (type, batchId, data) => {
    let success = false;
    
    switch (type) {
      case 'logistics':
        success = await onUpdateLogistics(batchId, data);
        break;
      case 'retail':
        success = await onUpdateRetail(batchId, data);
        break;
      case 'status':
        success = await onUpdateStatus(batchId, data);
        break;
      default:
        break;
    }

    if (success && onRefresh) {
      onRefresh();
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center text-primary-600 hover:text-primary-700 font-semibold"
        >
          ← Back to Batches
        </button>
        <button
          onClick={onRefresh}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Batch Information */}
        <div className="lg:col-span-2 space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Farm Information */}
              <InfoCard title="Farm Information" items={[
                { label: 'Certificate ID', value: batchCore.certificateId },
                { label: 'Category', value: CATEGORIES[batchCore.category] },
                { label: 'Crop', value: batchCore.crop },
                { label: 'Origin', value: batchCore.origin },
                { label: 'Harvest Date', value: batchCore.harvestDate },
                { label: 'Created', value: new Date(batchCore.createdAt * 1000).toLocaleDateString() },
                { label: 'Last Updated', value: new Date(batchCore.updatedAt * 1000).toLocaleDateString() },
                { label: 'Creator', value: formatAddress(batchCore.creator) }
              ]} />

              {/* Processing Information */}
              {logistics.processor && (
                <InfoCard title="Processing Information" items={[
                  { label: 'Processor', value: logistics.processor },
                  { label: 'Processing Date', value: logistics.processingDate },
                  { label: 'Destination', value: logistics.destination },
                  { label: 'Storage Conditions', value: logistics.storageConditions }
                ]} />
              )}

              {/* Retail Information */}
              {retail.brand && (
                <InfoCard title="Retail Information" items={[
                  { label: 'Brand', value: retail.brand },
                  { label: 'Packaging Date', value: retail.packagingDate },
                  { label: 'Weight', value: `${retail.weight} kg` },
                  { label: 'Quality', value: retail.quality },
                  { label: 'Selling Price', value: `$${retail.sellingPrice}` },
                  { label: 'Certifications', value: retail.certifications },
                  { label: 'Certification Verified', value: retail.certificationVerified ? 'Yes' : 'No' }
                ]} />
              )}
            </div>

            {/* Empty State Messages */}
            {!logistics.processor && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <span className="font-semibold">Processing information not added yet.</span> 
                  Use the form on the right to add logistics details.
                </p>
              </div>
            )}

            {!retail.brand && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <span className="font-semibold">Retail information not added yet.</span> 
                  Use the form on the right to add brand and packaging details.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <StatusTimeline currentStatus={batchCore.status} />
          <BatchActions 
            batchId={batchCore.id} 
            onUpdateLogistics={(batchId, data) => handleUpdate('logistics', batchId, data)}
            onUpdateRetail={(batchId, data) => handleUpdate('retail', batchId, data)}
            onUpdateStatus={(batchId, data) => handleUpdate('status', batchId, data)}
          />
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
          <span className="text-gray-600 text-sm">{item.label}:</span>
          <span className="font-medium text-gray-900 text-sm text-right max-w-xs break-words">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default BatchDetails;