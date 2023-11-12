// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const accounts = hre.ethers.getSigners();

    

  const lockedAmount = hre.ethers.parseEther("0.001");

  const rmt = await hre.ethers.deployContract("Roommate", {
    name: "eddie",
    email:"eddie@gmail.com"
  },
  {
    name: "emma",
    email:"emma@gmail.com"
  },
  [1200]
    );

  await rmt.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${rmt.target}`
  );
  console.log(
    `Name: ${rmt.person1.name}\n Rent: ${rmt.person1.rent} \n\n
     Name: ${rmt.person2.name}\n Rent: ${rmt.person2.rent}`
  )

  console.log(accounts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*const starkware = require('starknet'); // Use the appropriate StarkNet SDK

const contractAddress = '0x011f7580122db2ee0a29b6f5c6859c9180f1a2b3d5db667364eb89be487035ff'; // Replace with your deployed StarkNet contract address
//const snt =  starkware.OpenZeppelinAccount.createAccount({
  //salt: "0x123", // salt to always deploy to an expected address
  //privateKey: "0x058d82633dc5d782b4a9cb71df0c0cdf8a398c6ccec635f08c990da9f69cfef9" // the public key will be inferred
//});
async function fetchDataFromStarkNet() {
    try {
        const snt = new starkware.Starknet();
        await starknet.initialize();
        
        // Example: Retrieving data from a StarkNet contract
        const contract = snt.contract(contractAddress);
        
        const person1Name = await contract.getPerson1Name();
        const person1Rent = await contract.getPerson1Rent();
        const person2Name = await contract.getPerson2Name();
        const person2Rent = await contract.getPerson2Rent();

        console.log(`Person 1: Name - ${person1Name}, Rent - ${person1Rent}`);
        console.log(`Person 2: Name - ${person2Name}, Rent - ${person2Rent}`);
    } catch (error) {
        console.error('Error fetching data from StarkNet:', error);
    }
}

fetchDataFromStarkNet();*/
