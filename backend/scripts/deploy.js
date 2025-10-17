import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  console.log("Deploying SupplyChain contract...");
  
  const ContractFactory = await ethers.getContractFactory("SupplyChain");
  const contract = await ContractFactory.deploy();
  
  await contract.deployed();
  
  console.log("Contract deployed to:", contract.address);
  
  // Get signers for different roles
  const [deployer, farmer, distributor, retailer, consumer] = await ethers.getSigners();
  
  console.log("Assigning roles...");
  console.log("Farmer address:", farmer.address);
  console.log("Distributor address:", distributor.address);
  console.log("Retailer address:", retailer.address);
  console.log("Consumer address:", consumer.address);
  
  // Get role identifiers
  const FARMER_ROLE = await contract.FARMER_ROLE();
  const DISTRIBUTOR_ROLE = await contract.DISTRIBUTOR_ROLE();
  const RETAILER_ROLE = await contract.RETAILER_ROLE();
  const CONSUMER_ROLE = await contract.CONSUMER_ROLE();
  
  // Assign roles
  await contract.grantRole(FARMER_ROLE, farmer.address);
  await contract.grantRole(DISTRIBUTOR_ROLE, distributor.address);
  await contract.grantRole(RETAILER_ROLE, retailer.address);
  await contract.grantRole(CONSUMER_ROLE, consumer.address);
  
  console.log("All roles assigned successfully!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Deployment failed:", error.message);
  process.exit(1);
});
