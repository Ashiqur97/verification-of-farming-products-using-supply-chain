const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying SupplyChain...");

 
  const [defaultAdmin, farmer, distributor, retailer, consumer] = await ethers.getSigners();

 
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();
  await supplyChain.deployed(); 


  console.log(`✅ Contract deployed at: ${supplyChain.address}\n`);


  console.log("👤 Key Accounts:");
  console.log(`Default Admin: ${defaultAdmin.address}`);
  console.log(`Farmer:        ${farmer.address}`);
  console.log(`Distributor:   ${distributor.address}`);
  console.log(`Retailer:      ${retailer.address}`);
  console.log(`Consumer:      ${consumer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
