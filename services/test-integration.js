async function testSystem() {
    const Emergency = require('./continental-emergency');
    const monitor = new Emergency();

    console.log('✅ Emergency Monitor loaded');
    console.log('✅ PhaseManager initialized:', !!monitor.phaseManager);
    console.log('✅ calculateBaseReward method:', typeof monitor.calculateBaseReward);

    // Test reward calculation
    const mockAlert = { severity: 'Severe' };
    const baseReward = monitor.calculateBaseReward(mockAlert, 'ARC_PRIORITY');
    console.log('✅ Base reward calculation:', baseReward, 'MS');

    // Test phase status
    const status = await monitor.phaseManager.getSystemStatus();
    console.log('✅ Current phase:', status.phase);
    console.log('✅ MS Earning:', status.msEarningEnabled ? '🟢 ENABLED' : '🔴 DISABLED');

    console.log('🎉 MountainShares Phase System fully integrated!');
}

testSystem().catch(console.error);
