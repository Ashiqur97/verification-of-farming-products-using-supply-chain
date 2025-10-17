import hardhat from "hardhat";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { ethers } = hardhat; // destructure ethers

// === CONFIGURATION ===
const rpcUrl = process.env.RPC_URL;
const contractAddress = process.env.DEPLOYED_CONTRACT;

const {
  PRIVATE_KEY_FARMER,
  PRIVATE_KEY_DISTRIBUTOR,
  PRIVATE_KEY_RETAILER,
  PRIVATE_KEY_CONSUMER,
} = process.env;

// === LOAD ABI ===
const artifactPath = path.resolve(
  "./artifacts/contracts/SupplyChain.sol/SupplyChain.json"
);
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const abi = artifact.abi;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  // Wallets
  const farmer = new ethers.Wallet(PRIVATE_KEY_FARMER, provider);
  const distributor = new ethers.Wallet(PRIVATE_KEY_DISTRIBUTOR, provider);
  const retailer = new ethers.Wallet(PRIVATE_KEY_RETAILER, provider);
  const consumer = new ethers.Wallet(PRIVATE_KEY_CONSUMER, provider);

  console.log("👨‍🌾 Farmer:", farmer.address);
  console.log("🚚 Distributor:", distributor.address);
  console.log("🏪 Retailer:", retailer.address);
  console.log("🧍‍♂️ Consumer:", consumer.address);

  // Contract instances
  const farmerContract = new ethers.Contract(contractAddress, abi, farmer);
  const distributorContract = new ethers.Contract(contractAddress, abi, distributor);
  const retailerContract = new ethers.Contract(contractAddress, abi, retailer);
  const consumerContract = new ethers.Contract(contractAddress, abi, consumer);

  // === Interactions ===

  console.log("\nCreating batch as Farmer...");
  const createTx = await farmerContract.createBatch(
    "BATCH001",
    "CERT001",
    0,
    "Mango",
    "Rajshahi, Bangladesh",
    Math.floor(Date.now() / 1000)
  );
  await createTx.wait();
  console.log("✅ Batch created by Farmer");

  const latestBatchId = await farmerContract.totalBatches();

  console.log("\nProcessing batch as Distributor...");
  const processTx = await distributorContract.markProcessed(latestBatchId);
  await processTx.wait();
  console.log("✅ Batch processed by Distributor");

  console.log("\nPutting batch for sale as Retailer...");
  const saleTx = await retailerContract.putForSale(latestBatchId);
  await saleTx.wait();
  console.log("✅ Batch is now For Sale");

  console.log("\nReading batch details as Consumer...");
  const [core, logistics, retailInfo] = await consumerContract.getFullBatch(latestBatchId);
  console.log("📦 Batch Core:", core);
  console.log("🚚 Logistics:", logistics);
  console.log("🏪 Retail Info:", retailInfo);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
