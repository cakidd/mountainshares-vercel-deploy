#!/bin/bash
echo "📊 MountainShares Phase System Status"
echo "===================================="

# Create a quick status check
node -e "
const PhaseManager = require('./phase-manager');
const pm = new PhaseManager();

pm.getSystemStatus().then(status => {
    console.log('Current Phase:', status.phase);
    console.log('MS Earning:', status.msEarningEnabled ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('Exchange Rate:', status.exchangeRate + ':1 USD');
    console.log('Staking APY:', status.stakingAPY + '%');
    console.log('USD Reserve: $' + status.usdReserve.toLocaleString());
    console.log('Volunteer Value: $' + status.volunteerValue);
});
"
