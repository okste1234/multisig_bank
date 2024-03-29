import { ethers } from "hardhat";

async function main() {
    const tokenAddress = "0xE1d66BD37B345A7EFfF21dd2a71014Ae57477c88"

    const factoryAddress = "0x3e487c38D80Eb4Ef1eeA96a6A67e203F3754f835"

  const bankingFactory = await ethers.getContractAt("IFactory", factoryAddress);

  const adresses = ["0x6d2FfC7Bc54e1A420F6a2809721A1D25B415c003", "0x5b338a22Edef630d29e4B3728293bbfE9A25B6BA"]

  const tx = await bankingFactory.createMultiCooperateBank(tokenAddress, adresses, 2)
  await tx.wait();
  
  const result = await bankingFactory.getMultiCooperateBank()
  
  console.log(result);
  
  
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