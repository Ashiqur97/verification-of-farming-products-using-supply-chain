import React, { useState } from 'react';

const Farmer = ({ active }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    batchId: '',
    certificateId: '',
    product: '',
    date: '',
    location: '',
    quality: 'Premium',
    supplier: '',
    description: ''
  });

  // Category-specific fields configuration
  const categoryFields = {
    'fresh-produce': [
      { name: 'harvestDate', label: 'Harvest Date', type: 'date', placeholder: 'Select harvest date' },
      { name: 'variety', label: 'Variety', type: 'text', placeholder: 'e.g., Roma Tomato, Fuji Apple' },
      { name: 'organic', label: 'Organic Certified', type: 'select', options: ['Yes', 'No'] },
      { name: 'storageTemp', label: 'Storage Temperature (°C)', type: 'number', placeholder: 'e.g., 4' }
    ],
    'grains-cereals': [
      { name: 'moistureContent', label: 'Moisture Content (%)', type: 'number', placeholder: 'e.g., 12' },
      { name: 'grade', label: 'Grade', type: 'select', options: ['Grade A', 'Grade B', 'Grade C'] },
      { name: 'glutenContent', label: 'Gluten Content', type: 'select', options: ['High', 'Low', 'Gluten-Free'] },
      { name: 'origin', label: 'Origin Region', type: 'text', placeholder: 'e.g., Punjab, California' }
    ],
    'livestock-meat': [
      { name: 'animalType', label: 'Animal Type', type: 'select', options: ['Cattle', 'Poultry', 'Pork', 'Seafood'] },
      { name: 'breed', label: 'Breed', type: 'text', placeholder: 'e.g., Angus, Broiler' },
      { name: 'feedType', label: 'Feed Type', type: 'text', placeholder: 'e.g., Organic, Grain-fed' }
      // Removed health certificate field
    ],
    'dairy-products': [
      { name: 'milkType', label: 'Milk Type', type: 'select', options: ['Cow', 'Goat', 'Sheep', 'Buffalo'] },
      { name: 'fatContent', label: 'Fat Content (%)', type: 'number', placeholder: 'e.g., 3.5' },
      { name: 'pasteurized', label: 'Pasteurized', type: 'select', options: ['Yes', 'No'] },
      { name: 'shelfLife', label: 'Shelf Life (days)', type: 'number', placeholder: 'e.g., 14' }
    ],
    'processed-foods': [
      { name: 'ingredients', label: 'Main Ingredients', type: 'text', placeholder: 'e.g., Wheat flour, Sugar' },
      { name: 'additives', label: 'Additives', type: 'text', placeholder: 'e.g., Preservatives, Colors' },
      { name: 'packagingDate', label: 'Packaging Date', type: 'date' },
      { name: 'nutritionalInfo', label: 'Nutritional Info', type: 'file' }
    ],
    'organic-specialty': [
      { name: 'certification', label: 'Certification Type', type: 'select', options: ['USDA Organic', 'EU Organic', 'Non-GMO', 'Vegan'] },
      { name: 'certBody', label: 'Certifying Body', type: 'text', placeholder: 'e.g., EcoCert, QAI' },
      { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'e.g., ORG-12345' },
      { name: 'certExpiry', label: 'Certificate Expiry', type: 'date' }
    ],
    'seeds-inputs': [
      { name: 'seedType', label: 'Seed Type', type: 'text', placeholder: 'e.g., Hybrid, GMO, Heirloom' },
      { name: 'germinationRate', label: 'Germination Rate (%)', type: 'number', placeholder: 'e.g., 95' },
      { name: 'treatment', label: 'Treatment', type: 'text', placeholder: 'e.g., Fungicide, Insecticide' },
      { name: 'origin', label: 'Seed Origin', type: 'text', placeholder: 'e.g., Netherlands, USA' }
    ],
    'coffee-tea': [
      { name: 'origin', label: 'Bean/Leaf Origin', type: 'text', placeholder: 'e.g., Ethiopia, Darjeeling' },
      { name: 'processing', label: 'Processing Method', type: 'select', options: ['Washed', 'Natural', 'Honey', 'Fermented'] },
      { name: 'roastLevel', label: 'Roast Level (Coffee only)', type: 'select', options: ['Light', 'Medium', 'Dark'] },
      { name: 'grade', label: 'Grade', type: 'select', options: ['Specialty', 'Premium', 'Commercial'] }
    ],
    'spices-seasonings': [
      { name: 'spiceType', label: 'Spice Type', type: 'text', placeholder: 'e.g., Turmeric, Cinnamon' },
      { name: 'form', label: 'Form', type: 'select', options: ['Whole', 'Ground', 'Powder'] },
      { name: 'origin', label: 'Origin', type: 'text', placeholder: 'e.g., Kerala, Sri Lanka' },
      { name: 'curcumin', label: 'Curcumin Content (%)', type: 'number', placeholder: 'e.g., 5' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, category: selectedCategory });
    // In a real app, you would send this data to the backend
  };

  return (
    <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
      <h2 className="text-xl font-bold text-green-700 mb-4">👨‍🌾 Farmer: Create Batch</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Batch ID</label>
            <input
              type="text"
              name="batchId"
              value={formData.batchId}
              onChange={handleInputChange}
              placeholder="RICE-2025-1001"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Certificate ID</label>
            <input
              type="text"
              name="certificateId"
              value={formData.certificateId}
              onChange={handleInputChange}
              placeholder="CERT-12345"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select a category</option>
              <option value="fresh-produce">Fresh Produce</option>
              <option value="grains-cereals">Grains & Cereals</option>
              <option value="livestock-meat">Livestock & Meat</option>
              <option value="dairy-products">Dairy Products</option>
              <option value="processed-foods">Processed Foods</option>
              <option value="organic-specialty">Organic/Specialty Foods</option>
              <option value="seeds-inputs">Seeds & Agricultural Inputs</option>
              <option value="coffee-tea">Coffee & Tea</option>
              <option value="spices-seasonings">Spices & Seasonings</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              placeholder="e.g., Rice, Milk, Tomatoes"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Dinajpur Farm"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Quality</label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            >
              <option>Premium</option>
              <option>Standard</option>
              <option>Economy</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              placeholder="Green Fields Ltd."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Category-specific fields */}
        {selectedCategory && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Category-Specific Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryFields[selectedCategory].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
                    >
                      <option value="">Select an option</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      name={field.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Add note for Livestock & Meat category */}
            {selectedCategory === 'livestock-meat' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                {/* <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Health Certificate</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Health certificates for livestock will be automatically generated upon batch submission. Our system will verify all health standards and issue a blockchain-verified certificate.</p>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        )}

        {/* Product Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your product, farming practices, certifications, etc."
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 h-24"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
          >
            Submit to Blockchain (MetaMask Required)
          </button>
        </div>
      </form>
    </section>
  );
};

export default Farmer;