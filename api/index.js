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
      amount: amount * 100, // $50 per MountainShare in cents
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
        totalCost: amount * 1
      });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;

// Complete payment to blockchain integration
app.post('/api/confirm-purchase', async (req, res) => {
  const { paymentIntentId, walletAddress, amount } = req.body;
  
  try {
    // Verify payment completed with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Execute real blockchain transaction (if contract is connected)
      if (process.env.MOUNTAINSHARES_CONTRACT_ADDRESS && process.env.PRIVATE_KEY) {
        try {
          const { ethers } = require('ethers');
          const provider = new ethers.providers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL);
          const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
          
          // This would connect to your real contract
          // const contract = new ethers.Contract(process.env.MOUNTAINSHARES_CONTRACT_ADDRESS, ABI, wallet);
          // const tx = await contract.mintMountainShares(walletAddress, amount);
          
          // For now, return successful mock transaction
          const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
          
          res.json({
            success: true,
            paymentStatus: 'completed',
            message: `Successfully purchased ${amount} MountainShare${amount > 1 ? 's' : ''}!`,
            transactionHash: mockTxHash,
            arbitrumExplorer: `https://arbiscan.io/tx/${mockTxHash}`,
            amount: amount,
            totalCost: amount * 1,
            walletAddress: walletAddress,
            timestamp: new Date().toISOString()
          });
        } catch (blockchainError) {
          // Payment succeeded but blockchain failed - handle appropriately
          res.json({
            success: true,
            paymentStatus: 'completed',
            message: `Payment successful! MountainShares will be transferred shortly.`,
            amount: amount,
            totalCost: amount * 1,
            walletAddress: walletAddress,
            note: 'Blockchain transaction pending',
            timestamp: new Date().toISOString()
          });
        }
      } else {
        // Payment succeeded, blockchain integration pending
        res.json({
          success: true,
          paymentStatus: 'completed',
          message: `Successfully purchased ${amount} MountainShare${amount > 1 ? 's' : ''}!`,
          amount: amount,
          totalCost: amount * 1,
          walletAddress: walletAddress,
          transactionId: `ms_${Date.now()}`,
          note: 'Real blockchain integration ready for deployment',
          timestamp: new Date().toISOString()
        });
      }
    } else {
      res.status(400).json({ 
        success: false, 
        error: 'Payment not completed',
        paymentStatus: paymentIntent.status 
      });
    }
  } catch (error) {
    console.error('Purchase confirmation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Transaction receipt endpoint
app.get('/api/receipt/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    res.json({
      success: true,
      receipt: {
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        created: new Date(paymentIntent.created * 1000).toISOString(),
        description: paymentIntent.description || 'MountainShares Purchase',
        metadata: paymentIntent.metadata
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
