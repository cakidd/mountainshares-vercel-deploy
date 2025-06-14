const express = require('express');
const winston = require('winston');
const dotenv = require('dotenv');
const ProductionEmergencyMonitor = require('./services/continental-emergency');

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
app.get('/', (req, res) => {
    res.json({ 
        message: 'MountainShares Emergency Response System - Production Ready',
        documentation: '/api/docs',
        monitoring: {
            arc_regions: 'Priority coverage for Appalachian communities',
            continental: 'Full US weather monitoring',
            status: emergencyMonitor.isRunning ? 'active' : 'inactive'
        }
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
app.listen(PORT, async () => {
    logger.info(`🚀 Production server running on port ${PORT}`);
    logger.info(`🏔️ ARC Priority Emergency Response System Online`);
    
    // Auto-start emergency monitoring if contract address is configured
    if (process.env.EMERGENCY_CONTRACT_ADDRESS) {
        logger.info('🌐 Auto-starting emergency monitoring...');
        await emergencyMonitor.start();
    } else {
        logger.warn('⚠️ EMERGENCY_CONTRACT_ADDRESS not set - monitoring disabled');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('🛑 Graceful shutdown initiated...');
    emergencyMonitor.stop();
    process.exit(0);
});

module.exports = app;
