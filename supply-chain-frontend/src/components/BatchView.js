import React, { useState } from 'react';
import { getContract } from '../utils/ethersConfig';
import { CATEGORIES, BATCH_STATUS } from '../utils/constants';

const BatchView = () => {
  const [batchId, setBatchId] = useState('');
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBatch = async () => {
    if (!batchId.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const contract = getContract();
      const batchIndex = await contract.batchIdToIndex(batchId);
      
      if (batchIndex.toString() === '0') {
        setError('Batch not found');
        setBatchData(null);
        return;
      }

      const fullBatch = await contract.getFullBatch(batchIndex);
      const [batchCore, logistics, retail] = fullBatch;
      
      setBatchData({
        core: {
          id: batchCore.id.toString(),
          batchId: batchCore.batchId,
          certificateId: batchCore.certificateId,
          category: CATEGORIES[batchCore.category] || 'Unknown',
          crop: batchCore.crop,
          origin: batchCore.origin,
          harvestDate: new Date(batchCore.harvestDate.toNumber() * 1000).toLocaleDateString(),
          farmer: batchCore.farmer,
          status: BATCH_STATUS[batchCore.status] || BATCH_STATUS[0],
          createdAt: new Date(batchCore.createdAt.toNumber() * 1000).toLocaleString(),
          updatedAt: new Date(batchCore.updatedAt.toNumber() * 1000).toLocaleString()
        },
        logistics: {
          distributor: logistics.distributor,
          retailer: logistics.retailer,
          consumer: logistics.consumer,
          destination: logistics.destination,
          storageConditions: logistics.storageConditions
        },
        retail: {
          farmerName: retail.farmerName,
          retailerName: retail.retailerName,
          packagingDate: retail.packagingDate.toNumber() ? new Date(retail.packagingDate.toNumber() * 1000).toLocaleDateString() : 'Not set',
          arrivalDate: retail.arrivalDate.toNumber() ? new Date(retail.arrivalDate.toNumber() * 1000).toLocaleDateString() : 'Not set',
          stockQuantity: retail.stockQuantity.toString(),
          sellingPrice: retail.sellingPrice.toString(),
          certificationVerified: retail.certificationVerified,
          weight: retail.weight.toString(),
          quality: retail.quality
        }
      });
    } catch (error) {
      console.error('Error fetching batch:', error);
      setError('Error fetching batch: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="card animate-slide-in">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-4">🔍</div>
          <div>
            <h2 className="text-2xl font-bold text-white">Batch Tracking</h2>
            <p className="text-gray-300">Track and view detailed information about any batch</p>
          </div>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Batch ID (e.g., BATCH_001)"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchBatch()}
            className="input-field flex-1"
          />
          <button 
            onClick={fetchBatch} 
            disabled={loading}
            className="btn-primary px-8"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              'Track Batch'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
            <div className="flex items-center">
              <div className="text-2xl mr-3">❌</div>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Batch Details */}
      {batchData && (
        <div className="space-y-6 animate-slide-in">
          {/* Core Information */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="text-3xl mr-4">📄</div>
              <div>
                <h3 className="text-xl font-bold text-white">Batch Core Information</h3>
                <p className="text-gray-300">Fundamental details about the agricultural batch</p>
              </div>
              <div className={`ml-auto px-4 py-2 rounded-full ${batchData.core.status.color} text-white font-semibold flex items-center`}>
                <span className="mr-2">{batchData.core.status.icon}</span>
                {batchData.core.status.name}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard label="Batch ID" value={batchData.core.batchId} icon="🆔" />
              <InfoCard label="Category" value={batchData.core.category} icon="📁" />
              <InfoCard label="Crop Type" value={batchData.core.crop} icon="🌿" />
              <InfoCard label="Origin" value={batchData.core.origin} icon="🌍" />
              <InfoCard label="Harvest Date" value={batchData.core.harvestDate} icon="📅" />
              <InfoCard label="Certificate ID" value={batchData.core.certificateId} icon="🏅" />
              <InfoCard label="Farmer" value={batchData.core.farmer} icon="👨‍🌾" isAddress />
              <InfoCard label="Created" value={batchData.core.createdAt} icon="⏰" />
              <InfoCard label="Last Updated" value={batchData.core.updatedAt} icon="🔄" />
            </div>
          </div>

          {/* Logistics Information */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="text-3xl mr-4">🚚</div>
              <div>
                <h3 className="text-xl font-bold text-white">Logistics Information</h3>
                <p className="text-gray-300">Supply chain movement and handling details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="Distributor" value={batchData.logistics.distributor || 'Not assigned'} icon="🚛" isAddress />
              <InfoCard label="Retailer" value={batchData.logistics.retailer || 'Not assigned'} icon="🏪" isAddress />
              <InfoCard label="Consumer" value={batchData.logistics.consumer || 'Not assigned'} icon="👥" isAddress />
              <InfoCard label="Destination" value={batchData.logistics.destination || 'Not set'} icon="🎯" />
              <InfoCard 
                label="Storage Conditions" 
                value={batchData.logistics.storageConditions || 'Not specified'} 
                icon="🌡️" 
                fullWidth 
              />
            </div>
          </div>

          {/* Retail Information */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="text-3xl mr-4">🏷️</div>
              <div>
                <h3 className="text-xl font-bold text-white">Retail Information</h3>
                <p className="text-gray-300">Pricing, stock, and quality details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard label="Farmer Name" value={batchData.retail.farmerName || 'Not set'} icon="👨‍🌾" />
              <InfoCard label="Retailer Name" value={batchData.retail.retailerName || 'Not set'} icon="🏪" />
              <InfoCard label="Stock Quantity" value={batchData.retail.stockQuantity} icon="📦" />
              <InfoCard label="Selling Price" value={`${batchData.retail.sellingPrice} units`} icon="💰" />
              <InfoCard label="Weight" value={`${batchData.retail.weight} units`} icon="⚖️" />
              <InfoCard 
                label="Certification" 
                value={batchData.retail.certificationVerified ? 'Verified ✅' : 'Not Verified ❌'} 
                icon="🏅" 
              />
              <InfoCard label="Quality" value={batchData.retail.quality || 'Not rated'} icon="⭐" />
              <InfoCard label="Packaging Date" value={batchData.retail.packagingDate} icon="📆" />
              <InfoCard label="Arrival Date" value={batchData.retail.arrivalDate} icon="🚚" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for info cards
const InfoCard = ({ label, value, icon, isAddress = false, fullWidth = false }) => (
  <div className={`glass rounded-xl p-4 ${fullWidth ? 'col-span-full' : ''}`}>
    <div className="flex items-center mb-2">
      <span className="text-2xl mr-3">{icon}</span>
      <span className="text-gray-400 text-sm font-semibold">{label}</span>
    </div>
    <p className="text-white font-mono text-sm break-all">
      {isAddress && value !== 'Not assigned' && value !== 'Not set' 
        ? `${value.slice(0, 6)}...${value.slice(-4)}`
        : value
      }
    </p>
  </div>
);

export default BatchView;