import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  console.log(`💳 [${timestamp}] Payment intent request`);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  const { amount, shareId, userId, shareName } = req.body;
  
  // Validation
  const errors = [];
  if (!amount || typeof amount !== 'number') {
    errors.push('Amount is required and must be a number');
  } else {
    if (amount < 50) errors.push('Amount must be at least $0.50');
    if (amount > 99999999) errors.push('Amount must be less than $999,999.99');
  }
  
  if (!shareId) errors.push('ShareId is required');
  
  if (errors.length > 0) {
    console.log('❌ Validation errors:', errors);
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors,
      timestamp
    });
  }

  try {
    console.log(`💳 Creating payment: $${amount/100} for ${shareName || shareId}`);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        shareId: shareId,
        shareName: shareName || 'Mountain Share',
        userId: userId || 'anonymous',
        environment: process.env.NODE_ENV || 'development',
        timestamp: timestamp,
        source: 'mountainshares_web'
      }
    });

    console.log(`✅ Payment intent created: ${paymentIntent.id}`);
    
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      timestamp
    });

  } catch (error) {
    console.error('❌ Payment creation failed:', error.message);
    
    let statusCode = 500;
    let errorMessage = 'Payment creation failed';
    
    switch (error.type) {
      case 'StripeCardError':
        statusCode = 400;
        errorMessage = 'Card declined';
        break;
      case 'StripeRateLimitError':
        statusCode = 429;
        errorMessage = 'Too many requests';
        break;
      case 'StripeInvalidRequestError':
        statusCode = 400;
        errorMessage = 'Invalid request';
        break;
      default:
        errorMessage = 'Payment service error';
    }
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: error.message,
      timestamp
    });
  }
}
