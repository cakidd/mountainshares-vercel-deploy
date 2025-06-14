const EnhancedEmergencyMonitor = require('./emergency-integration');

async function runTests() {
    const monitor = new EnhancedEmergencyMonitor();
    
    console.log('\n🧪 Testing Phase System...\n');
    
    // Test 1: FOUNDATION phase (earning disabled)
    console.log('=== Test 1: FOUNDATION Phase ===');
    await monitor.processEmergencyResponse('wildfire', '0x123...', 100);
    
    // Test 2: Upgrade to EARNING phase
    console.log('\n=== Test 2: Upgrade to EARNING Phase ===');
    await monitor.updateSystemReserve(100000); // $100,000 reserve
    await monitor.processEmergencyResponse('flood', '0x456...', 100);
    
    // Test 3: Fallback protection
    console.log('\n=== Test 3: Fallback Protection ===');
    await monitor.updateSystemReserve(75000); // Drop to $75,000
    await monitor.processEmergencyResponse('earthquake', '0x789...', 100);
    
    console.log('\n✅ All tests completed!');
}

runTests().catch(console.error);
