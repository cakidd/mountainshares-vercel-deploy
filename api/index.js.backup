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
