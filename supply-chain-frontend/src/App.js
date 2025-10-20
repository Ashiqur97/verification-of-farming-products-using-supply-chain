import React, { useState, useEffect } from 'react';
import { connectWallet, getCurrentAccount } from './utils/ethersConfig';
import Dashboard from './components/Dashboard';
import BatchCreation from './components/BatchCreation';
import BatchView from './components/BatchView';
import StatusUpdate from './components/StatusUpdate';
import Logistics from './components/Logistics';

function App() {
  const [account, setAccount] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result.success) {
      setAccount(result.address);
      localStorage.setItem('connected', 'true');
    } else {
      alert(result.error);
    }
  };

  const handleDisconnect = () => {
    setAccount('');
    localStorage.removeItem('connected');
  };

  useEffect(() => {
    if (localStorage.getItem('connected') && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(async (accounts) => {
          if (accounts.length > 0) {
            const result = await connectWallet();
            if (result.success) {
              setAccount(result.address);
            }
          }
        })
        .catch(console.error);
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
          localStorage.removeItem('connected');
        }
      });
    }
  }, []);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', available: true },
    { id: 'batchView', label: 'Track Batch', icon: '🔍', available: true },
    { id: 'batchCreation', label: 'Create Batch', icon: '🌱', available: true },
    { id: 'logistics', label: 'Logistics', icon: '🚚', available: true },
    { id: 'statusUpdate', label: 'Update Status', icon: '🔄', available: true },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'batchCreation': return <BatchCreation />;
      case 'batchView': return <BatchView />;
      case 'logistics': return <Logistics />;
      case 'statusUpdate': return <StatusUpdate />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <header className="glass border-b border-gray-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-3xl mr-3">🌾</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                AgriChain
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {account ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    Connected: {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <button
                    onClick={handleDisconnect}
                    className="btn-secondary text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="btn-primary"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!account ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center card border border-gray-300/50 rounded-3xl p-12 max-w-md w-full">
              <div className="text-6xl mb-6 animate-float">👋</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to AgriChain</h2>
              <p className="text-gray-600 mb-8">
                Connect your MetaMask wallet to manage your agricultural supply chain
              </p>
              <button
                onClick={handleConnectWallet}
                className="btn-primary w-full py-4 text-lg"
              >
                Connect MetaMask
              </button>
              <div className="mt-8 p-4 bg-gray-100/80 rounded-xl border border-gray-300/50">
                <h4 className="text-gray-800 font-semibold mb-3">Test Accounts:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>🌾 Farmer: 0x7099...79C8</div>
                  <div>🚚 Distributor: 0x3C44...293BC</div>
                  <div>🏪 Retailer: 0x90F7...b906</div>
                  <div>👥 Consumer: 0x15d3...6A65</div>
                  <div className="mt-2 text-green-600 font-semibold">✅ All features unlocked</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <nav className="lg:w-64 flex-shrink-0">
              <div className="card border border-gray-300/50 rounded-2xl p-4 sticky top-8">
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                        currentView === item.id
                          ? 'bg-gray-800 text-white border border-gray-700 shadow-md'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Account Info */}
                <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <h4 className="text-gray-800 font-semibold mb-2">Connected Account</h4>
                  <p className="text-gray-600 text-sm font-mono">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </p>
                  <p className="text-green-600 text-xs mt-1 font-semibold">
                    ✅ All features unlocked
                  </p>
                </div>
              </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              {renderView()}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;