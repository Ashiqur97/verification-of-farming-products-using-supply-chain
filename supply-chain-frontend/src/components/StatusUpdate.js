import React, { useState } from 'react';
import { getContract } from '../utils/ethersConfig';

const StatusUpdate = () => {
  const [batchId, setBatchId] = useState('');
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [additionalData, setAdditionalData] = useState({
    retailer: '',
    consumer: ''
  });

  const handleAction = async () => {
    if (!batchId) {
      setMessage('❌ Please enter a batch ID');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const contract = getContract();
      let tx;

      switch (action) {
        case 'markProcessed':
          tx = await contract.markProcessed(batchId);
          break;
        
        case 'packageBatch':
          if (!additionalData.retailer) {
            setMessage('❌ Please enter retailer address');
            return;
          }
          tx = await contract.packageBatch(batchId, additionalData.retailer);
          break;
        
        case 'putForSale':
          tx = await contract.putForSale(batchId);
          break;
        
        case 'sell':
          if (!additionalData.consumer) {
            setMessage('❌ Please enter consumer address');
            return;
          }
          tx = await contract.sell(batchId, additionalData.consumer);
          break;
        
        default:
          setMessage('❌ Please select an action');
          return;
      }

      setMessage('⏳ Processing transaction...');
      await tx.wait();
      setMessage(`✅ Action "${action}" completed successfully!`);
      
    } catch (error) {
      console.error('Error performing action:', error);
      setMessage('❌ Error: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAdditionalDataChange = (e) => {
    setAdditionalData({
      ...additionalData,
      [e.target.name]: e.target.value
    });
  };

  const actions = [
    { value: 'markProcessed', label: 'Mark as Processed', description: 'Distributor action' },
    { value: 'packageBatch', label: 'Package Batch', description: 'Distributor action' },
    { value: 'putForSale', label: 'Put for Sale', description: 'Retailer action' },
    { value: 'sell', label: 'Sell to Consumer', description: 'Retailer action' }
  ];

  return (
    <div className="space-y-6">
      <div className="card border border-gray-300/50">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-4">🔄</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Update Batch Status</h2>
            <p className="text-gray-600">Progress batches through supply chain stages</p>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('✅') ? 'bg-green-500/20 border border-green-500/50 text-green-700' :
            message.includes('❌') ? 'bg-red-500/20 border border-red-500/50 text-red-700' :
            'bg-blue-500/20 border border-blue-500/50 text-blue-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Batch ID *</label>
            <input
              type="text"
              placeholder="BATCH_001"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Action *</label>
            <select 
              value={action} 
              onChange={(e) => setAction(e.target.value)}
              className="input-field"
            >
              <option value="">Choose an action...</option>
              {actions.map((act) => (
                <option key={act.value} value={act.value}>
                  {act.label} - {act.description}
                </option>
              ))}
            </select>
          </div>

          {action === 'packageBatch' && (
            <input
              type="text"
              name="retailer"
              placeholder="Retailer Address (0x90F79bf6EB2c4f870365E785982E1f101E93b906)"
              value={additionalData.retailer}
              onChange={handleAdditionalDataChange}
              className="input-field"
            />
          )}
          
          {action === 'sell' && (
            <input
              type="text"
              name="consumer"
              placeholder="Consumer Address (0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65)"
              value={additionalData.consumer}
              onChange={handleAdditionalDataChange}
              className="input-field"
            />
          )}

          <button 
            onClick={handleAction} 
            disabled={loading || !action}
            className="btn-primary w-full py-4"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing...
              </div>
            ) : (
              `Execute ${action ? actions.find(a => a.value === action)?.label : 'Action'}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;