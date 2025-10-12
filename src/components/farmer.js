import React, { useState } from 'react';
import { useBlockchain } from './BlockchainContext';
import { ethers } from 'ethers';

const Farmer = ({ active }) => {
  const { contract, isFarmer, loading: blockchainLoading, error: blockchainError, networkId, switchToLocalNetwork } = useBlockchain();
  const [batchId, setBatchId] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [crop, setCrop] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [quality, setQuality] = useState('Premium');
  const [supplier, setSupplier] = useState('');
  const [category, setCategory] = useState('0'); // Default to FreshProduce (index 0)
  const [weight, setWeight] = useState('');
  const [storageConditions, setStorageConditions] = useState('');
  const [destination, setDestination] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if we're on the correct network (Hardhat local network)
  const isCorrectNetwork = networkId === 1337 || networkId === 31337;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract || !isFarmer) {
      alert("You are not authorized to create a batch.");
      return;
    }

    setLoading(true);
    try {
      // Convert date string to timestamp
      const harvestDate = new Date(date).getTime() / 1000;
      const weightValue = ethers.utils.parseUnits(weight, 18); // Assuming weight is in ether units

      const tx = await contract.createBatch(
        batchId,
        certificateId,
        category, // This is the index of the enum
        crop,
        location,
        harvestDate,
        quality,
        weightValue,
        storageConditions,
        destination,
        farmerName
      );

      await tx.wait();
      alert("Batch created successfully!");
      // Reset form
      setBatchId('');
      setCertificateId('');
      setCrop('');
      setDate('');
      setLocation('');
      setQuality('Premium');
      setSupplier('');
      setCategory('0');
      setWeight('');
      setStorageConditions('');
      setDestination('');
      setFarmerName('');
    } catch (error) {
      console.error("Error creating batch:", error);
      alert("Error creating batch: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading or error states
  if (blockchainLoading) {
    return (
      <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold text-green-700 mb-4">👨‍🌾 Farmer: Create Batch</h2>
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <p>Loading blockchain data...</p>
        </div>
      </section>
    );
  }

  if (blockchainError || !contract) {
    return (
      <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold text-green-700 mb-4">👨‍🌾 Farmer: Create Batch</h2>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{blockchainError || "Contract not initialized. Please make sure MetaMask is connected and the contract is deployed."}</p>
        </div>
        {!isCorrectNetwork && (
          <div className="mt-4">
            <button 
              onClick={switchToLocalNetwork}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Switch to Local Hardhat Network
            </button>
            <p className="text-sm text-gray-600 mt-2">
              You need to be connected to the local Hardhat network (chainId: 1337) to interact with the contract.
            </p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
      <h2 className="text-xl font-bold text-green-700 mb-4">👨‍🌾 Farmer: Create Batch</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold">Batch ID</label>
          <input 
            type="text" 
            placeholder="RICE-2025-1001"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Certificate ID</label>
          <input 
            type="text" 
            placeholder="CERT-12345"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Crop</label>
          <input 
            type="text" 
            placeholder="Rice"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Location</label>
          <input 
            type="text" 
            placeholder="Dinajpur Farm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Quality</label>
          <select 
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
          >
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
            <option value="Economy">Economy</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Supplier</label>
          <input 
            type="text" 
            placeholder="Green Fields Ltd."
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
          >
            <option value="0">Fresh Produce</option>
            <option value="1">Grains & Cereals</option>
            <option value="2">Livestock & Meat</option>
            <option value="3">Dairy Products</option>
            <option value="4">Processed Foods</option>
            <option value="5">Organic & Specialty</option>
            <option value="6">Seeds & Agricultural Inputs</option>
            <option value="7">Coffee & Tea</option>
            <option value="8">Spices & Seasonings</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Weight (kg)</label>
          <input 
            type="number" 
            placeholder="500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Storage Conditions</label>
          <input 
            type="text" 
            placeholder="Cool, 15°C"
            value={storageConditions}
            onChange={(e) => setStorageConditions(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Destination</label>
          <input 
            type="text" 
            placeholder="Dhaka"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Farmer Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div className="md:col-span-2">
          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
            disabled={!isFarmer || loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit to Blockchain (MetaMask Required)'
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Farmer;