const { ethers } = require("hardhat");
const axios = require('axios');

// Simplified NOAA integration for weather monitoring
class NOAAWeatherService {
    constructor() {
        this.baseUrl = 'https://api.weather.gov';
        this.userAgent = 'MountainShares Emergency Response System (contact: admin@mountainshares.com)';
    }

    async getWeatherAlerts(lat, lon) {
        try {
            console.log(`📍 Fetching alerts for coordinates: ${lat}, ${lon}`);
            
            // Step 1: Get the forecast zone for these coordinates
            const pointsResponse = await axios.get(`${this.baseUrl}/points/${lat},${lon}`, {
                headers: { 'User-Agent': this.userAgent }
            });
            
            const properties = pointsResponse.data.properties;
            const forecastZone = properties.forecastZone;
            const zoneId = forecastZone.split('/').pop();
            
            console.log(`🗺️ Found forecast zone: ${zoneId}`);
            
            // Step 2: Get active alerts for this zone
            const alertsResponse = await axios.get(`${this.baseUrl}/alerts/active/zone/${zoneId}`, {
                headers: { 'User-Agent': this.userAgent }
            });
            
            const alerts = alertsResponse.data.features || [];
            
            if (alerts.length === 0) {
                console.log(`   ✅ No active alerts (all clear)`);
                return [];
            }
            
            // Step 3: Process and return formatted alerts
            return alerts.map(alert => this.formatAlert(alert, zoneId));
            
        } catch (error) {
            console.error(`❌ Error fetching weather alerts: ${error.message}`);
            
            // Return mock alert for testing if API fails
            return [{
                headline: "Test Weather Alert - API Simulation",
                event: "Winter Weather Advisory", 
                severity: 6,
                areas: [`${lat}, ${lon} area`],
                zones: [`ZONE_${lat}_${lon}`],
                description: "Simulated weather alert for testing purposes",
                ends: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // 4 hours from now
            }];
        }
    }

    formatAlert(alert, zoneId) {
        const properties = alert.properties;
        
        // Map NOAA urgency/severity to 1-10 scale
        let severity = 5; // default moderate
        
        if (properties.severity === 'Extreme') severity = 10;
        else if (properties.severity === 'Severe') severity = 8;
        else if (properties.severity === 'Moderate') severity = 6;
        else if (properties.severity === 'Minor') severity = 3;
        else if (properties.severity === 'Unknown') severity = 5;
        
        // Adjust based on urgency
        if (properties.urgency === 'Immediate') severity = Math.min(10, severity + 2);
        else if (properties.urgency === 'Expected') severity = Math.min(10, severity + 1);
        
        return {
            headline: properties.headline || properties.event,
            event: properties.event,
            severity: severity,
            areas: properties.areaDesc ? [properties.areaDesc] : [zoneId],
            zones: [zoneId],
            description: properties.description || properties.headline,
            ends: properties.ends
        };
    }
}

class WeatherMonitoringService {
    constructor(emergencyContractAddress, coordinates, checkInterval = 15) {
        this.contractAddress = emergencyContractAddress;
        this.coordinates = coordinates; // { lat, lon }
        this.checkInterval = checkInterval; // minutes
        this.noaaService = new NOAAWeatherService();
        this.isRunning = false;
        this.lastAlertCheck = 0;
        this.contract = null;
        this.signer = null;
    }

    async start() {
        console.log("🌡️ Starting Weather Monitoring Service...");
        console.log(`📍 Monitoring coordinates: ${this.coordinates.lat}, ${this.coordinates.lon}`);
        console.log(`⏱️ Check interval: ${this.checkInterval} minutes\n`);

        // Initialize contract connection
        await this.initializeContract();
        
        this.isRunning = true;
        
        // Initial check
        await this.checkWeatherAlerts();
        
        // Set up periodic monitoring
        this.monitoringInterval = setInterval(async () => {
            if (this.isRunning) {
                await this.checkWeatherAlerts();
            }
        }, this.checkInterval * 60 * 1000); // Convert to milliseconds
        
        console.log("✅ Weather monitoring service started successfully!");
    }

    async initializeContract() {
        try {
            const [signer] = await ethers.getSigners();
            this.signer = signer;
            
            const EmergencyResponse = await ethers.getContractFactory("EmergencyResponse");
            this.contract = EmergencyResponse.attach(this.contractAddress);
            
            console.log(`🔗 Connected to EmergencyResponse contract at: ${this.contractAddress}`);
            console.log(`👤 Using signer: ${signer.address}`);
            
        } catch (error) {
            console.error("❌ Failed to initialize contract connection:", error.message);
            throw error;
        }
    }

    async checkWeatherAlerts() {
        const timestamp = Date.now();
        console.log(`\n🔍 [${new Date().toISOString()}] Checking weather alerts...`);
        
        try {
            // Fetch current NOAA alerts
            const alerts = await this.noaaService.getWeatherAlerts(
                this.coordinates.lat, 
                this.coordinates.lon
            );
            
            if (alerts.length === 0) {
                console.log("✅ No active weather alerts");
                return;
            }
            
            console.log(`⚠️ Found ${alerts.length} active weather alert(s):`);
            
            for (const alert of alerts) {
                await this.processAlert(alert);
            }
            
            this.lastAlertCheck = timestamp;
            
        } catch (error) {
            console.error("❌ Error checking weather alerts:", error.message);
        }
    }

    async processAlert(alert) {
        try {
            console.log(`\n📋 Processing Alert: ${alert.headline}`);
            console.log(`   Type: ${alert.event}`);
            console.log(`   Severity: ${alert.severity}/10`);
            console.log(`   Area: ${alert.areas.join(', ')}`);
            
            // Check if we already have this alert in the contract
            const existingAlerts = await this.getActiveContractAlerts();
            const alertExists = existingAlerts.some(existing => 
                existing.description.includes(alert.headline) ||
                existing.noaaZoneId === alert.zones[0]
            );
            
            if (alertExists) {
                console.log("   ℹ️ Alert already exists in contract");
                return;
            }
            
            // Create new alert in contract
            await this.createContractAlert(alert);
            
        } catch (error) {
            console.error(`❌ Error processing alert: ${error.message}`);
        }
    }

    async createContractAlert(alert) {
        try {
            console.log("   📝 Creating contract alert...");
            
            // Map NOAA event types to contract AlertType enum
            const alertType = this.mapAlertType(alert.event);
            
            // Calculate expiry time (use alert end time or default to 24 hours)
            const expiryTime = alert.ends ? 
                Math.floor(new Date(alert.ends).getTime() / 1000) :
                Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 hours from now
            
            // Create IPFS hash for detailed alert data
            const ipfsHash = this.generateIPFSHash(alert);
            
            const tx = await this.contract.issueAlert(
                alertType,
                alert.severity,
                alert.areas.join(', '),
                alert.headline,
                expiryTime,
                alert.zones[0] || 'UNKNOWN',
                ipfsHash
            );
            
            console.log("   ⏳ Transaction submitted:", tx.hash);
            
            const receipt = await tx.wait();
            console.log("   ✅ Alert created successfully!");
            console.log(`   🔗 Transaction: ${receipt.hash}`);
            
            // Get the alert ID from the event
            const alertEvent = receipt.logs?.find(log => {
                try {
                    const parsed = this.contract.interface.parseLog(log);
                    return parsed.name === 'AlertIssued';
                } catch {
                    return false;
                }
            });
            
            if (alertEvent) {
                const parsed = this.contract.interface.parseLog(alertEvent);
                const alertId = parsed.args.alertId.toString();
                console.log(`   🆔 Alert ID: ${alertId}`);
                
                // Auto-acknowledge for testing
                await this.acknowledgeAlert(alertId);
            }
            
        } catch (error) {
            console.error("   ❌ Failed to create contract alert:", error.message);
        }
    }

    async acknowledgeAlert(alertId) {
        try {
            // Get alert details to check severity
            const alert = await this.contract.alerts(alertId);
            
            // Only auto-create response for high severity alerts
            const severityNum = Number(alert.severity);
            if (severityNum >= 2) { // HIGH or EXTREME
                console.log(`   🚨 High severity alert detected - creating emergency response...`);
                
                const actionPlan = this.generateActionPlan(alert);
                const resourcesNeeded = this.generateResourcesNeeded(alert);
                
                const tx = await this.contract.createResponse(
                    alertId,
                    actionPlan,
                    resourcesNeeded,
                    "" // IPFS hash for response plan
                );
                
                const receipt = await tx.wait();
                console.log(`   ✅ Emergency response created: ${receipt.hash}`);
            }
            
        } catch (error) {
            console.error("   ❌ Failed to acknowledge alert:", error.message);
        }
    }

    async getActiveContractAlerts() {
        try {
            const alertIds = await this.contract.getActiveAlerts();
            const alerts = [];
            
            for (const alertId of alertIds) {
                const alert = await this.contract.alerts(alertId);
                alerts.push(alert);
            }
            
            return alerts;
        } catch (error) {
            console.error("Error fetching active alerts:", error.message);
            return [];
        }
    }

    mapAlertType(noaaEvent) {
        const eventLower = noaaEvent.toLowerCase();
        
        if (eventLower.includes('winter') || eventLower.includes('snow') || 
            eventLower.includes('ice') || eventLower.includes('blizzard')) {
            return 0; // WEATHER
        }
        if (eventLower.includes('fire') || eventLower.includes('smoke')) {
            return 1; // FIRE
        }
        if (eventLower.includes('flood') || eventLower.includes('flash flood')) {
            return 2; // FLOOD
        }
        if (eventLower.includes('avalanche')) {
            return 3; // AVALANCHE
        }
        if (eventLower.includes('earthquake')) {
            return 4; // EARTHQUAKE
        }
        
        return 0; // Default to WEATHER
    }

    generateActionPlan(alert) {
        const alertTypeNum = Number(alert.alertType);
        const plans = {
            0: "Monitor weather conditions, prepare for potential evacuation, secure outdoor equipment",
            1: "Activate fire safety protocols, prepare evacuation routes, monitor air quality",
            2: "Move to higher ground, avoid flood-prone areas, prepare emergency supplies",
            3: "Avoid avalanche zones, stay indoors, monitor slope stability reports",
            4: "Take shelter, check for structural damage, prepare for aftershocks"
        };
        
        return plans[alertTypeNum] || "Monitor situation and follow local emergency guidelines";
    }

    generateResourcesNeeded(alert) {
        const alertTypeNum = Number(alert.alertType);
        const resources = {
            0: "Emergency supplies, backup power, communication equipment",
            1: "Fire extinguishers, evacuation vehicles, medical supplies",
            2: "Sandbags, water pumps, rescue boats",
            3: "Rescue equipment, medical supplies, communication devices",
            4: "First aid kits, structural engineers, emergency shelters"
        };
        
        return resources[alertTypeNum] || "Basic emergency supplies and communication equipment";
    }

    generateIPFSHash(alert) {
        // Simple hash generation for IPFS storage
        const alertData = JSON.stringify({
            headline: alert.headline,
            description: alert.description,
            event: alert.event,
            severity: alert.severity,
            areas: alert.areas,
            zones: alert.zones,
            timestamp: Date.now()
        });
        
        // In production, this would be a real IPFS hash
        return `ipfs_${Date.now()}_${alert.event.replace(/\s+/g, '_')}`;
    }

    async stop() {
        console.log("\n🛑 Stopping Weather Monitoring Service...");
        this.isRunning = false;
        
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        
        console.log("✅ Weather monitoring service stopped");
    }

    async createTestAlert(alertType = 0, severity = 5, description = "Test alert") {
        try {
            const expiryTime = Math.floor(Date.now() / 1000) + (2 * 60 * 60); // 2 hours
            
            const tx = await this.contract.issueAlert(
                alertType,
                severity,
                "Test Location",
                description,
                expiryTime,
                "TEST001",
                `test_${Date.now()}`
            );
            
            const receipt = await tx.wait();
            console.log(`✅ Test alert created: ${receipt.hash}`);
            
            return receipt;
        } catch (error) {
            console.error("❌ Failed to create test alert:", error.message);
        }
    }
}

// Demo script for running the service
async function runWeatherMonitoringDemo() {
    console.log("🌐 Weather Monitoring Service Demo");
    console.log("=" .repeat(50));
    
    // Fayetteville, WV coordinates
    const coordinates = {
        lat: 38.0548,  
        lon: -81.1040
    };
    
    const contractAddress = process.env.EMERGENCY_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890";
    
    const monitor = new WeatherMonitoringService(contractAddress, coordinates, 2); // Check every 2 minutes for demo
    
    try {
        await monitor.start();
        
        // Run for 10 minutes then stop
        setTimeout(async () => {
            await monitor.stop();
            process.exit(0);
        }, 10 * 60 * 1000);
        
        // Create a test alert after 30 seconds
        setTimeout(async () => {
            console.log("\n🧪 Creating test alert...");
            await monitor.createTestAlert(0, 7, "Test Winter Storm Warning - Automated System Check");
        }, 30 * 1000);
        
    } catch (error) {
        console.error("❌ Demo failed:", error);
        process.exit(1);
    }
}

module.exports = { 
    WeatherMonitoringService,
    NOAAWeatherService,
    runWeatherMonitoringDemo
};

// Run demo if this file is executed directly
if (require.main === module) {
    runWeatherMonitoringDemo();
}
