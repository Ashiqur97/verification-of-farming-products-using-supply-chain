export const CONTRACT_ADDRESS = " 0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
   {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        }
      ],
      "name": "BatchCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "batchCore",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "certificateId",
          "type": "string"
        },
        {
          "internalType": "enum SupplyChain.Category",
          "name": "category",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "crop",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "origin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "harvestDate",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "enum SupplyChain.BatchStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "updatedAt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "batchIdToIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_certificateId",
          "type": "string"
        },
        {
          "internalType": "enum SupplyChain.Category",
          "name": "_category",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_crop",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_origin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_harvestDate",
          "type": "string"
        }
      ],
      "name": "createBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getFullBatch",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "batchId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "certificateId",
              "type": "string"
            },
            {
              "internalType": "enum SupplyChain.Category",
              "name": "category",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "crop",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "origin",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "harvestDate",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "enum SupplyChain.BatchStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "createdAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "updatedAt",
              "type": "uint256"
            }
          ],
          "internalType": "struct SupplyChain.BatchCore",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "destination",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "storageConditions",
              "type": "string"
            }
          ],
          "internalType": "struct SupplyChain.Logistics",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "farmerName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "retailerName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "packagingDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "arrivalDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stockQuantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sellingPrice",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "certificationVerified",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "weight",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "quality",
              "type": "string"
            }
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
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "logistics",
      "outputs": [
        {
          "internalType": "string",
          "name": "destination",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "storageConditions",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "retail",
      "outputs": [
        {
          "internalType": "string",
          "name": "farmerName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "retailerName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "packagingDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "arrivalDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stockQuantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sellingPrice",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "certificationVerified",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "quality",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "test",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalBatches",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];

export const CATEGORIES = [
  "FreshProduce", "GrainsCereals", "LivestockMeat", "DairyProducts",
  "ProcessedFoods", "OrganicSpecialty", "SeedsAgriculturalInputs",
  "CoffeeTea", "SpicesSeasonings"
];

export const BATCH_STATUS = [
  "Created", "InTransit", "Processed", "Packaged", "ForSale", "Sold", "Recalled"
];