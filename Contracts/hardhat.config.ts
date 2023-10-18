import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",

  networks: {
    hardhat: {
      accounts: {}
    },

    mumbai: {
      url: process.env.Alchemy_POLYGON_MUMBAI_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY !== undefined ? process.env.POLYGONSCAN_API_KEY : "",
    },
  },
};

export default config;
