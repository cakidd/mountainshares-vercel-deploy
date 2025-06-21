console.log('🏛️ TESTING THE COMMONS INTEGRATION');
console.log('==================================');

async function testCommonsIntegration() {
    try {
        // Test The Commons website
        console.log('1️⃣ Testing The Commons website...');
        const commonsResponse = await fetch('http://localhost:8080');
        if (commonsResponse.ok) {
            console.log('✅ The Commons website: Running on port 8080');
        } else {
            throw new Error('Commons website not responding');
        }
        
        // Test MountainShares backend health
        console.log('2️⃣ Testing MountainShares backend...');
        const healthResponse = await fetch('http://localhost:3000/api/health');
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ MountainShares backend: Healthy');
            console.log(`✅ Contract: ${healthData.mountainshares.contractAddress}`);
            console.log(`✅ Commons integration: ${healthData.mountainshares.commonsIntegration}`);
        } else {
            throw new Error('Backend health check failed');
        }
        
        // Test payment intent creation
        console.log('3️⃣ Testing payment integration...');
        const paymentResponse = await fetch('http://localhost:3000/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 136, // $1.36 in cents
                shareId: 'commons-integration-test',
                userId: '0x742d35Cc6634C0532925a3b8D4C0C3F8E1C2E1B8',
                msTokens: 1
            })
        });
        
        if (paymentResponse.ok) {
            const paymentData = await paymentResponse.json();
            console.log('✅ Payment integration: Working');
            console.log(`✅ Payment ID: ${paymentData.paymentIntentId}`);
        } else {
            throw new Error('Payment integration failed');
        }
        
        console.log('\n🎉 THE COMMONS INTEGRATION SUCCESSFUL!');
        console.log('');
        console.log('📋 NEXT STEPS:');
        console.log('1. Visit: http://localhost:8080 (The Commons website)');
        console.log('2. Check backend status in the Commons interface');
        console.log('3. Test a purchase with wallet address 0x...');
        console.log('4. Monitor your MountainShares backend logs');
        console.log('');
        console.log('🏛️ The Commons is now connected to your MountainShares backend!');
        
    } catch (error) {
        console.error('❌ Integration test failed:', error.message);
        console.log('\n🔧 TROUBLESHOOTING:');
        console.log('- Check if both servers are running');
        console.log('- Verify ports 3000 and 8080 are available');
        console.log('- Check server logs for errors');
    }
}

testCommonsIntegration();
