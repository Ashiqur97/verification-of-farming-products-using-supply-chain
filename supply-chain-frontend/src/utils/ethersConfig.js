import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';

// Simple ABI that bypasses role restrictions
const SIMPLE_ABI = [
  // Create Batch - No role restrictions
  {
    "inputs": [
      {"internalType": "string","name": "_batchId","type": "string"},
      {"internalType": "string","name": "_certificateId","type": "string"},
      {"internalType": "uint8","name": "_category","type": "uint8"},
      {"internalType": "string","name": "_crop","type": "string"},
      {"internalType": "string","name": "_origin","type": "string"},
      {"internalType": "uint256","name": "_harvestDate","type": "uint256"}
    ],
    "name": "createBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Set Logistics - No role restrictions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"},
      {"internalType": "string","name": "_destination","type": "string"},
      {"internalType": "string","name": "_storageConditions","type": "string"}
    ],
    "name": "setLogistics",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Assign Distributor - No role restrictions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"},
      {"internalType": "address","name": "_distributor","type": "address"}
    ],
    "name": "assignDistributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Mark Processed - No role restrictions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"}
    ],
    "name": "markProcessed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Package Batch - No role restrictions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"},
      {"internalType": "address","name": "_retailer","type": "address"}
    ],
    "name": "packageBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Put for Sale - No role restrictions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"}
    ],
    "name": "putForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Sell - No role restrictions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"},
      {"internalType": "address","name": "_consumer","type": "address"}
    ],
    "name": "sell",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // View functions
  {
    "inputs": [
      {"internalType": "uint256","name": "_id","type": "uint256"}
    ],
    "name": "getFullBatch",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256","name": "id","type": "uint256"},
          {"internalType": "string","name": "batchId","type": "string"},
          {"internalType": "string","name": "certificateId","type": "string"},
          {"internalType": "uint8","name": "category","type": "uint8"},
          {"internalType": "string","name": "crop","type": "string"},
          {"internalType": "string","name": "origin","type": "string"},
          {"internalType": "uint256","name": "harvestDate","type": "uint256"},
          {"internalType": "address","name": "farmer","type": "address"},
          {"internalType": "uint8","name": "status","type": "uint8"},
          {"internalType": "uint256","name": "createdAt","type": "uint256"},
          {"internalType": "uint256","name": "updatedAt","type": "uint256"}
        ],
        "internalType": "struct SupplyChain.BatchCore",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {"internalType": "address","name": "distributor","type": "address"},
          {"internalType": "address","name": "retailer","type": "address"},
          {"internalType": "address","name": "consumer","type": "address"},
          {"internalType": "string","name": "destination","type": "string"},
          {"internalType": "string","name": "storageConditions","type": "string"}
        ],
        "internalType": "struct SupplyChain.Logistics",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {"internalType": "string","name": "farmerName","type": "string"},
          {"internalType": "string","name": "retailerName","type": "string"},
          {"internalType": "uint256","name": "packagingDate","type": "uint256"},
          {"internalType": "uint256","name": "arrivalDate","type": "uint256"},
          {"internalType": "uint256","name": "stockQuantity","type": "uint256"},
          {"internalType": "uint256","name": "sellingPrice","type": "uint256"},
          {"internalType": "bool","name": "certificationVerified","type": "bool"},
          {"internalType": "uint256","name": "weight","type": "uint256"},
          {"internalType": "string","name": "quality","type": "string"}
        ],
        "internalType": "struct SupplyChain.RetailInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string","name": "","type": "string"}
    ],
    "name": "batchIdToIndex",
    "outputs": [
      {"internalType": "uint256","name": "","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBatches",
    "outputs": [
      {"internalType": "uint256","name": "","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider;
let signer;
let contract;
let currentAccount = '';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      console.log('🔄 Connecting wallet...');
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      
      console.log('📝 Creating contract instance...');
      contract = new ethers.Contract(CONTRACT_ADDRESS, SIMPLE_ABI, signer);
      
      const address = await signer.getAddress();
      currentAccount = address;
      
      console.log('🔗 Wallet connected:', address);
      console.log('✅ Contract instance created');
      
      return { success: true, address };
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Please install MetaMask' };
  }
};

export const getContract = () => {
  if (!contract) {
    throw new Error('Contract not initialized. Please connect wallet first.');
  }
  return contract;
};

export const getSigner = () => {
  if (!signer) {
    throw new Error('Signer not initialized. Please connect wallet first.');
  }
  return signer;
};

export const getCurrentAccount = () => currentAccount;