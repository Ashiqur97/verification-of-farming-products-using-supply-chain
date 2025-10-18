import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import SupplyChainABI from '../contracts/SupplyChainABI.json';

let provider;
let signer;
let contract;
let currentAccount = '';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, SupplyChainABI, signer);
      
      const address = await signer.getAddress();
      currentAccount = address;
      
      console.log('🔗 Wallet connected:', address);
      
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

// Role checking functions
export const checkUserRole = async (roleName) => {
  try {
    const contract = getContract();
    const userAddress = await getSigner().getAddress();
    
    // Get the actual role hash from the contract
    const roleHash = await contract[`${roleName}_ROLE`]();
    const hasRole = await contract.hasRole(roleHash, userAddress);
    
    return hasRole;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
};

export const getUserAllRoles = async () => {
  try {
    const contract = getContract();
    const userAddress = await getSigner().getAddress();
    
    const roles = {};
    const roleNames = ['FARMER', 'DISTRIBUTOR', 'RETAILER', 'CONSUMER'];
    
    for (const roleName of roleNames) {
      try {
        const roleHash = await contract[`${roleName}_ROLE`]();
        roles[roleName] = await contract.hasRole(roleHash, userAddress);
      } catch (error) {
        console.warn(`Could not check ${roleName} role:`, error);
        roles[roleName] = false;
      }
    }
    
    return roles;
  } catch (error) {
    console.error('Error getting user roles:', error);
    return {};
  }
};