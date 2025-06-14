const ContinentalEmergencyService = require('./continental-emergency.js');
const { ethers } = require('ethers');
const fs = require('fs');

class Phase3MainnetService extends ContinentalEmergencyService {
    constructor(contractAddress) {
        super();
        this.contractAddress = contractAddress;
        this.fayettevilleTokenId = 1;
        this.nftContract = null;
        this.deploymentInfo = null;
        this.loadDeploymentInfo();
    }
    
    loadDeploymentInfo() {
        try {
            // Look for deployment info file
            const files = fs.readdirSync('.').filter(f => f.startsWith('deployment-phase3-'));
            if (files.length > 0) {
                const latestFile = files.sort().pop();
                this.deploymentInfo = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
                this.contractAddress = this.deploymentInfo.contractAddress;
                this.logger.info(`🎯 Loaded deployment info from ${latestFile}`);
            }
        } catch (error) {
            this.logger.warn('⚠️ No deployment info found, using provided contract address');
        }
    }
    
    async initializeNFTContract() {
        if (!this.contractAddress) {
            this.logger.warn('⚠️ No contract address provided');
            return;
        }
        
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                process.env.ETH_RPC_URL || 'https://eth.llamarpc.com'
            );
            const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
            
            const abi = [
                "function reportWeatherEmergency(uint256 stationId, string alertType, uint8 severity, string details)",
                "function monitoringStations(uint256) view returns (string locationName, string state, int128 latitude, int128 longitude, uint8 priorityLevel, uint32 lastWeatherCheck, uint32 totalAlerts, bool isActive)",
                "function totalSupply() view returns (uint256)"
            ];
            
            this.nftContract = new ethers.Contract(this.contractAddress, abi, signer);
            
            // Verify connection
            const totalSupply = await this.nftContract.totalSupply();
            this.logger.info(`✅ Connected to Phase 3 NFT contract: ${this.contractAddress}`);
            this.logger.info(`📊 Total monitoring stations: ${totalSupply}`);
            
        } catch (error) {
            this.logger.error(`❌ Failed to initialize NFT contract: ${error.message}`);
        }
    }
    
    async processAlert(alert, location, priority) {
        // Call parent method first
        await super.processAlert(alert, location, priority);
        
        // Report to NFT contract for Fayetteville WV
        if (this.nftContract && location.name === 'Fayetteville WV') {
            try {
                this.logger.info('🎯 Reporting YOUR FLAGSHIP LOCATION alert to Ethereum blockchain...');
                
                // Calculate gas price dynamically
                const gasPrice = await this.nftContract.provider.getGasPrice();
                const maxGasPrice = ethers.utils.parseUnits('50', 'gwei'); // Cap at 50 gwei
                const actualGasPrice = gasPrice.gt(maxGasPrice) ? maxGasPrice : gasPrice;
                
                const tx = await this.nftContract.reportWeatherEmergency(
                    this.fayettevilleTokenId,
                    alert.event,
                    alert.severity,
                    `[FLAGSHIP] ${alert.headline}`,
                    {
                        gasPrice: actualGasPrice,
                        gasLimit: 200000
                    }
                );
                
                this.logger.info(`🔗 Transaction submitted: ${tx.hash}`);
                const receipt = await tx.wait();
                
                this.logger.info(`✅ FLAGSHIP LOCATION alert on Ethereum blockchain!`);
                this.logger.info(`   Transaction: ${tx.hash}`);
                this.logger.info(`   Gas Used: ${receipt.gasUsed}`);
                this.logger.info(`   Block: ${receipt.blockNumber}`);
                this.logger.info(`🎯 Token ID ${this.fayettevilleTokenId} updated with new alert!`);
                
            } catch (error) {
                this.logger.error(`❌ Blockchain reporting failed: ${error.message}`);
                
                // Log gas estimation issues
                if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
                    this.logger.error('   Issue: Gas estimation failed - contract may have reverted');
                } else if (error.code === 'INSUFFICIENT_FUNDS') {
                    this.logger.error('   Issue: Insufficient ETH for gas');
                }
            }
        }
    }
    
    async start() {
        await this.initializeNFTContract();
        await super.start();
        
        this.logger.info('🎯 Phase 3 MAINNET Continental Emergency Service STARTED!');
        this.logger.info(`🏔️ Your Fayetteville WV = NFT Token ID: ${this.fayettevilleTokenId}`);
        this.logger.info(`📱 Contract: ${this.contractAddress}`);
        this.logger.info(`🌐 Network: Ethereum Mainnet`);
        
        if (this.deploymentInfo) {
            this.logger.info(`🔍 Explorer: ${this.deploymentInfo.verification.etherscan}`);
        }
    }
    
    async getSystemStatus() {
        const status = await super.getStatus();
        
        if (this.nftContract) {
            try {
                const totalSupply = await this.nftContract.totalSupply();
                const flagshipStation = await this.nftContract.monitoringStations(this.fayettevilleTokenId);
                
                status.nft = {
                    contractAddress: this.contractAddress,
                    totalStations: totalSupply.toString(),
                    flagshipStation: {
                        tokenId: this.fayettevilleTokenId,
                        name: flagshipStation.locationName,
                        state: flagshipStation.state,
                        priority: flagshipStation.priorityLevel,
                        totalAlerts: flagshipStation.totalAlerts.toString(),
                        isActive: flagshipStation.isActive
                    }
                };
            } catch (error) {
                status.nft = { error: error.message };
            }
        }
        
        return status;
    }
}

module.exports = Phase3MainnetService;
