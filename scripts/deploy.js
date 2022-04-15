const hre = require("hardhat");
const { ethers, upgrades } = hre;
const ethersJS = require("ethers");
const { getContracts, saveContract } = require('./utils')

async function main() {
  const network = hre.network.name;
  const contracts = await getContracts(network)[network];
  const NFTaq = await ethers.getContractFactory("NFTaq");
  const nftaq = await NFTaq.deploy(contracts.erc20CurrencyIsWhitelisted, contracts.nftContractIsWhitelisted);

  await nftaq.deployed();
  await saveContract(network, 'nftaq', nftaq.address);
  console.log("nftaq address:", nftaq.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
