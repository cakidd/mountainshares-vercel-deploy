const { ethers } = require("ethers");
const axios = require('axios');
const winston = require('winston');
const PhaseManager = require('./phase-system/phase-manager');

// ARC Dense Coverage - Appalachian Regions
const ARC_DENSE_COVERAGE = [
    // West Virginia - Ultra-dense
    { name: "Charleston WV", lat: 38.3498, lon: -81.6326, state: "WV", priority: "high" },
    { name: "Huntington WV", lat: 38.4192, lon: -82.4452, state: "WV", priority: "high" },
    { name: "Fayetteville WV", lat: 38.0548, lon: -81.1040, state: "WV", priority: "high" },
    { name: "Beckley WV", lat: 37.7781, lon: -81.1881, state: "WV", priority: "high" },
    { name: "Morgantown WV", lat: 39.6295, lon: -79.9553, state: "WV", priority: "high" },
    { name: "Parkersburg WV", lat: 39.2667, lon: -81.5615, state: "WV", priority: "high" },
    { name: "Wheeling WV", lat: 40.0640, lon: -80.7209, state: "WV", priority: "high" },
    { name: "Martinsburg WV", lat: 39.4565, lon: -77.9636, state: "WV", priority: "high" },
    { name: "Bluefield WV", lat: 37.2696, lon: -81.2223, state: "WV", priority: "high" },
    { name: "Lewisburg WV", lat: 37.8018, lon: -80.4456, state: "WV", priority: "high" },
    
    // Pennsylvania ARC counties
    { name: "Pittsburgh PA", lat: 40.4406, lon: -79.9959, state: "PA", priority: "high" },
    { name: "Altoona PA", lat: 40.5187, lon: -78.3947, state: "PA", priority: "high" },
    { name: "Johnstown PA", lat: 40.3267, lon: -78.9220, state: "PA", priority: "high" },
    
    // Virginia ARC counties
    { name: "Bristol VA", lat: 36.5951, lon: -82.1887, state: "VA", priority: "high" },
    { name: "Abingdon VA", lat: 36.7098, lon: -82.0187, state: "VA", priority: "high" },
    { name: "Big Stone Gap VA", lat: 36.8687, lon: -82.7788, state: "VA", priority: "high" },
    
    // Kentucky ARC counties
    { name: "Pikeville KY", lat: 37.4793, lon: -82.5188, state: "KY", priority: "high" },
    { name: "Hazard KY", lat: 37.2493, lon: -83.1932, state: "KY", priority: "high" },
    { name: "Prestonsburg KY", lat: 37.6687, lon: -82.7718, state: "KY", priority: "high" },
    
    // Tennessee ARC counties
    { name: "Kingsport TN", lat: 36.5484, lon: -82.5618, state: "TN", priority: "high" },
    { name: "Johnson City TN", lat: 36.3134, lon: -82.3535, state: "TN", priority: "high" },
    { name: "Morristown TN", lat: 36.2140, lon: -83.2949, state: "TN", priority: "high" },
    
    // North Carolina ARC counties
    { name: "Asheville NC", lat: 35.5951, lon: -82.5515, state: "NC", priority: "high" },
    { name: "Boone NC", lat: 36.2168, lon: -81.6746, state: "NC", priority: "high" },
    { name: "Morganton NC", lat: 35.7451, lon: -81.6848, state: "NC", priority: "high" }
];

