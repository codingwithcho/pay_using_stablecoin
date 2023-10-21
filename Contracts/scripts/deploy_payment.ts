import { ethers } from "hardhat"
import hre from "hardhat"

// If you haven't seen lesson #4 you can check it out, I coded this line by line
const main = async () => {
    // Get the contract factory for your smart contract
    const Payment = await ethers.getContractFactory("Payment");

    // Deploy the smart contract
    const payment = await Payment.deploy("0xb44F6d5d06A0be8550C664BA5aB1e5e8218c3797");
    
    console.log("Payment is deployed on ", await payment.getAddress())
    console.log("Sleeping ......")

    await sleep(400000) // sleepig for about 6 mins

    await hre.run("verify:verify", {
        address: await payment.getAddress(),
        constructorArguments: ["0xb44F6d5d06A0be8550C664BA5aB1e5e8218c3797"]
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
  //contract address = 0xE6E75622a3C0050292B55728A97d847A1f08f47e