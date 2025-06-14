const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(
  process.env.PHASE_CONTRACT_ADDRESS,
  ['function currentPhase() view returns (uint8)',
   'function getExchangeRate() view returns (uint256)',
   'function usdcReserve() view returns (uint256)'],
  provider
);

setInterval(async () => {
  try {
    const phase = await contract.currentPhase();
    const rate = await contract.getExchangeRate();
    const reserve = await contract.usdcReserve();
    const phases = ['🔵 FOUNDATION', '🟢 EARNING', '🟡 PROSPERITY'];
    console.log(`
Phase: ${phases[phase]}
Exchange Rate: ${rate/100}:1 USD
Reserve: $${ethers.utils.formatUnits(reserve,6)}
Time: ${new Date().toLocaleTimeString()}
`);
  } catch (e) {
    console.error('Error:', e.message);
  }
}, 30000);
