const express = require('express');
const winston = require('winston');
const dotenv = require('dotenv');
const ProductionEmergencyMonitor = require('../services/continental-emergency');

// Load environment config
dotenv.config({ path: `config/${process.env.NODE_ENV || 'development'}.env` });

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

// Initialize emergency monitor
const emergencyMonitor = new ProductionEmergencyMonitor();

// Basic production middleware
app.use(express.json({ limit: '10mb' }));
app.use(require('cors')());
app.use(require('compression')());
app.use(require('helmet')());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'mountainshares-emergency-response',
        version: '1.0.0',
        monitoring: emergencyMonitor.isRunning ? 'active' : 'inactive',
        timestamp: new Date().toISOString() 
    });
});

// Main API endpoint
// MountainShares coordinator status endpoint
app.get('/api/coordinator/status', (req, res) => {
    res.json({
        status: 'active',
        blockchain: 'connected',
        mountainshares: 'operational',
        monitoring: emergencyMonitor.isRunning ? 'active' : 'inactive',
        timestamp: new Date().toISOString()
    });
});

// Emergency monitoring control endpoints
app.post('/api/monitoring/start', async (req, res) => {
    try {
        if (!emergencyMonitor.isRunning) {
            await emergencyMonitor.start();
            res.json({ status: 'started', message: 'Emergency monitoring activated' });
        } else {
            res.json({ status: 'already_running', message: 'Emergency monitoring already active' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/monitoring/stop', (req, res) => {
    emergencyMonitor.stop();
    res.json({ status: 'stopped', message: 'Emergency monitoring deactivated' });
});

// Start server
// MountainShares coordinator status endpoint
app.get('/api/coordinator/status', (req, res) => {
    res.json({
        status: 'active',
        blockchain: 'connected',
        mountainshares: 'operational',
        monitoring: emergencyMonitor.isRunning ? 'active' : 'inactive',
        timestamp: new Date().toISOString()
    });
});

// MountainShares purchase endpoint
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

module.exports = app 

