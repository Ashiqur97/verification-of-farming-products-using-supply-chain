import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants/contract.js';

// Check if MetaMask is installed
export const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== 'undefined';
};

export const connectWallet = async () => {
  if (!isMetaMaskInstalled()) {
    alert('Please install MetaMask!');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    console.log('Connected account:', accounts[0]);
    return accounts[0];
    
  } catch (error) {
    console.error('Error connecting wallet:', error);
    
    if (error.code === 4001) {
      alert('Please connect your wallet to continue.');
    } else {
      alert('Error connecting wallet. Please make sure you are connected to the correct network (Localhost 8545).');
    }
    
    return null;
  }
};

export const getContract = () => {
  if (!isMetaMaskInstalled()) {
    alert('Please install MetaMask!');
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } catch (error) {
    console.error('Error getting contract:', error);
    return null;
  }
};

export const createBatch = async (batchData) => {
  const contract = getContract();
  if (!contract) {
    alert('Contract not found. Please check your connection.');
    return false;
  }

  try {
    console.log('Creating batch with data:', batchData);
    
    const category = parseInt(batchData.category);
    if (isNaN(category) || category < 0 || category > 8) {
      alert('Invalid category selected');
      return false;
    }

    if (!batchData.batchId?.trim() || !batchData.certificateId?.trim()) {
      alert('Batch ID and Certificate ID are required');
      return false;
    }

    const tx = await contract.createBatch(
      batchData.batchId.trim(),
      batchData.certificateId.trim(),
      category,
      batchData.crop?.trim() || "",
      batchData.origin?.trim() || "",
      batchData.harvestDate?.trim() || ""
    );
    
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);
    
    return true;
  } catch (error) {
    console.error('Error creating batch:', error);
    
    if (error.code === 'ACTION_REJECTED') {
      alert('Transaction was cancelled by user.');
    } else {
      alert('Error creating batch. Make sure you are on the correct network and have enough ETH.');
    }
    
    return false;
  }
};

export const getTotalBatches = async () => {
  const contract = getContract();
  if (!contract) return 0;

  try {
    const total = await contract.totalBatches();
    return parseInt(total.toString());
  } catch (error) {
    console.error('Error getting total batches:', error);
    return 0;
  }
};

export const getBatchDetails = async (batchId) => {
  const contract = getContract();
  if (!contract) return null;

  try {
    const batch = await contract.getFullBatch(batchId);
    return batch;
  } catch (error) {
    console.error('Error getting batch details:', error);
    return null;
  }
};