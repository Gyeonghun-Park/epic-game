const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Marine", "Zergling", "Zealot"],
    [
      "QmWaMh1Srr2nq7BczeAfS4SVMDeD7Hp9bffCdPCC37PEsT",
      "Qme4iLavrugujTbUWMQ5BPiefMpEv1L6Gkpdw43ewvYPcj",
      "QmSiW2wcvf3zYkKdV5EmYXm9HxRhGPw8tqKyijF83wHtVi",
    ],
    [100, 200, 300],
    [100, 50, 25]
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #2");

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  console.log("Minted NFT #3");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #4");

  console.log("Done deploying and minting!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
