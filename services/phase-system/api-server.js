const http = require('http');
const url = require('url');
const PhaseManager = require('./phase-manager');

const PORT = 3003;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (parsedUrl.pathname === '/api/phase/status') {
        try {
            // Create fresh instance each time to ensure current state
            const phaseManager = new PhaseManager();
            const status = await phaseManager.getSystemStatus();
            res.writeHead(200);
            res.end(JSON.stringify(status, null, 2));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Phase System API running on http://localhost:${PORT}`);
    console.log(`📊 Status: http://localhost:${PORT}/api/phase/status`);
});
