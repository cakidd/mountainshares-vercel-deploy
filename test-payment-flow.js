const fetch = require('node-fetch');

async function testPaymentFlow() {
    try {
        console.log('🧪 Testing payment flow...');
        
        // Test server is running
        const healthCheck = await fetch('http://localhost:3000');
        if (!healthCheck.ok) {
            throw new Error('Server not responding on port 3000');
        }
        console.log('✅ Server is running');
        
        // Test payment intent creation
        const paymentResponse = await fetch('http://localhost:3000/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 1500, // $15.00
                shareId: 'test-share-001'
            })
        });
        
        if (!paymentResponse.ok) {
            throw new Error('Payment intent creation failed');
        }
        
        const paymentData = await paymentResponse.json();
        console.log('✅ Payment intent created:', paymentData.clientSecret ? 'Success' : 'Failed');
        
        console.log('🎉 Payment flow test completed!');
        
    } catch (error) {
        console.error('❌ Payment flow test failed:', error.message);
        console.log('💡 Make sure your server is running on port 3000');
        process.exit(1);
    }
}

testPaymentFlow();
