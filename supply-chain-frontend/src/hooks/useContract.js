import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants';

export const useContract = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [batchCount, setBatchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask to use this application');
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contract);

      // Load initial data
      await loadBatchCount(contract);
      
      return { success: true };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const loadBatchCount = async (contractInstance = contract) => {
    if (!contractInstance) return;
    
    try {
      const count = await contractInstance.totalBatches();
      setBatchCount(Number(count));
    } catch (error) {
      console.error('Error loading batch count:', error);
    }
  };

  const executeContractFunction = async (functionCall, successMessage) => {
    if (!contract) throw new Error('Contract not connected');

    setIsLoading(true);
    try {
      const transaction = await functionCall();
      await transaction.wait();
      
      if (successMessage) {
        alert(successMessage);
      }
      
      // Refresh batch count after successful transaction
      await loadBatchCount();
      
      return { success: true, transaction };
    } catch (error) {
      console.error('Contract function error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            setContract(contract);
            await loadBatchCount(contract);
          }
        } catch (error) {
          console.error('Error checking connected wallet:', error);
        }
      }
    };

    checkConnectedWallet();
  }, []);

  return {
    provider,
    contract,
    account,
    batchCount,
    isLoading,
    connectWallet,
    executeContractFunction,
    loadBatchCount
  };
};