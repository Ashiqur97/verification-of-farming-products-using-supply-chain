import React from 'react';

const Farmer = ({ active }) => {
  return (
    <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
      <h2 className="text-xl font-bold text-green-700 mb-4">👨‍🌾 Farmer: Create Batch</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold">Batch ID</label>
          <input type="text" placeholder="RICE-2025-1001"
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Certificate ID</label>
          <input type="text" placeholder="CERT-12345"
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Crop</label>
          <input type="text" placeholder="Rice"
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Date</label>
          <input type="date" placeholder="2025-06-15"
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Location</label>
          <input type="text" placeholder="Dinajpur Farm"
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Quality</label>
          <select className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400">
            <option>Premium</option>
            <option>Standard</option>
            <option>Economy</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Supplier</label>
          <input type="text" placeholder="Green Fields Ltd."
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        <div className="md:col-span-2">
          <button type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
            Submit to Blockchain (MetaMask Required)
          </button>
        </div>
      </form>
    </section>
  );
};

export default Farmer;