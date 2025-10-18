import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import SupplyChainABI from '../contracts/SupplyChainABI.json';

let provider;
let signer;
let contract;
let currentAccount = '';

export const connectWallet = async () => {
    if(window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
        } catch (error) {
            
        }
    }
}

