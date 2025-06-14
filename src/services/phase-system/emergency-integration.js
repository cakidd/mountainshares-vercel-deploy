const PhaseManager = require('./phase-manager');

class EnhancedEmergencyMonitor {
    constructor() {
        this.phaseManager = new PhaseManager();
        console.log('🎯 Phase System initialized');
    }

    async processEmergencyResponse(alert, responderAddress, baseReward) {
        // Apply phase system multiplier
        const actualReward = await this.phaseManager.recordEmergencyResponse(
            Date.now(),
            responderAddress,
            baseReward
        );
        
        // Get current system status
        const status = await this.phaseManager.getSystemStatus();
        
        console.log(`📊 Phase: ${status.phase} | Earning: ${status.msEarningEnabled ? '🟢 ON' : '🔴 OFF'}`);
        console.log(`💰 Reward: ${baseReward} → ${actualReward} MS`);
        
        return actualReward;
    }

    async updateSystemReserve(newReserveAmount) {
        await this.phaseManager.updateReserve(newReserveAmount * 100); // Convert to cents
        const status = await this.phaseManager.getSystemStatus();
        console.log(`💳 Reserve updated: $${status.usdReserve.toLocaleString()}`);
    }
}

module.exports = EnhancedEmergencyMonitor;
