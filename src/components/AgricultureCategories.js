import React from 'react';
import { 
  FaAppleAlt, 
  FaSeedling, 
  FaDrumstickBite, 
  FaCheese, 
  FaHamburger, 
  FaLeaf, 
  FaSeedling as FaSprout, 
  FaCoffee, 
  FaPepperHot 
} from 'react-icons/fa';

const AgricultureCategories = ({ active }) => {
  const categories = [
    {
      id: 'fresh-produce',
      name: 'Fresh Produce',
      description: 'Fruits, vegetables, herbs',
      icon: <FaAppleAlt className="text-3xl" />,
      color: 'bg-red-100',
      borderColor: 'border-red-300',
      textColor: 'text-red-800'
    },
    {
      id: 'grains-cereals',
      name: 'Grains & Cereals',
      description: 'Wheat, rice, corn, oats',
      icon: <FaSeedling className="text-3xl" />,
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-800'
    },
    {
      id: 'livestock-meat',
      name: 'Livestock & Meat',
      description: 'Cattle, poultry, pork, seafood',
      icon: <FaDrumstickBite className="text-3xl" />,
      color: 'bg-red-100',
      borderColor: 'border-red-300',
      textColor: 'text-red-800'
    },
    {
      id: 'dairy-products',
      name: 'Dairy Products',
      description: 'Milk, cheese, yogurt, butter',
      icon: <FaCheese className="text-3xl" />,
      color: 'bg-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-800'
    },
    {
      id: 'processed-foods',
      name: 'Processed Foods',
      description: 'Packaged goods, beverages, snacks',
      icon: <FaHamburger className="text-3xl" />,
      color: 'bg-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-800'
    },
    {
      id: 'organic-specialty',
      name: 'Organic/Specialty Foods',
      description: 'Gluten-free, vegan, kosher, halal',
      icon: <FaLeaf className="text-3xl" />,
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-800'
    },
    {
      id: 'seeds-inputs',
      name: 'Seeds & Agricultural Inputs',
      description: 'Fertilizers, pesticides, equipment',
      icon: <FaSprout className="text-3xl" />,
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-800'
    },
    {
      id: 'coffee-tea',
      name: 'Coffee & Tea',
      description: 'Bean/leaf origin to cup',
      icon: <FaCoffee className="text-3xl" />,
      color: 'bg-amber-100',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-800'
    },
    {
      id: 'spices-seasonings',
      name: 'Spices & Seasonings',
      description: 'Various spices and seasonings',
      icon: <FaPepperHot className="text-3xl" />,
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-800'
    }
  ];

  return (
    <section className={`content-section ${active ? 'active' : ''} bg-white rounded-2xl shadow-lg p-6`}>
      <h2 className="text-xl font-bold text-green-700 mb-4">🌾 Agriculture & Food Categories</h2>
      
      <div className="mb-6">
        <p className="text-gray-600">
          Explore our comprehensive range of agricultural products and food categories tracked on the blockchain. 
          Each category is monitored throughout the supply chain to ensure authenticity and quality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${category.borderColor} transform transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="p-6">
              <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                <div className={category.textColor}>
                  {category.icon}
                </div>
              </div>
              <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">
                  Blockchain Tracked
                </span>
                <button className="text-sm font-medium text-green-600 hover:text-green-800">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex rounded-md shadow">
          <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgricultureCategories;