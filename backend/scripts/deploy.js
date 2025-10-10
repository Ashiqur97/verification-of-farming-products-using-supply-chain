// Import hardhat as CommonJS module in ES module environment
import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  console.log("Deploying SupplyChain contract...");

  // Get the contract factory
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  
  // Deploy the contract
  const supplyChain = await SupplyChain.deploy();
  await supplyChain.deployed();

  console.log(`SupplyChain contract deployed to: ${supplyChain.address}`);

  // Get signers for role assignment
  const [deployer, farmer, distributor, retailer, consumer] = await ethers.getSigners();
  
  console.log("Setting up roles...");
  
  // Define role constants (must match the ones in the contract)
  const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"));
  const FARMER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("FARMER_ROLE"));
  const DISTRIBUTOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("DISTRIBUTOR_ROLE"));
  const RETAILER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("RETAILER_ROLE"));
  const CONSUMER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CONSUMER_ROLE"));
  
  // Grant roles
  // Deployer is already admin by default, but we'll set up other roles
  
  // Grant FARMER_ROLE to farmer address
  let tx = await supplyChain.grantRole(FARMER_ROLE, farmer.address);
  await tx.wait();
  console.log(`FARMER_ROLE granted to: ${farmer.address}`);
  
  // Grant DISTRIBUTOR_ROLE to distributor address
  tx = await supplyChain.grantRole(DISTRIBUTOR_ROLE, distributor.address);
  await tx.wait();
  console.log(`DISTRIBUTOR_ROLE granted to: ${distributor.address}`);
  
  // Grant RETAILER_ROLE to retailer address
  tx = await supplyChain.grantRole(RETAILER_ROLE, retailer.address);
  await tx.wait();
  console.log(`RETAILER_ROLE granted to: ${retailer.address}`);
  
  // Grant CONSUMER_ROLE to consumer address
  tx = await supplyChain.grantRole(CONSUMER_ROLE, consumer.address);
  await tx.wait();
  console.log(`CONSUMER_ROLE granted to: ${consumer.address}`);
  
  console.log("All roles assigned successfully!");
  console.log("Deployment and setup complete!");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });