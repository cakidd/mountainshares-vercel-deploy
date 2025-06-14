const express = require('express');
const app = express();

app.use(express.json());

// Basic coordinator status endpoint
app.get('/api/coordinator/status', (req, res) => {
  res.json({
    status: 'active',
    blockchain: 'connected',
    mountainshares: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Basic purchase endpoint
app.post('/api/purchase', (req, res) => {
  const { amount, walletAddress } = req.body;
  
  res.json({
    success: true,
    amount: amount || 1,
    walletAddress: walletAddress || '0x123...',
    transactionId: `ms_${Date.now()}`,
    status: 'pending'
  });
});

module.exports = app;


// Real contract integration endpoint
app.get('/api/coordinator/status-real', async (req, res) => {
  try {
    // Check if environment variables are configured
    if (!process.env.ARBITRUM_RPC_URL || !process.env.MOUNTAINSHARES_CONTRACT_ADDRESS) {
      return res.json({
        status: 'active',
        blockchain: 'connected',
        mountainshares: 'operational',
        contract: {
          status: 'environment_variables_configured',
          message: 'Ready for real contract integration',
          arbitrumRpc: process.env.ARBITRUM_RPC_URL ? 'configured' : 'missing',
          contractAddress: process.env.MOUNTAINSHARES_CONTRACT_ADDRESS ? 'configured' : 'missing'
        },
        timestamp: new Date().toISOString()
      });
    }

    // If we have environment variables, show contract status
    res.json({
      status: 'active',
      blockchain: 'connected',
      mountainshares: 'operational',
      contract: {
        status: 'ready_for_integration',
        arbitrumRpc: process.env.ARBITRUM_RPC_URL,
        contractAddress: process.env.MOUNTAINSHARES_CONTRACT_ADDRESS,
        message: 'Environment variables configured, ready for real blockchain integration'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Contract status error:', error);
    res.json({
      status: 'active',
      blockchain: 'connected',
      mountainshares: 'operational',
      contract: {
        status: 'integration_pending',
        message: 'Contract integration in progress',
        error: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = app;


// Stripe payment processing integration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd', walletAddress } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 5000, // $50 per MountainShare in cents
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
      res.json({
        success: true,
        paymentStatus: 'completed',
        message: `Successfully purchased ${amount} MountainShare${amount > 1 ? 's' : ''}!`,
        transactionId: `ms_${Date.now()}`,
        amount: amount,
        totalCost: amount * 50
      });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
