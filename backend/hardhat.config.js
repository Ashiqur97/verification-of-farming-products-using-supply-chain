import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const {
  RPC_URL,
  PRIVATE_KEY_FARMER,
  PRIVATE_KEY_DISTRIBUTOR,
  PRIVATE_KEY_RETAILER,
  PRIVATE_KEY_CONSUMER,
} = process.env;

const config = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    local: {
      url: RPC_URL || "http://127.0.0.1:8545",
      accounts: [
        PRIVATE_KEY_FARMER,
        PRIVATE_KEY_DISTRIBUTOR,
        PRIVATE_KEY_RETAILER,
        PRIVATE_KEY_CONSUMER,
      ].filter(Boolean), // removes empty keys
    },
  },
};

export default config;
