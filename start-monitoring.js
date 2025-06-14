const ContinentalEmergencyService = require('./src/services/continental-emergency.js');

async function main() {
    console.log('🎯 Starting 24/7 Continental Emergency Monitoring...');
    console.log('📍 Fayetteville WV has priority monitoring!');
    
    const service = new ContinentalEmergencyService();
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
        console.log('\n🛑 Shutting down monitoring...');
        await service.stop();
        process.exit(0);
    });
    
    // Start continuous monitoring
    await service.start();
    console.log('✅ 24/7 monitoring ACTIVE - Press Ctrl+C to stop');
}

main().catch(console.error);
