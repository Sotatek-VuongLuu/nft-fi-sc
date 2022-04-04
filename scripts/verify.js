const hre = require("hardhat");
const { getContracts } = require("./utils");

async function main() {
  const network = hre.network.name;
  const contracts = await getContracts(network)[network];
  console.log("nftaq address:", contracts.nftaq);
  console.log(
    await hre.run("verify:verify", {
      address: contracts.nftaq,
      constructorArguments: [
        contracts.erc20CurrencyIsWhitelisted,
        contracts.nftContractIsWhitelisted,
      ],
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
