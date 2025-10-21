import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import CreateBatch from './components/Batch/CreateBatch';
import Logistics from './components/Batch/Logistics';
import UpdateStatus from './components/Batch/UpdateStatus';
import RetailInfo from './components/Batch/RetailInfo';
import SearchBatch from './components/Batch/SearchBatch';
import { useContract } from './hooks/useContract';

function App() {
  const [activeTab, setActiveTab] = useState('create');
  const {
    provider,
    contract,
    account,
    batchCount,
    isLoading,
    connectWallet,
    executeContractFunction
  } = useContract();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please make sure MetaMask is installed.');
    }
  };

  const renderActiveTab = () => {
    if (!contract) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600 mb-4">Please connect your wallet to interact with the supply chain</p>
            <button
              onClick={handleConnectWallet}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'create':
        return (
          <CreateBatch
            contract={contract}
            executeContractFunction={executeContractFunction}
            isLoading={isLoading}
          />
        );
      case 'logistics':
        return (
          <Logistics
            contract={contract}
            executeContractFunction={executeContractFunction}
            isLoading={isLoading}
          />
        );
      case 'status':
        return (
          <UpdateStatus
            contract={contract}
            executeContractFunction={executeContractFunction}
            isLoading={isLoading}
          />
        );
      case 'retail':
        return (
          <RetailInfo
            contract={contract}
            executeContractFunction={executeContractFunction}
            isLoading={isLoading}
          />
        );
      case 'search':
        return (
          <SearchBatch
            contract={contract}
            isLoading={isLoading}
          />
        );
      default:
        return <CreateBatch contract={contract} executeContractFunction={executeContractFunction} isLoading={isLoading} />;
    }
  };

  return (
    <Layout
      account={account}
      batchCount={batchCount}
      onConnectWallet={handleConnectWallet}
      isLoading={isLoading}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderActiveTab()}
    </Layout>
  );
}

export default App;