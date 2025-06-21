import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function TestPaymentFlow() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState(1500); // $15.00

  const testPaymentFlow = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      // Step 1: Create payment intent
      console.log('🚀 Creating payment intent...');
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          shareId: 'mountain-peak-001',
          shareName: 'Mountain Peak Share #001',
          userId: 'test-user-123'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({
          type: 'success',
          message: 'Payment intent created successfully!',
          data: data
        });
        console.log('✅ Payment intent created:', data.paymentIntentId);
      } else {
        setResult({
          type: 'error',
          message: 'Failed to create payment intent',
          data: data
        });
      }
      
    } catch (error) {
      setResult({
        type: 'error',
        message: error.message,
        data: null
      });
    }
    
    setLoading(false);
  };

  const testStripeConnection = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-stripe');
      const data = await response.json();
      setResult({
        type: data.success ? 'success' : 'error',
        message: data.success ? 'Stripe connection successful!' : 'Stripe connection failed',
        data: data
      });
    } catch (error) {
      setResult({
        type: 'error',
        message: error.message,
        data: null
      });
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🏔️ MountainShares - Payment Flow Test</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Test Payment Amount:</h3>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(parseInt(e.target.value))}
          style={{ padding: '8px', fontSize: '16px', width: '120px' }}
        />
        <span style={{ marginLeft: '10px' }}>cents (${(amount/100).toFixed(2)})</span>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <button 
          onClick={testStripeConnection}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Testing...' : 'Test Stripe Connection'}
        </button>

        <button 
          onClick={testPaymentFlow}
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
          {loading ? 'Creating...' : 'Create Payment Intent'}
        </button>
      </div>

      {result && (
        <div style={{
          padding: '20px',
          backgroundColor: result.type === 'success' ? '#d4edda' : '#f8d7da',
          border: '1px solid',
          borderColor: result.type === 'success' ? '#c3e6cb' : '#f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h3>{result.type === 'success' ? '✅ Success!' : '❌ Error'}</h3>
          <p><strong>Message:</strong> {result.message}</p>
          {result.data && (
            <details style={{ marginTop: '10px' }}>
              <summary>View Details</summary>
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto',
                backgroundColor: 'rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '4px'
              }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      <div style={{ fontSize: '14px', color: '#666' }}>
        <h3>🧪 What this tests:</h3>
        <ul>
          <li><strong>Stripe Connection:</strong> Verifies API keys and connection</li>
          <li><strong>Payment Intent:</strong> Creates a payment intent for mountain share purchase</li>
          <li><strong>Error Handling:</strong> Tests validation and error responses</li>
          <li><strong>Logging:</strong> Check your terminal for detailed logs</li>
        </ul>
        
        <h3>📋 Next Steps:</h3>
        <ul>
          <li>Set up webhook listener with Stripe CLI</li>
          <li>Add card payment UI with Stripe Elements</li>
          <li>Connect to smart contract for share minting</li>
          <li>Deploy to Vercel when ready</li>
        </ul>
      </div>
    </div>
  );
}
