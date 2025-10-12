import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SupplyChainArtifact from '../contracts/SupplyChain.json';

const BlockchainContext = createContext();

export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);
  const [isDistributor, setIsDistributor] = useState(false);
  const [isRetailer, setIsRetailer] = useState(false);
  const [isConsumer, setIsConsumer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded contract address since the artifact doesn't have networks property
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          // Create provider and signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          const signer = provider.getSigner();
          setSigner(signer);

          try {
            // Create contract instance
            const contract = new ethers.Contract(contractAddress, SupplyChainArtifact.abi, signer);
            setContract(contract);

            // Check user roles
            try {
              const adminRole = await contract.ADMIN_ROLE();
              const farmerRole = await contract.FARMER_ROLE();
              const distributorRole = await contract.DISTRIBUTOR_ROLE();
              const retailerRole = await contract.RETAILER_ROLE();
              const consumerRole = await contract.CONSUMER_ROLE();

              const hasAdminRole = await contract.hasRole(adminRole, accounts[0]);
              const hasFarmerRole = await contract.hasRole(farmerRole, accounts[0]);
              const hasDistributorRole = await contract.hasRole(distributorRole, accounts[0]);
              const hasRetailerRole = await contract.hasRole(retailerRole, accounts[0]);
              const hasConsumerRole = await contract.hasRole(consumerRole, accounts[0]);

              setIsAdmin(hasAdminRole);
              setIsFarmer(hasFarmerRole);
              setIsDistributor(hasDistributorRole);
              setIsRetailer(hasRetailerRole);
              setIsConsumer(hasConsumerRole);
            } catch (roleError) {
              console.warn("Error checking roles:", roleError);
              // Continue with default role values
            }
          } catch (contractError) {
            console.error("Error initializing contract:", contractError);
            setError("Failed to initialize contract. Make sure the contract is deployed and the address is correct.");
          }
          
          setLoading(false);
        } catch (error) {
          console.error("Error connecting to blockchain:", error);
          setError("Failed to connect to blockchain. Please make sure MetaMask is connected.");
          setLoading(false);
        }
      } else {
        console.error("MetaMask not installed");
        setError("MetaMask is not installed. Please install MetaMask to use this application.");
        setLoading(false);
      }
    };

    initBlockchain();
  }, [contractAddress]);

  return (
    <BlockchainContext.Provider value={{
      account,
      contract,
      provider,
      signer,
      isAdmin,
      isFarmer,
      isDistributor,
      isRetailer,
      isConsumer,
      loading,
      error
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};