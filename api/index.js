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
