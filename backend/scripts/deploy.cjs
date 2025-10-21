// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();
  await supplyChain.deployed();
  console.log("Contract deployed to:", supplyChain.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});