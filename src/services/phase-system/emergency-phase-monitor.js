const PhaseWrapper = require('./phase-wrapper');

class SimpleEmergencyMonitor {
    constructor() {
        this.phaseWrapper = new PhaseWrapper();
        console.log('🚀 Simple Emergency Monitor with Phase System started');
    }

    async simulateEmergencyResponse() {
        // Simulate an emergency response every 30 seconds
        setInterval(async () => {
            try {
                const baseReward = Math.floor(Math.random() * 200) + 50; // 50-250 MS
                const enhanced = await this.phaseWrapper.enhanceEmergencyReward(baseReward, '0x123');
                const status = await this.phaseWrapper.getPhaseStatus();
                
                console.log(`🚨 Emergency Response: ${baseReward} → ${enhanced} MS (Phase: ${status.phase})`);
                if (enhanced > 0) {
                    console.log(`🎯 MS Earning: 🟢 ENABLED`);
                } else {
                    console.log(`🛡️ MS Earning: 🔴 DISABLED - Protection active`);
                }
            } catch (error) {
                console.log('❌ Error:', error.message);
            }
        }, 30000);
    }

    start() {
        console.log('🌐 Starting emergency response simulation...');
        this.simulateEmergencyResponse();
    }
}

const monitor = new SimpleEmergencyMonitor();
monitor.start();
