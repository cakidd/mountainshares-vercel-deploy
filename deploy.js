const { ethers } = require('hardhat');

async function main() {
  console.log('🚀 Deploying...');
  const ContractFactory = await ethers.getContractFactory('MountainSharesPhaseSystem');
  const contract = await ContractFactory.deploy();
  await contract.deployed();
  console.log('Deployed at:', contract.address);
  // Initialize reserve
  await contract.updateReserve(ethers.utils.parseUnits('75000', 6));
  console.log('Initial reserve set to $75,000');
  // Test phase transition
  await contract.updateReserve(ethers.utils.parseUnits('100000', 6));
  const phase = await contract.currentPhase();
  console.log('Phase after reserve increase:', phase.toString());
}
main().catch(console.error);
