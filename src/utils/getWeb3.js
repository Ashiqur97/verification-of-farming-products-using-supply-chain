const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        window.ethereum.request({ method: 'eth_requestAccounts' });
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('MetaMask not installed'));
    }
  });
};

export default getWeb3;