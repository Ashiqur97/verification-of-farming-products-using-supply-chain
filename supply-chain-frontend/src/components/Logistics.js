import React, { useState } from 'react';
import { getContract } from '../utils/ethersConfig';

const Logistics = () => {
  const [formData, setFormData] = useState({
    batchId: '',
    distributor: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    destination: 'Chicago Distribution Center',
    storageConditions: 'Cool, dry conditions'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const setLogistics = async () => {
    if (!formData.batchId) {
      setMessage('❌ Please enter a batch ID');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const contract = getContract();
      
      setMessage('⏳ Setting logistics...');
      const tx = await contract.setLogistics(
        formData.batchId,
        formData.destination,
        formData.storageConditions
      );
      
      await tx.wait();
      setMessage('✅ Logistics set successfully!');
      
    } catch (error) {
      console.error('Error setting logistics:', error);
      setMessage('❌ Error: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const assignDistributor = async () => {
    if (!formData.batchId) {
      setMessage('❌ Please enter a batch ID');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const contract = getContract();
      
      setMessage('⏳ Assigning distributor...');
      const tx = await contract.assignDistributor(
        formData.batchId, 
        formData.distributor
      );
      
      await tx.wait();
      setMessage('✅ Distributor assigned successfully!');
      
    } catch (error) {
      console.error('Error assigning distributor:', error);
      setMessage('❌ Error: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="card border border-gray-300/50">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-4">🚚</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Logistics Management</h2>
            <p className="text-gray-600">No role restrictions - Anyone can manage logistics</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Batch ID *</label>
              <input
                type="text"
                name="batchId"
                placeholder="BATCH_1705586400000"
                value={formData.batchId}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Distributor Address</label>
              <input
                type="text"
                name="distributor"
                placeholder="Distributor address"
                value={formData.distributor}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Destination *</label>
              <input
                type="text"
                name="destination"
                placeholder="Distribution center location"
                value={formData.destination}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Storage Conditions</label>
              <input
                type="text"
                name="storageConditions"
                placeholder="Temperature, humidity requirements"
                value={formData.storageConditions}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={assignDistributor} 
              disabled={loading}
              className="btn-primary flex-1 py-3"
            >
              {loading ? 'Processing...' : 'Assign Distributor'}
            </button>
            <button 
              onClick={setLogistics} 
              disabled={loading}
              className="btn-secondary flex-1 py-3"
            >
              {loading ? 'Processing...' : 'Set Logistics'}
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="flex items-start">
          <div className="text-3xl mr-4">💡</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">How to Test</h3>
            <ol className="text-gray-600 text-sm space-y-2">
              <li>1. <strong>Create a batch</strong> first in "Create Batch" section</li>
              <li>2. <strong>Copy the Batch ID</strong> (auto-generated like BATCH_1705586400000)</li>
              <li>3. <strong>Paste the Batch ID</strong> above and assign distributor/set logistics</li>
              <li>4. <strong>No role restrictions</strong> - Use any account</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;