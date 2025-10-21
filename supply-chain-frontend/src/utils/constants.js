export const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "creator", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "batchId", "type": "string"},
      {"indexed": false, "internalType": "enum SupplyChain.Category", "name": "category", "type": "uint8"},
      {"indexed": false, "internalType": "string", "name": "harvestDate", "type": "string"}
    ],
    "name": "BatchCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
      {"indexed": false, "internalType": "enum SupplyChain.BatchStatus", "name": "status", "type": "uint8"}
    ],
    "name": "BatchStatusUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_batchId", "type": "string"},
      {"internalType": "string", "name": "_certificateId", "type": "string"},
      {"internalType": "enum SupplyChain.Category", "name": "_category", "type": "uint8"},
      {"internalType": "string", "name": "_crop", "type": "string"},
      {"internalType": "string", "name": "_origin", "type": "string"},
      {"internalType": "uint256", "name": "_harvestTimestamp", "type": "uint256"},
      {"internalType": "string", "name": "_harvestDate", "type": "string"}
    ],
    "name": "createBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_id", "type": "uint256"},
      {"internalType": "string", "name": "_destination", "type": "string"},
      {"internalType": "string", "name": "_storageConditions", "type": "string"}
    ],
    "name": "setLogistics",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_id", "type": "uint256"},
      {"internalType": "enum SupplyChain.BatchStatus", "name": "_status", "type": "uint8"}
    ],
    "name": "updateBatchStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_id", "type": "uint256"},
      {"internalType": "uint256", "name": "_packagingDate", "type": "uint256"},
      {"internalType": "uint256", "name": "_arrivalDate", "type": "uint256"},
      {"internalType": "uint256", "name": "_stockQuantity", "type": "uint256"},
      {"internalType": "uint256", "name": "_sellingPrice", "type": "uint256"},
      {"internalType": "bool", "name": "_certificationVerified", "type": "bool"},
      {"internalType": "uint256", "name": "_weight", "type": "uint256"},
      {"internalType": "string", "name": "_quality", "type": "string"}
    ],
    "name": "updateRetailInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "name": "batchCore",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "string", "name": "batchId", "type": "string"},
      {"internalType": "string", "name": "certificateId", "type": "string"},
      {"internalType": "enum SupplyChain.Category", "name": "category", "type": "uint8"},
      {"internalType": "string", "name": "crop", "type": "string"},
      {"internalType": "string", "name": "origin", "type": "string"},
      {"internalType": "uint256", "name": "harvestTimestamp", "type": "uint256"},
      {"internalType": "string", "name": "harvestDate", "type": "string"},
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "enum SupplyChain.BatchStatus", "name": "status", "type": "uint8"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "", "type": "string"}
    ],
    "name": "batchIdToIndex",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_id", "type": "uint256"}
    ],
    "name": "getFullBatch",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "batchId", "type": "string"},
          {"internalType": "string", "name": "certificateId", "type": "string"},
          {"internalType": "enum SupplyChain.Category", "name": "category", "type": "uint8"},
          {"internalType": "string", "name": "crop", "type": "string"},
          {"internalType": "string", "name": "origin", "type": "string"},
          {"internalType": "uint256", "name": "harvestTimestamp", "type": "uint256"},
          {"internalType": "string", "name": "harvestDate", "type": "string"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "enum SupplyChain.BatchStatus", "name": "status", "type": "uint8"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}
        ],
        "internalType": "struct SupplyChain.BatchCore",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {"internalType": "string", "name": "destination", "type": "string"},
          {"internalType": "string", "name": "storageConditions", "type": "string"}
        ],
        "internalType": "struct SupplyChain.Logistics",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {"internalType": "string", "name": "farmerName", "type": "string"},
          {"internalType": "string", "name": "retailerName", "type": "string"},
          {"internalType": "uint256", "name": "packagingDate", "type": "uint256"},
          {"internalType": "uint256", "name": "arrivalDate", "type": "uint256"},
          {"internalType": "uint256", "name": "stockQuantity", "type": "uint256"},
          {"internalType": "uint256", "name": "sellingPrice", "type": "uint256"},
          {"internalType": "bool", "name": "certificationVerified", "type": "bool"},
          {"internalType": "uint256", "name": "weight", "type": "uint256"},
          {"internalType": "string", "name": "quality", "type": "string"}
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
    "inputs": [],
    "name": "totalBatches",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const CATEGORIES = [
  "Fresh Produce", "Grains & Cereals", "Livestock & Meat", "Dairy Products",
  "Processed Foods", "Organic & Specialty", "Seeds & Agricultural Inputs",
  "Coffee & Tea", "Spices & Seasonings"
];

export const STATUSES = [
  "Created", "In Transit", "Processed", "Packaged", "For Sale", "Sold", "Recalled"
];