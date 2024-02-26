import { ethers } from "hardhat";

async function main() {
    const tokenAddress = "0xE1d66BD37B345A7EFfF21dd2a71014Ae57477c88"

    const bankAddress = "0xA03ade3f4683a2f88a2A423C42b280C6b3e3B7F1"

    const cooperateBank = await ethers.getContractAt("IBank", bankAddress);

    const token = await ethers.getContractAt("IToken", tokenAddress);

    (await token.approve(bankAddress, 10000)).wait();

    const txDeposit = await cooperateBank.deposit(5000)
    await txDeposit.wait(); 
  
    console.log(txDeposit)
  
  
}
//0xA03ade3f4683a2f88a2A423C42b280C6b3e3B7F1

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xE1d66BD37B345A7EFfF21dd2a71014Ae57477c88
// 0x3e487c38D80Eb4Ef1eeA96a6A67e203F3754f835