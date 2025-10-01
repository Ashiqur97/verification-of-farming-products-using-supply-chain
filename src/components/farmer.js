import React from 'react'

const farmer = ({active}) => {
  return (
    <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-4 text-green-700">👨‍🌾 Farmer Section</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold">Batch ID</label>
          <input type="text" placeholder="RICE-2025-1001"
                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400" />
        </div>
        </form> 
    </section>
  )
}

export default farmer
