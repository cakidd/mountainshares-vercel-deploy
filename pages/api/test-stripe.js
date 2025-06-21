import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  console.log(`🧪 [${timestamp}] Testing Stripe Integration`);
  
  try {
    // Test environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY not found');
    }
    
    if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_test_')) {
      throw new Error('Use test key for development');
    }
    
    console.log('✅ Environment variables valid');
    
    // Test Stripe connection
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe connection successful');
    
    // Test payment intent creation
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      metadata: {
        test: 'local_testing',
        shareId: 'test-share-123',
        timestamp: timestamp
      }
    });
    
    console.log('✅ Payment intent created:', paymentIntent.id);
    
    res.json({
      success: true,
      timestamp: timestamp,
      account: account.display_name || 'Test Account',
      paymentIntent: paymentIntent.id,
      clientSecret: paymentIntent.client_secret
    });
    
  } catch (error) {
    console.error('❌ Stripe error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: timestamp
    });
  }
}
