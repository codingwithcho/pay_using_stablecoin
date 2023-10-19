import { ethers } from "hardhat"
import hre from "hardhat"

const main = async () => {
    // Get the contract factory for your smart contract
    const ChoToken = await ethers.getContractFactory("ChoToken");

    // Deploy the smart contract
    const choToken = await ChoToken.deploy(ethers.parseEther("4000000.0"), "0xb44F6d5d06A0be8550C664BA5aB1e5e8218c3797");
    
    console.log("ChoToken is deployed on ", await choToken.getAddress())
    console.log("Sleeping ......")

    await sleep(400000) // sleepig for about 6 mins

    await hre.run("verify:verify", {
        address: await choToken.getAddress(),
        constructorArguments: [ethers.parseEther("4000000.0"), "0xb44F6d5d06A0be8550C664BA5aB1e5e8218c3797"]
    })
  }

  // Creating a sleep function to delay the execution of the contract so that it can meet the quired time
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  }); 


  // npx hardhat run --network mumbai scripts/deploy.js
  //contract address = 0x285cdf65ec13ef3AedF4e7B20fE81b5E422707B5