const ContinentalEmergencyService = require('./continental-emergency.js');
const { ethers } = require('ethers');

class Phase3ContinentalEmergencyService extends ContinentalEmergencyService {
    constructor() {
        super();
        // Use localhost contract for testing
        this.nftContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        this.fayettevilleTokenId = 1;
    }
    
    async processAlert(alert, location, priority) {
        await super.processAlert(alert, location, priority);
        
        if (location.name === 'Fayetteville WV') {
            this.logger.info(`🎯 YOUR LOCATION alert would be reported to NFT Token ID: ${this.fayettevilleTokenId}`);
            this.logger.info(`🔗 Contract: ${this.nftContractAddress}`);
            this.logger.info(`📊 Alert: ${alert.event} - Severity: ${alert.severity}`);
        }
    }
    
    async start() {
        await super.start();
        this.logger.info('🎯 Phase 3 Continental Emergency Service STARTED!');
        this.logger.info(`🏔️ Your Fayetteville WV = NFT Token ID: ${this.fayettevilleTokenId}`);
        this.logger.info(`📱 Contract: ${this.nftContractAddress}`);
    }
}

module.exports = Phase3ContinentalEmergencyService;
