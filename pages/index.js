import { useState } from 'react';

export default function Home() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testStripe = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-stripe');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🏔️ MountainShares - Stripe Integration Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Smart Contract & Stripe Integration</h2>
        <p>This combines your Hardhat smart contract project with Stripe payment processing.</p>
      </div>

      <button 
        onClick={testStripe}
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#5469d4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Testing...' : 'Test Stripe Integration'}
      </button>

      {testResult && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: testResult.success ? '#d4edda' : '#f8d7da',
          border: '1px solid',
          borderColor: testResult.success ? '#c3e6cb' : '#f5c6cb',
          borderRadius: '4px'
        }}>
          <h3>{testResult.success ? '✅ Success!' : '❌ Error'}</h3>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <h3>Available Scripts:</h3>
        <ul>
          <li><code>npm run dev</code> - Start Next.js development server</li>
          <li><code>npm run compile</code> - Compile smart contracts</li>
          <li><code>npm run node</code> - Start Hardhat local blockchain</li>
          <li><code>npm run deploy-local</code> - Deploy contracts to local network</li>
        </ul>
      </div>
    </div>
  );
}
