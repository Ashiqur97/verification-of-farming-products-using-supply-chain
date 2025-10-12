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
  const [networkId, setNetworkId] = useState(null);

  // Hardcoded contract address since the artifact doesn't have networks property
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

  // Function to switch to local network
  const switchToLocalNetwork = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      // Try to switch to the Hardhat network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x539' }], // 1337 in hex
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x539', // 1337 in hex
                chainName: 'Localhost 8545',
                rpcUrls: ['http://localhost:8545'],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding network:", addError);
          setError("Failed to add local network to MetaMask");
        }
      } else {
        console.error("Error switching network:", switchError);
        setError("Failed to switch to local network");
      }
    }
  };

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          // Create provider and signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          
          // Get the network to check if we're connected to the right one
          const network = await provider.getNetwork();
          console.log("Connected to network:", network.name, "chainId:", network.chainId);
          setNetworkId(network.chainId);
          
          // Check if we're on the correct network (Hardhat local network has chainId 31337 or 1337)
          if (network.chainId !== 1337 && network.chainId !== 31337) {
            setError(`Please connect to the local Hardhat network. Click the "Switch to Local Network" button below.`);
            setLoading(false);
            return;
          }
          
          setProvider(provider);
          const signer = provider.getSigner();
          setSigner(signer);

          try {
            // Create contract instance
            const contract = new ethers.Contract(contractAddress, SupplyChainArtifact.abi, signer);
            setContract(contract);

            // Check if contract exists at the address
            const code = await provider.getCode(contractAddress);
            if (code === '0x') {
              console.error("No contract deployed at address:", contractAddress);
              setError(`No contract found at ${contractAddress}. Make sure you're connected to the right network.`);
              setLoading(false);
              return;
            }

            // Check user roles - use try/catch for each role separately
            try {
              // Use hardcoded role values instead of calling contract methods
              const adminRole = "0x0000000000000000000000000000000000000000000000000000000000000000";
              const farmerRole = "0x7935bdc8d456f0fba3e3135e3e9b33b75fc1e30e6c9d9062ad184f0e290b6438";
              const distributorRole = "0x7c5a0221bbb81366356d1c9f3c3f4b0d3c4b33c78a4a6f0c2c126c05a1f7d0b5";
              const retailerRole = "0xaff33e8c8a4ff6e8558a88f6374c0ad78e2423a5a96b9b24233f8b45fb7697c3";
              const consumerRole = "0x2f0b3a2a7f77e526a5f5b9dd75577522977d78d16d50b12f123acc25823fac0e";

              try {
                const hasAdminRole = await contract.hasRole(adminRole, accounts[0]);
                setIsAdmin(hasAdminRole);
              } catch (e) {
                console.warn("Error checking admin role:", e);
              }

              try {
                const hasFarmerRole = await contract.hasRole(farmerRole, accounts[0]);
                setIsFarmer(hasFarmerRole);
              } catch (e) {
                console.warn("Error checking farmer role:", e);
              }

              try {
                const hasDistributorRole = await contract.hasRole(distributorRole, accounts[0]);
                setIsDistributor(hasDistributorRole);
              } catch (e) {
                console.warn("Error checking distributor role:", e);
              }

              try {
                const hasRetailerRole = await contract.hasRole(retailerRole, accounts[0]);
                setIsRetailer(hasRetailerRole);
              } catch (e) {
                console.warn("Error checking retailer role:", e);
              }

              try {
                const hasConsumerRole = await contract.hasRole(consumerRole, accounts[0]);
                setIsConsumer(hasConsumerRole);
              } catch (e) {
                console.warn("Error checking consumer role:", e);
              }
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

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        window.location.reload();
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }
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
      error,
      networkId,
      switchToLocalNetwork
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};