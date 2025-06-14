const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { executeRealPurchase } = require('./real-blockchain-integration');

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd', walletAddress } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: { 
        mountainshares_purchase: true,
        wallet_address: walletAddress,
        shares_amount: amount
      }
    });
    
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/confirm-purchase', async (req, res) => {
  const { paymentIntentId, walletAddress, amount } = req.body;
  
  try {
    // Verify payment completed
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Execute real blockchain transaction
      const blockchainResult = await executeRealPurchase(amount, walletAddress);
      
      res.json({
        success: true,
        paymentStatus: 'completed',
        blockchain: blockchainResult,
        transactionHash: blockchainResult.transactionHash,
        arbitrumExplorer: blockchainResult.arbitrumExplorer
      });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { stripe };
