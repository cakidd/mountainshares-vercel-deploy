const PhaseManager = require('./phase-manager');
const pm = new PhaseManager();

const newReserve = process.argv[2];
if (!newReserve) {
    console.log('Usage: node update-reserve.js <amount_in_dollars>');
    process.exit(1);
}

pm.updateReserve(newReserve * 100).then(() => {
    return pm.getSystemStatus();
}).then(status => {
    console.log(`💰 Reserve updated to: $${status.usdReserve.toLocaleString()}`);
    console.log(`📊 Current phase: ${status.phase}`);
    console.log(`🔄 MS Earning: ${status.msEarningEnabled ? '🟢 ENABLED' : '🔴 DISABLED'}`);
});
