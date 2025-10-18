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
            contract = new ethers.Contract(CONTRACT_ADDRESS, SupplyChainABI, signer);
            const address = await signer.getAddress();
            currentAddress = address;

            console.log("Wallect Connected: ", address);
            return {success: true, address};
        } catch (error) {
            
        }
    }
}

