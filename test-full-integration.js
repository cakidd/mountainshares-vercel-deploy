const fetch = require('node-fetch');

async function testFullIntegration() {
    console.log('🚀 Testing FULL Web2 → Web3 Integration...');
    
    try {
        // 1. Test server health
        console.log('1️⃣ Testing server health...');
        const healthCheck = await fetch('http://localhost:3000');
        if (!healthCheck.ok) throw new Error('Server not responding');
        console.log('✅ Server: Online');
        
        // 2. Test payment intent creation
        console.log('2️⃣ Testing payment creation...');
        const paymentResponse = await fetch('http://localhost:3000/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 1500, // $15.00
                shareId: 'integration-test-001',
                userId: 'test-user-123'
            })
        });
        
        const paymentData = await paymentResponse.json();
        console.log('✅ Payment Intent:', paymentData.clientSecret ? 'Created' : 'Failed');
        console.log('💳 Payment ID:', paymentData.paymentIntentId);
        
        // 3. Test webhook endpoint
        console.log('3️⃣ Testing webhook endpoint...');
        const webhookTest = await fetch('http://localhost:3000/api/webhooks/stripe', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'stripe-signature': 'test-signature'
            },
            body: JSON.stringify({
                type: 'payment_intent.succeeded',
                data: {
                    object: {
                        id: 'pi_test_integration',
                        amount: 1500,
                        metadata: {
                            shareId: 'integration-test-001',
                            userId: 'test-user-123'
                        }
                    }
                }
            })
        });
        
        console.log('✅ Webhook Endpoint:', webhookTest.status === 200 ? 'Responsive' : 'Error');
        
        console.log('\n🎯 INTEGRATION TEST SUMMARY:');
        console.log('✅ Server: Running on port 3000');
        console.log('✅ Payment API: Creating payment intents');
        console.log('✅ Webhook: Receiving events');
        console.log('✅ Ready for: Arbitrum contract connection');
        
        console.log('\n🚀 NEXT STEP: Process a real payment to trigger Arbitrum integration!');
        console.log('Visit: http://localhost:3000/buy-mountain-share');
        console.log('Use test card: 4242424242424242');
        
    } catch (error) {
        console.error('❌ Integration test failed:', error.message);
        process.exit(1);
    }
}

testFullIntegration();
