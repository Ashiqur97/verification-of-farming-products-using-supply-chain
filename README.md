

# AgriChain - Blockchain Supply Chain Tracking
A decentralized application (dApp) for tracking agricultural products from farm to consumer using blockchain technology.

# Table of Contents
Overview

Features

Technology Stack

Project Structure

Installation

Usage

Smart Contract

Frontend

# Overview
AgriChain provides a transparent and immutable supply chain tracking system for agricultural products. It allows farmers, processors, and retailers to record product journey on the blockchain, ensuring data integrity and traceability.

Real-World Use Case:
Farmer grows crops and records harvest details

Processor processes raw materials

Brand packages and certifies products

Consumers verify product origin via blockchain

# Features
 Create Agricultural Batches - Register new product batches

 Update Logistics - Add processing and transportation details

 Retail Information - Add packaging and certification details

 Status Tracking - Real-time status updates

 Transparent History - Immutable record of product journey

 One-User Management - Single interface for all roles

# Technology
Backend
Solidity ^0.8.20

Hardhat

Ethers.js

Node.js

# Frontend
React.js

Tailwind CSS

Ethers.js

MetaMask

# Project Structure 
agri-chain/
├── backend/
│   ├── contracts/SupplyChain.sol
│   ├── scripts/deploy.js
│   └── hardhat.config.js
├── frontend/
│   ├── src/components/
│   ├── src/utils/blockchain.js
│   ├── src/constants/contract.js
│   └── src/App.jsx


# AgriChain - Blockchain Supply Chain Tracking
A decentralized application (dApp) for tracking agricultural products from farm to consumer using blockchain technology.

# Table of Contents
Overview

Features

Technology Stack

Project Structure

Installation

Usage

Smart Contract

Frontend

# Overview
AgriChain provides a transparent and immutable supply chain tracking system for agricultural products. It allows farmers, processors, and retailers to record product journey on the blockchain, ensuring data integrity and traceability.

Real-World Use Case:
Farmer grows crops and records harvest details

Processor processes raw materials

Brand packages and certifies products

Consumers verify product origin via blockchain

# Features
 Create Agricultural Batches - Register new product batches

 Update Logistics - Add processing and transportation details

 Retail Information - Add packaging and certification details

 Status Tracking - Real-time status updates

 Transparent History - Immutable record of product journey

 One-User Management - Single interface for all roles

# Technology
Backend
Solidity ^0.8.20

Hardhat

Ethers.js

Node.js

# Frontend
React.js

Tailwind CSS

Ethers.js

MetaMask

# Project Structure 
agri-chain/
├── backend/
│   ├── contracts/SupplyChain.sol
│   ├── scripts/deploy.js
│   └── hardhat.config.js
├── frontend/
│   ├── src/components/
│   ├── src/utils/blockchain.js
│   ├── src/constants/contract.js
│   └── src/App.jsx

## Smart Contract Functions
createBatch() - Register new batch

updateLogistics() - Add processing details

updateRetailInfo() - Add branding info

updateBatchStatus() - Change status

getFullBatch() - Retrieve complete info