// Continental Cities
const CONTINENTAL_CITIES = [
    { name: "Boston MA", lat: 42.3601, lon: -71.0589, state: "MA" },
    { name: "New York City", lat: 40.7128, lon: -74.0060, state: "NY" },
    { name: "Philadelphia PA", lat: 39.9526, lon: -75.1652, state: "PA" },
    { name: "Washington DC", lat: 38.9072, lon: -77.0369, state: "DC" },
    { name: "Atlanta GA", lat: 33.7490, lon: -84.3880, state: "GA" },
    { name: "Miami FL", lat: 25.7617, lon: -80.1918, state: "FL" },
    { name: "Charlotte NC", lat: 35.2271, lon: -80.8431, state: "NC" },
    { name: "Nashville TN", lat: 36.1627, lon: -86.7816, state: "TN" },
    { name: "New Orleans LA", lat: 29.9511, lon: -90.0715, state: "LA" },
    { name: "Houston TX", lat: 29.7604, lon: -95.3698, state: "TX" },
    { name: "Dallas TX", lat: 32.7767, lon: -96.7970, state: "TX" },
    { name: "San Antonio TX", lat: 29.4241, lon: -98.4936, state: "TX" },
    { name: "Austin TX", lat: 30.2672, lon: -97.7431, state: "TX" },
    { name: "Chicago IL", lat: 41.8781, lon: -87.6298, state: "IL" },
    { name: "Detroit MI", lat: 42.3314, lon: -83.0458, state: "MI" },
    { name: "Minneapolis MN", lat: 44.9778, lon: -93.2650, state: "MN" },
    { name: "St. Louis MO", lat: 38.6270, lon: -90.1994, state: "MO" },
    { name: "Denver CO", lat: 39.7392, lon: -104.9903, state: "CO" },
    { name: "Phoenix AZ", lat: 33.4484, lon: -112.0740, state: "AZ" },
    { name: "Salt Lake City UT", lat: 40.7608, lon: -111.8910, state: "UT" },
    { name: "Los Angeles CA", lat: 34.0522, lon: -118.2437, state: "CA" },
    { name: "San Francisco CA", lat: 37.7749, lon: -122.4194, state: "CA" },
    { name: "Seattle WA", lat: 47.6062, lon: -122.3321, state: "WA" },
    { name: "Portland OR", lat: 45.5152, lon: -122.6784, state: "OR" },
    { name: "Oklahoma City OK", lat: 35.4676, lon: -97.5164, state: "OK" },
    { name: "Kansas City MO", lat: 39.0997, lon: -94.5786, state: "MO" }
];

// NOAA Weather Service
class NOAAWeatherService {
    constructor() {
        this.baseUrl = 'https://api.weather.gov';
        this.userAgent = process.env.NOAA_USER_AGENT || 'MountainShares Emergency Response (contact@mountainshares.com)';
        this.zoneCache = new Map();
        this.rateLimitDelay = 500;
    }

    async getWeatherAlerts(lat, lon) {
        try {
            const coordKey = `${lat},${lon}`;
            let zoneId = this.zoneCache.get(coordKey);

            if (!zoneId) {
                const pointsResponse = await axios.get(`${this.baseUrl}/points/${lat},${lon}`, {
                    headers: { 'User-Agent': this.userAgent },
                    timeout: 10000
                });

                const properties = pointsResponse.data.properties;
                const forecastZone = properties.forecastZone;
                zoneId = forecastZone.split('/').pop();
                this.zoneCache.set(coordKey, zoneId);
            }

            const alertsResponse = await axios.get(`${this.baseUrl}/alerts/active/zone/${zoneId}`, {
                headers: { 'User-Agent': this.userAgent },
                timeout: 10000
            });

            const alerts = alertsResponse.data.features || [];
            return alerts.map(alert => this.formatAlert(alert, zoneId));

        } catch (error) {
            if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                throw new Error(`NOAA API connection failed: ${error.message}`);
            } else if (error.response?.status === 404) {
                throw new Error(`Location not found: ${lat}, ${lon}`);
            } else if (error.response?.status === 429) {
                throw new Error('NOAA API rate limit exceeded');
            } else {
                throw new Error(`NOAA API error: ${error.message}`);
            }
        }
    }

    formatAlert(alert, zoneId) {
        const properties = alert.properties;
        let severity = 5;

        if (properties.severity === 'Extreme') severity = 10;
        else if (properties.severity === 'Severe') severity = 8;
        else if (properties.severity === 'Moderate') severity = 6;
        else if (properties.severity === 'Minor') severity = 3;

        if (properties.urgency === 'Immediate') severity = Math.min(10, severity + 2);
        else if (properties.urgency === 'Expected') severity = Math.min(10, severity + 1);

        return {
            headline: properties.headline,
            event: properties.event,
            severity: severity,
            areas: properties.areaDesc ? [properties.areaDesc] : [zoneId],
            zones: [zoneId],
            description: properties.description,
            ends: properties.ends,
            urgency: properties.urgency,
            certainty: properties.certainty
        };
    }
}

// Production Emergency Monitor Class
class ProductionEmergencyMonitor {
    constructor() {
        this.contractAddress = process.env.EMERGENCY_CONTRACT_ADDRESS;
        this.checkInterval = parseInt(process.env.WEATHER_CHECK_INTERVAL) || 300;
        this.isRunning = false;
        this.noaaService = new NOAAWeatherService();
        this.monitoredZones = new Set();
        this.cityToZoneMap = new Map();
        this.contract = null;
        this.signer = null;
        this.phaseManager = new PhaseManager();

        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console()
            ]
        });

        }
    }

    async start() {
        this.logger.info('🌐 Starting REAL NOAA Continental Weather Monitor');
        this.logger.info(`🏔️ ARC Priority: ${ARC_DENSE_COVERAGE.length} Appalachian locations`);
        this.logger.info(`🌎 Continental: ${CONTINENTAL_CITIES.length} major cities`);
        this.logger.info(`📡 Total: ${ARC_DENSE_COVERAGE.length + CONTINENTAL_CITIES.length} monitoring points`);
        
        await this.async initializeContract();
        await this.mapCitiesToZones();
        
        this.isRunning = true;
        await this.checkWeather();
        
        this.interval = setInterval(async () => {
            if (this.isRunning) {
                await this.checkWeather();
            }
        }, this.checkInterval * 1000);
        
        this.logger.info('✅ REAL NOAA monitoring started');
        this.logger.info(`🗺️ Monitoring ${this.monitoredZones.size} unique forecast zones`);
    }

    async mapCitiesToZones() {
        this.logger.info('🗺️ Mapping cities to NOAA zones...');
        const processedZones = new Set();

        this.logger.info('🏔️ Processing ARC regions (priority):');
        for (const city of ARC_DENSE_COVERAGE) {
            await this.mapCityToZone(city, processedZones, 'ARC_PRIORITY');
        }

        this.logger.info('🌎 Processing continental cities:');
        for (const city of CONTINENTAL_CITIES) {
            await this.mapCityToZone(city, processedZones, 'CONTINENTAL');
        }

        this.logger.info(`📊 Zone mapping complete: ${this.monitoredZones.size} unique zones`);
    }

    async mapCityToZone(city, processedZones, priority) {
        try {
            const coordKey = `${city.lat},${city.lon}`;
            await this.noaaService.getWeatherAlerts(city.lat, city.lon);
            const zoneId = this.noaaService.zoneCache.get(coordKey);
            
            if (zoneId && !processedZones.has(zoneId)) {
                this.monitoredZones.add(zoneId);
                this.cityToZoneMap.set(city.name, zoneId);
                processedZones.add(zoneId);
                this.logger.info(`   🗺️ ${city.name}, ${city.state} -> Zone ${zoneId} [${priority}]`);
            } else if (zoneId) {
                this.logger.info(`   📋 ${city.name}, ${city.state} -> Zone ${zoneId} (covered)`);
            } else {
                this.logger.warn(`   ❌ ${city.name}, ${city.state} -> Zone lookup failed`);
            }

            await new Promise(resolve => setTimeout(resolve, this.noaaService.rateLimitDelay));

        } catch (error) {
            this.logger.error(`❌ Error mapping ${city.name}: ${error.message}`);
        }
    }

    async checkWeather() {
        this.logger.info('🔍 Checking REAL weather via NOAA API...');

        let totalAlerts = 0;
        let arcAlerts = 0;
        let continentalAlerts = 0;

        this.logger.info('🏔️ Checking ARC regions...');
        for (const location of ARC_DENSE_COVERAGE) {
            const alerts = await this.checkLocationWeather(location, 'ARC_PRIORITY');
            if (alerts.length > 0) {
                totalAlerts += alerts.length;
                arcAlerts += alerts.length;
            }
        }

        this.logger.info('🌎 Checking continental cities...');
        for (const location of CONTINENTAL_CITIES) {
            const alerts = await this.checkLocationWeather(location, 'CONTINENTAL');
            if (alerts.length > 0) {
                totalAlerts += alerts.length;
                continentalAlerts += alerts.length;
            }
        }

        this.logger.info(`📊 REAL weather scan complete:`);
        this.logger.info(`   🏔️ ARC: ${ARC_DENSE_COVERAGE.length} locations, ${arcAlerts} alerts`);
        this.logger.info(`   🌎 Continental: ${CONTINENTAL_CITIES.length} cities, ${continentalAlerts} alerts`);
        this.logger.info(`   📍 Total alerts: ${totalAlerts}`);
    }

    async checkLocationWeather(location, priority) {
        try {
            const alerts = await this.noaaService.getWeatherAlerts(location.lat, location.lon);
            
            if (alerts.length > 0) {
                this.logger.warn(`🚨 ${priority} ALERT: ${location.name}, ${location.state}: ${alerts.length} alert(s)`);
                
                for (const alert of alerts) {
                    this.logger.warn(`   ⚠️ ${alert.event} - Severity ${alert.severity}/10 - ${alert.headline}`);
                    await this.processAlert(alert, location, priority);
                }
            } else {
                this.logger.info(`   ✅ ${location.name}, ${location.state}: Clear`);
            }

            await new Promise(resolve => setTimeout(resolve, this.noaaService.rateLimitDelay));
            return alerts;

        } catch (error) {
            this.logger.error(`❌ Error checking ${location.name}: ${error.message}`);
            return [];
        }
    }


    calculateBaseReward(alert, priority) {
        // Base reward calculation based on alert severity and priority
        let baseReward = 50; // Default base reward
        
        // Priority multiplier
        if (priority === 'ARC_PRIORITY') {
            baseReward *= 2; // 2x for ARC priority areas
        }
        
        // Severity multiplier
        switch (alert.severity?.toLowerCase()) {
            case 'extreme':
                baseReward *= 3;
                break;
            case 'severe':
                baseReward *= 2;
                break;
            case 'moderate':
                baseReward *= 1.5;
                break;
            default:
                baseReward *= 1;
        }
        
        return Math.floor(baseReward);
    }
    async processAlert(alert, location, priority) {
        try {
            const priorityPrefix = priority === 'ARC_PRIORITY' ? '🏔️ ARC PRIORITY' : '🌎';
            this.logger.info(`📢 ${priorityPrefix} Processing: ${location.name} - ${alert.event}`);

            if (this.contract && this.signer) {
                const alertMessage = priority === 'ARC_PRIORITY' 
                    ? `[ARC PRIORITY] ${alert.event} - ${location.name}, ${location.state}`
                    : `${alert.event} - ${location.name}, ${location.state}`;

                const gasLimit = ethers.BigNumber.from("500000");
                const tx = await this.contract.reportEmergency(
                    Date.now(),
                    alert.severity,
                    alertMessage,
                    { gasLimit }
                );

                this.logger.info(`🔗 Blockchain tx: ${tx.hash}`);
                if (priority === 'ARC_PRIORITY') {
                    this.logger.warn(`🏔️ ARC PRIORITY alert sent to blockchain!`);
                }
                
                await tx.wait();
                this.logger.info(`✅ Transaction confirmed for ${location.name}`);

                // MountainShares Phase Enhancement
                const baseReward = this.calculateBaseReward(alert, priority);
                const enhancedReward = await this.phaseManager.recordEmergencyResponse(
                    Date.now(),
                    this.signer.address,
                    baseReward
                );
                
                const phaseStatus = await this.phaseManager.getSystemStatus();
                this.logger.info(`💰 Emergency Reward: ${baseReward} → ${enhancedReward} MS (Phase: ${phaseStatus.phase})`);
                
                if (enhancedReward > 0) {
                    this.logger.info(`🎯 MS Earning: 🟢 ENABLED - Responder rewarded ${enhancedReward} MS`);
                } else {
                    this.logger.info(`🛡️ MS Earning: 🔴 DISABLED - Financial protection active`);
                }
            } else {
                this.logger.warn(`⚠️ Alert logged but no blockchain (contract not configured)`);
            }

        } catch (error) {
            this.logger.error(`❌ Error processing alert for ${location.name}: ${error.message}`);
        }
    }

    stop() {
        this.logger.info('🛑 Stopping weather monitoring...');
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.logger.info('✅ Weather monitoring stopped');
    }
}

module.exports = ProductionEmergencyMonitor;

    async initializeContract() {
        if (!this.contractAddress) {
            this.logger.warn('⚠️ No contract address - blockchain integration disabled');
            return;
        }

        try {
            this.logger.info('🔗 Initializing Emergency Response contract...');
            const [signer] = await ethers.getSigners();
            this.signer = signer;

            const EmergencyResponse = await ethers.getContractFactory("EmergencyResponse");
            this.contract = EmergencyResponse.attach(this.contractAddress);

            this.logger.info(`✅ Connected to contract: ${this.contractAddress}`);
            this.logger.info(`📝 Using account: ${signer.address}`);
        } catch (error) {
            this.logger.error(`❌ Contract initialization failed: ${error.message}`);
        }
    }
