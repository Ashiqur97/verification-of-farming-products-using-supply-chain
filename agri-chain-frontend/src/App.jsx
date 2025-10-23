import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BatchCard from './components/BatchCard';
import CreateBatchForm from './components/CreateBatchForm';
import BatchDetails from './components/BatchDetails';
import { 
  connectWallet, 
  createBatch, 
  getTotalBatches, 
  getBatchDetails,
  updateLogistics,
  updateRetailInfo,
  updateBatchStatus
} from './utils/blockchain';

function App() {
  const [account, setAccount] = useState('');
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (account) {
      loadBatches();
    }
  }, [account]);

  const handleConnectWallet = async () => {
    const acc = await connectWallet();
    setAccount(acc);
  };

  const loadBatches = async () => {
    if (!account) return;
    
    setIsLoading(true);
    try {
      const total = await getTotalBatches();
      const batchPromises = [];
      
      for (let i = 1; i <= total; i++) {
        batchPromises.push(getBatchDetails(i));
      }
      
      const batchData = await Promise.all(batchPromises);
      setBatches(batchData.filter(batch => batch && batch[0].id.toString() !== '0'));
    } catch (error) {
      console.error('Error loading batches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBatch = async (batchData) => {
    setIsLoading(true);
    const success = await createBatch(batchData);
    if (success) {
      setShowCreateForm(false);
      await loadBatches();
      alert('Batch created successfully!');
    } else {
      alert('Error creating batch. Please check console for details.');
    }
    setIsLoading(false);
  };

  const handleUpdateLogistics = async (batchId, logisticsData) => {
    setIsLoading(true);
    const success = await updateLogistics(batchId, logisticsData);
    if (success) {
      await loadBatches();
      alert('Logistics updated successfully!');
    } else {
      alert('Error updating logistics.');
    }
    setIsLoading(false);
  };

  const handleUpdateRetail = async (batchId, retailData) => {
    setIsLoading(true);
    const success = await updateRetailInfo(batchId, retailData);
    if (success) {
      await loadBatches();
      alert('Retail info updated successfully!');
    } else {
      alert('Error updating retail info.');
    }
    setIsLoading(false);
  };

  const handleUpdateStatus = async (batchId, status) => {
    setIsLoading(true);
    const success = await updateBatchStatus(batchId, status);
    if (success) {
      await loadBatches();
      alert('Status updated successfully!');
    } else {
      alert('Error updating status.');
    }
    setIsLoading(false);
  };

  const refreshBatchData = async () => {
    await loadBatches();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header account={account} onConnectWallet={handleConnectWallet} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!account ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔗</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your MetaMask wallet to start tracking your agricultural supply chain on the blockchain.
              </p>
              <button
                onClick={handleConnectWallet}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Connect MetaMask
              </button>
            </div>
          </div>
        ) : selectedBatch ? (
          <BatchDetails 
            batch={selectedBatch} 
            onBack={() => setSelectedBatch(null)}
            onUpdateLogistics={handleUpdateLogistics}
            onUpdateRetail={handleUpdateRetail}
            onUpdateStatus={handleUpdateStatus}
            onRefresh={refreshBatchData}
          />
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Supply Chain Batches</h2>
                <p className="text-gray-600 mt-2">Track your agricultural products from farm to consumer</p>
              </div>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {showCreateForm ? 'View Batches' : 'Create New Batch'}
              </button>
            </div>

            {showCreateForm ? (
              <CreateBatchForm 
                onCreateBatch={handleCreateBatch}
                isLoading={isLoading}
              />
            ) : (
              <>
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading batches from blockchain...</p>
                  </div>
                ) : batches.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">🌾</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No batches found</h3>
                    <p className="text-gray-600 mb-6">Create your first batch to start tracking</p>
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Create First Batch
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batches.map((batch, index) => (
                      <BatchCard
                        key={index}
                        batch={batch[0]}
                        onClick={() => setSelectedBatch(batch)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;