export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
export const RPC_URL = process.env.REACT_APP_RPC_URL;

// Role constants - these are the actual role hashes from your contract
export const ROLES = {
  FARMER: 'df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', // This will be updated
  DISTRIBUTOR: 'de9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0',
  RETAILER: '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  CONSUMER: 'ea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0'
};

// We'll update the role hashes after getting them from the contract
export const ROLE_NAMES = {
  FARMER_ROLE: 'Farmer 🌾',
  DISTRIBUTOR_ROLE: 'Distributor 🚚', 
  RETAILER_ROLE: 'Retailer 🏪',
  CONSUMER_ROLE: 'Consumer 👥',
  DEFAULT: 'No Role'
};

export const CATEGORIES = {
  0: 'Fresh Produce 🥦',
  1: 'Grains & Cereals 🌾',
  2: 'Livestock & Meat 🥩',
  3: 'Dairy Products 🥛',
  4: 'Processed Foods 🍞',
  5: 'Organic & Specialty 🌱',
  6: 'Seeds & Inputs 🌰',
  7: 'Coffee & Tea ☕',
  8: 'Spices & Seasonings 🌶️'
};

export const BATCH_STATUS = {
  0: { name: 'Created', color: 'bg-blue-500', icon: '📝' },
  1: { name: 'In Transit', color: 'bg-yellow-500', icon: '🚚' },
  2: { name: 'Processed', color: 'bg-purple-500', icon: '🏭' },
  3: { name: 'Packaged', color: 'bg-indigo-500', icon: '📦' },
  4: { name: 'For Sale', color: 'bg-green-500', icon: '🏷️' },
  5: { name: 'Sold', color: 'bg-emerald-500', icon: '💰' },
  6: { name: 'Recalled', color: 'bg-red-500', icon: '⚠️' }
};

// Test addresses from your deployment
export const TEST_ADDRESSES = {
  FARMER: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  DISTRIBUTOR: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  RETAILER: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  CONSUMER: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  ADMIN: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
};