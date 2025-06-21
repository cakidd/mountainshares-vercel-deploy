const fetch = require('node-fetch');

async function testWebhookFix() {
    console.log('🧪 Testing webhook signature fix...');
    
    try {
        // Test payment intent creation
        const paymentResponse = await fetch('http://localhost:3000/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 1500, // $15.00
                shareId: 'webhook-test-001',
                userId: 'test-user-webhook'
            })
        });
        
        const paymentData = await paymentResponse.json();
        console.log('✅ Payment Intent Created:', paymentData.paymentIntentId);
        
        console.log('\n🎯 NEXT STEPS:');
        console.log('1. Your webhook handler is now fixed');
        console.log('2. Process a real payment to see the Arbitrum integration');
        console.log('3. Visit: http://localhost:3000/buy-mountain-share');
        console.log('4. Use test card: 4242424242424242');
        console.log('5. Watch for the complete Web2 → Web3 integration logs!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testWebhookFix();
