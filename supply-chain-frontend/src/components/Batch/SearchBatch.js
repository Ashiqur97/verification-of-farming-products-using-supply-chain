import React, { useState } from 'react';
import { Search, Package, Truck, Store, Calendar, MapPin, User } from 'lucide-react';
import Button from '../UI/Button';
import { CATEGORIES, STATUSES } from '../../utils/constants';

const SearchBatch = ({ contract, isLoading }) => {
  const [searchId, setSearchId] = useState('');
  const [batchData, setBatchData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!contract || !searchId) return;

    setIsSearching(true);
    try {
      const data = await contract.getFullBatch(searchId);
      setBatchData(data);
    } catch (error) {
      console.error('Error fetching batch:', error);
      alert('Error fetching batch data. Please check the batch ID.');
      setBatchData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || timestamp === 0) return 'Not set';
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  const formatAddress = (address) => {
    if (!address || address === '0x0000000000000000000000000000000000000000') return 'Not assigned';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (statusIndex) => {
    const colors = {
      0: 'bg-gray-100 text-gray-800 border-gray-300',
      1: 'bg-blue-100 text-blue-800 border-blue-300',
      2: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      3: 'bg-orange-100 text-orange-800 border-orange-300',
      4: 'bg-green-100 text-green-800 border-green-300',
      5: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      6: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[statusIndex] || colors[0];
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Search className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Search Batch</h2>
        </div>
        <p className="text-gray-600">Look up detailed information about any batch</p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch ID
            </label>
            <input
              type="number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter batch ID number"
              min="1"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              loading={isSearching}
              disabled={!searchId}
              variant="secondary"
              className="flex items-center space-x-2 min-w-[120px] bg-indigo-600 hover:bg-indigo-700"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Batch Details */}
      {batchData && (
        <div className="space-y-6">
          {/* Core Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Core Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Batch ID</label>
                <p className="text-lg font-semibold text-gray-900">{batchData[0].batchId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Internal ID</label>
                <p className="text-lg font-semibold text-gray-900">#{batchData[0].id.toString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                <p className="text-lg font-semibold text-gray-900">{CATEGORIES[batchData[0].category]}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Crop</label>
                <p className="text-lg font-semibold text-gray-900">{batchData[0].crop}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Origin</label>
                <p className="text-lg font-semibold text-gray-900">{batchData[0].origin}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(batchData[0].status)}`}>
                  {STATUSES[batchData[0].status]}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Certificate ID</label>
                <p className="text-lg font-semibold text-gray-900">{batchData[0].certificateId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Harvest Date</label>
                <p className="text-lg font-semibold text-gray-900">{batchData[0].harvestDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Creator</label>
                <p className="text-lg font-semibold text-gray-900 flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{formatAddress(batchData[0].creator)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Logistics Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Truck className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Logistics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Destination</span>
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[1].destination || 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Storage Conditions</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[1].storageConditions || 'Not set'}
                </p>
              </div>
            </div>
          </div>

          {/* Retail Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Store className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Retail Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Farmer Name</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[2].farmerName || 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Retailer Name</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[2].retailerName || 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Packaging Date</span>
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {formatTimestamp(batchData[2].packagingDate)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Arrival Date</span>
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {formatTimestamp(batchData[2].arrivalDate)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Stock Quantity</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[2].stockQuantity ? batchData[2].stockQuantity.toString() : '0'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Selling Price</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[2].sellingPrice ? batchData[2].sellingPrice.toString() + ' Wei' : 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Weight</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[2].weight ? batchData[2].weight.toString() + 'g' : 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Quality</label>
                <p className="text-lg font-semibold text-gray-900">
                  {batchData[2].quality || 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Certification</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  batchData[2].certificationVerified 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}>
                  {batchData[2].certificationVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBatch;