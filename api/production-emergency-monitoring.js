const ProductionEmergencyMonitor = require('../services/continental-emergency');

// Initialize production emergency monitoring
const emergencyMonitor = new ProductionEmergencyMonitor({
  region: 'appalachian',
  alertLevel: 'production',
  communityNotifications: true,
  realTimeAlerts: true,
  blockchainIntegration: true,
  contractAddress: process.env.MOUNTAINSHARES_CONTRACT_ADDRESS
});

// Real-time emergency coordination endpoint
app.post('/api/emergency/alert', async (req, res) => {
  const { alertType, location, severity, description } = req.body;
  
  try {
    // Process real emergency alert
    const alertResult = await emergencyMonitor.processEmergencyAlert({
      type: alertType,
      location,
      severity,
      description,
      timestamp: new Date().toISOString(),
      reportedBy: req.ip
    });

    // Notify MountainShares community
    await emergencyMonitor.notifyCommunity(alertResult);

    // Record on blockchain for transparency
    if (severity === 'critical') {
      await emergencyMonitor.recordOnBlockchain(alertResult);
    }

    res.json({
      success: true,
      alertId: alertResult.id,
      status: 'processed',
      communityNotified: true,
      blockchainRecorded: severity === 'critical'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Community emergency status endpoint
app.get('/api/emergency/status', async (req, res) => {
  try {
    const status = await emergencyMonitor.getCommunityStatus();
    res.json({
      region: 'appalachian',
      activeAlerts: status.activeAlerts,
      communityMembers: status.communityMembers,
      emergencyContacts: status.emergencyContacts,
      lastUpdate: status.lastUpdate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start real-time monitoring
emergencyMonitor.start();

module.exports = emergencyMonitor;
