import React from 'react'

const farmer = ({active}) => {
  return (
    <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-4 text-green-700">👨‍🌾 Farmer Section</h2>
        <form className='grid grid-cols-1 md:grid-cols-6 gap-6'>
            
        </form> 
    </section>
  )
}

export default farmer
