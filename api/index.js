const express = require('express');
const app = express();

app.use(express.json());

// Simple coordinator status endpoint
app.get('/api/coordinator/status', (req, res) => {
    res.json({
        status: 'active',
        blockchain: 'connected',
        mountainshares: 'operational',
        timestamp: new Date().toISOString()
    });
});

// Simple purchase endpoint
app.post('/api/purchase', (req, res) => {
    const { amount, walletAddress } = req.body;
    
    if (!amount || !walletAddress) {
        return res.status(400).json({ 
            error: 'Amount and walletAddress are required' 
        });
    }

    res.json({ 
        success: true, 
        amount, 
        walletAddress,
        transactionId: `ms_${Date.now()}`,
        status: 'pending'
    });
});

// Simple health endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'MountainShares API',
        timestamp: new Date().toISOString()
    });
});

module.exports = app;

// Real contract integration endpoints
// const { getContractStatus, executeRealPurchase } = require('./real-blockchain-integration');

// Enhanced coordinator status with real contract data
app.get('/api/coordinator/status-real', async (req, res) => {
  try {
    const contractStatus = await getContractStatus();
    
    res.json({
      status: 'active',
      blockchain: contractStatus.status,
      mountainshares: 'operational',
      contract: contractStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      blockchain: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Real purchase endpoint with blockchain integration
app.post('/api/purchase-real', async (req, res) => {
  const { amount, walletAddress } = req.body;
  
  if (!amount || !walletAddress) {
    return res.status(400).json({ 
      error: 'Amount and walletAddress are required' 
    });
  }

  try {
    // Execute real blockchain transaction
    const result = await executeRealPurchase(amount, walletAddress);
    
    res.json({
      success: true,
      message: `Successfully purchased ${amount} MountainShare${amount > 1 ? 's' : ''}!`,
      blockchain: result,
      transactionHash: result.transactionHash,
      arbitrumExplorer: result.arbitrumExplorer,
      gasUsed: result.gasUsed,
      blockNumber: result.blockNumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Blockchain transaction failed'
    });
  }
});

// Import real blockchain integration
// const { getContractStatus, executeRealPurchase } = require('./real-blockchain-integration');

// Enhanced coordinator status with real contract data
app.get('/api/coordinator/status-real', async (req, res) => {
  try {
    const contractStatus = await getContractStatus();
    
    res.json({
      status: 'active',
      blockchain: contractStatus.status,
      mountainshares: 'operational',
      contract: contractStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      blockchain: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Real purchase endpoint with blockchain integration
app.post('/api/purchase-real', async (req, res) => {
  const { amount, walletAddress } = req.body;
  
  if (!amount || !walletAddress) {
    return res.status(400).json({ 
      error: 'Amount and walletAddress are required' 
    });
  }

  try {
    // Execute real blockchain transaction
    const result = await executeRealPurchase(amount, walletAddress);
    
    res.json({
      success: true,
      message: `Successfully purchased ${amount} MountainShare${amount > 1 ? 's' : ''}!`,
      blockchain: result,
      transactionHash: result.transactionHash,
      arbitrumExplorer: result.arbitrumExplorer,
      gasUsed: result.gasUsed,
      blockNumber: result.blockNumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Blockchain transaction failed'
    });
  }
});
