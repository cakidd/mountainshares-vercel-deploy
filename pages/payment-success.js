import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  
  useEffect(() => {
    const { payment_intent, payment_intent_client_secret, redirect_status } = router.query;
    
    if (redirect_status === 'succeeded') {
      setStatus('succeeded');
    } else if (redirect_status === 'failed') {
      setStatus('failed');
    }
  }, [router.query]);

  if (status === 'loading') {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>🔄 Processing Payment...</h2>
      </div>
    );
  }

  if (status === 'succeeded') {
    return (
      <div style={{ padding: '50px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h1>🎉 Payment Successful!</h1>
        <div style={{ 
          padding: '30px', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb', 
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h2>🏔️ Welcome to MountainShares!</h2>
          <p><strong>Mountain Peak Share #001</strong> is now yours!</p>
          <p>Payment Amount: <strong>$15.00</strong></p>
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <h3>What's Next?</h3>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Your payment has been processed</li>
            <li>Webhook events have been triggered</li>
            <li>Your mountain share ownership is being recorded</li>
            <li>You'll receive a confirmation email shortly</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <button 
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#5469d4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Return Home
          </button>
          <button 
            onClick={() => router.push('/buy-mountain-share')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Buy Another Share
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>❌ Payment Failed</h1>
      <p>Something went wrong with your payment.</p>
      <button 
        onClick={() => router.push('/buy-mountain-share')}
        style={{
          padding: '12px 24px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );
}
