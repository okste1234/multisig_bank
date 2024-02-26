import { ethers } from "hardhat";

async function main() {

const token = await ethers.deployContract("Token");

  await token.waitForDeployment();

  console.log(`Token deployed to ${token.target}`);

  const cooperateBankFactory = await ethers.deployContract("MultiSigFactory");

  await cooperateBankFactory.waitForDeployment();
  
  console.log(`CooperateBank deployed to ${cooperateBankFactory.target}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xE1d66BD37B345A7EFfF21dd2a71014Ae57477c88
// 0x3e487c38D80Eb4Ef1eeA96a6A67e203F3754f835