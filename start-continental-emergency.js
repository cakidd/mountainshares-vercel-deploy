const ContinentalEmergencyService = require('./src/services/continental-emergency.js');

async function main() {
    console.log('🎯 Initializing ULTIMATE Continental Emergency Service...');
    
    const service = new ContinentalEmergencyService();
    
    // Graceful shutdown handlers
    process.on('SIGINT', async () => {
        console.log('\n🛑 Received SIGINT, shutting down gracefully...');
        await service.stop();
        process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
        console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
        await service.stop();
        process.exit(0);
    });
    
    // Start the service
    try {
        await service.start();
        console.log('🎯 ULTIMATE Continental Emergency Service is now ACTIVE!');
        console.log('📊 Monitor logs: tail -f continental-emergency.log');
        console.log('🔄 System will check weather every 5 minutes');
        console.log('⚡ Fayetteville WV has CRITICAL priority monitoring');
    } catch (error) {
        console.error('❌ Failed to start service:', error.message);
        process.exit(1);
    }
}

main().catch(console.error);
