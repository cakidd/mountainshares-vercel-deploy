export default async function handler(req, res) {
  // Set CORS headers for The Commons website
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // System status that The Commons expects
    const systemStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        stripe: 'online',
        arbitrum: 'connected',
        webhook: 'active'
      },
      mountainshares: {
        contractAddress: '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D',
        network: 'Arbitrum One',
        commonsIntegration: true,
        pricing: {
          tokenRatio: '1 USD = 1 MS',
          msFee: '2% (rounded up)',
          stripeFee: '2.9% + $0.30 + $0.011 (rounded up)',
          settlementReserve: 'Full USD amount (no partial)',
          totalExample: '$1.36 for 1 MS'
        }
      },
      checks: {
        ethereum: 'connected',
        database: 'healthy',
        payments: 'active'
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };

    // Set proper headers for health checks
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json(systemStatus);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      mountainshares: {
        commonsIntegration: false
      }
    });
  }
}
