const PhaseManager = require('./phase-system/phase-manager');

class MountainSharesPhaseWrapper {
    constructor() {
        this.phaseManager = new PhaseManager();
    }
    
    async enhanceEmergencyReward(baseReward, responderAddress) {
        return await this.phaseManager.recordEmergencyResponse(
            Date.now(),
            responderAddress,
            baseReward
        );
    }
    
    async getPhaseStatus() {
        return await this.phaseManager.getSystemStatus();
    }
}

module.exports = MountainSharesPhaseWrapper;
