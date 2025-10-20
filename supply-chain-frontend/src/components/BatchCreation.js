import React, { useState } from 'react';
import { getContract, getCurrentAccount } from '../utils/ethersConfig';

const BatchCreation = () => {
  // Auto-generate unique batch ID
  const generateBatchId = () => `BATCH_${Date.now()}`;
  const generateCertId = () => `CERT_${Math.floor(Math.random() * 10000)}`;

  const [formData, setFormData] = useState({
    batchId: generateBatchId(),
    certificateId: generateCertId(),
    category: 0,
    crop: 'Organic Wheat',
    origin: 'Kansas Farm',
    harvestDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const contract = getContract();
      const account = getCurrentAccount();
      
      console.log('📝 Creating batch with:', {
        batchId: formData.batchId,
        category: parseInt(formData.category),
        from: account
      });

      // Convert harvest date to timestamp
      const harvestTimestamp = Math.floor(new Date(formData.harvestDate).getTime() / 1000);

      setMessage('⏳ Submitting transaction...');
      
      const tx = await contract.createBatch(
        formData.batchId,
        formData.certificateId,
        parseInt(formData.category),
        formData.crop,
        formData.origin,
        harvestTimestamp,
        {
          gasLimit: 500000 // Increase gas limit
        }
      );
      
      setMessage('⏳ Transaction submitted. Waiting for confirmation...');
      console.log('📫 Transaction hash:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('✅ Transaction confirmed:', receipt);
      
      setMessage('✅ Batch created successfully!');
      
      // Reset form with new IDs
      setTimeout(() => {
        setFormData({
          batchId: generateBatchId(),
          certificateId: generateCertId(),
          category: 0,
          crop: 'Organic Wheat',
          origin: 'Kansas Farm',
          harvestDate: new Date().toISOString().split('T')[0]
        });
        setMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error creating batch:', error);
      
      if (error.code === -32603) {
        setMessage('❌ Internal error. Try using a different Batch ID.');
      } else if (error.reason) {
        setMessage('❌ ' + error.reason);
      } else if (error.message) {
        setMessage('❌ ' + error.message);
      } else {
        setMessage('❌ Transaction failed. Check console for details.');
      }
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

  const generateNewId = () => {
    setFormData({
      ...formData,
      batchId: generateBatchId(),
      certificateId: generateCertId()
    });
  };

  const categories = [
    'Fresh Produce 🥦',
    'Grains & Cereals 🌾',
    'Livestock & Meat 🥩',
    'Dairy Products 🥛',
    'Processed Foods 🍞',
    'Organic & Specialty 🌱',
    'Seeds & Inputs 🌰',
    'Coffee & Tea ☕',
    'Spices & Seasonings 🌶️'
  ];

  return (
    <div className="space-y-6">
      <div className="card border border-gray-300/50">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-4">🌱</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Batch</h2>
            <p className="text-gray-600">No role restrictions - Anyone can create batches</p>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Batch ID *
                <button
                  type="button"
                  onClick={generateNewId}
                  className="ml-2 text-sm btn-secondary py-1 px-2"
                >
                  🔄 New ID
                </button>
              </label>
              <input
                type="text"
                name="batchId"
                value={formData.batchId}
                onChange={handleChange}
                className="input-field"
                placeholder="BATCH_001"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Certificate ID *</label>
              <input
                type="text"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                className="input-field"
                placeholder="CERT_12345"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category *</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="input-field"
              >
                {categories.map((category, index) => (
                  <option key={index} value={index}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Crop Type *</label>
              <input
                type="text"
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                className="input-field"
                placeholder="Organic Wheat"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Origin *</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="input-field"
                placeholder="Farm location"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Harvest Date *</label>
              <input
                type="date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={generateNewId}
              className="btn-secondary flex-1 py-3"
            >
              🔄 Generate New IDs
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 py-3 text-lg font-bold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating...
                </div>
              ) : (
                'Create Batch'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Quick Test Instructions */}
      <div className="card bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20">
        <div className="flex items-start">
          <div className="text-3xl mr-4">💡</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Quick Start</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Click "Create Batch" - No role restrictions</li>
              <li>• Use any account - All features unlocked</li>
              <li>• Auto-generated IDs prevent duplicates</li>
              <li>• Works with all test accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchCreation;