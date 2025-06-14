const fs = require('fs');
const path = require('path');
const winston = require('winston');

class PersistentPhaseManager {
    constructor() {
        this.stateFile = path.join(__dirname, 'phase-state.json');
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [new winston.transports.Console()]
        });
        
        // Load existing state or use defaults
        this.loadState();
    }

    loadState() {
        try {
            if (fs.existsSync(this.stateFile)) {
                const state = JSON.parse(fs.readFileSync(this.stateFile, 'utf8'));
                this.currentPhase = state.currentPhase || 0;
                this.usdReserve = state.usdReserve || 7500000;
                this.totalMSSupply = state.totalMSSupply || 1000000;
                this.volunteerValue = state.volunteerValue || 3470;
                this.logger.info(`📂 Loaded state: Phase ${this.currentPhase}, Reserve $${this.usdReserve/100}`);
            } else {
                this.setDefaults();
                this.saveState();
            }
        } catch (error) {
            this.logger.error('❌ Failed to load state, using defaults:', error.message);
            this.setDefaults();
        }
        
        this.phases = {
            0: { name: 'FOUNDATION', msEarning: false, exchangeRate: 1.0, stakingAPY: 3, rewardMultiplier: 1.0 },
            1: { name: 'EARNING', msEarning: true, exchangeRate: 1.0, stakingAPY: 8, rewardMultiplier: 1.25 },
            2: { name: 'PROSPERITY', msEarning: true, exchangeRate: 1.5, stakingAPY: 15, rewardMultiplier: 2.0 }
        };
    }

    setDefaults() {
        this.currentPhase = 0;
        this.usdReserve = 7500000; // $75,000 in cents
        this.totalMSSupply = 1000000;
        this.volunteerValue = 3470; // $34.70 in cents
    }

    saveState() {
        try {
            const state = {
                currentPhase: this.currentPhase,
                usdReserve: this.usdReserve,
                totalMSSupply: this.totalMSSupply,
                volunteerValue: this.volunteerValue,
                lastUpdated: new Date().toISOString()
            };
            fs.writeFileSync(this.stateFile, JSON.stringify(state, null, 2));
        } catch (error) {
            this.logger.error('❌ Failed to save state:', error.message);
        }
    }

    async recordEmergencyResponse(responseId, responderAddress, baseReward) {
        const phase = this.phases[this.currentPhase];
        
        if (!phase.msEarning) {
            this.logger.info(`🔴 MS Earning DISABLED - Phase: ${phase.name}`);
            return 0;
        }
        
        const actualReward = baseReward * phase.rewardMultiplier;
        this.logger.info(`💰 Emergency Response: ${baseReward} → ${actualReward} MS (Phase: ${phase.name})`);
        
        return actualReward;
    }

    async updateReserve(newReserveInCents) {
        const oldPhase = this.currentPhase;
        this.usdReserve = newReserveInCents;
        await this.evaluatePhaseTransition();
        this.saveState(); // Save after every update
        
        if (oldPhase !== this.currentPhase) {
            this.logger.info(`💾 State saved: Phase ${this.currentPhase}, Reserve $${this.usdReserve/100}`);
        }
    }

    async evaluatePhaseTransition() {
        const oldPhase = this.currentPhase;
        
        // Check for fallback to FOUNDATION
        if (this.usdReserve < 10000000) { // Less than $100,000
            this.currentPhase = 0;
        }
        // Check for EARNING phase
        else if (this.usdReserve >= 10000000 && this.currentPhase === 0) {
            this.currentPhase = 1;
        }
        // Check for PROSPERITY phase
        else if (this.currentPhase === 1) {
            const theoreticalValue = this.volunteerValue * this.totalMSSupply;
            const actualCirculation = this.usdReserve; // Simplified
            
            if (theoreticalValue > actualCirculation) {
                this.currentPhase = 2;
            }
        }
        
        if (oldPhase !== this.currentPhase) {
            this.logger.info(`🚨 PHASE TRANSITION: ${this.phases[oldPhase].name} → ${this.phases[this.currentPhase].name}`);
        }
    }

    async getSystemStatus() {
        return {
            phase: this.phases[this.currentPhase].name,
            phaseNumber: this.currentPhase,
            msEarningEnabled: this.phases[this.currentPhase].msEarning,
            exchangeRate: this.phases[this.currentPhase].exchangeRate,
            stakingAPY: this.phases[this.currentPhase].stakingAPY,
            usdReserve: this.usdReserve / 100, // Convert to dollars
            volunteerValue: this.volunteerValue / 100
        };
    }
}

module.exports = PersistentPhaseManager;
