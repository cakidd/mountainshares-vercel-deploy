import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(`Payment failed: ${error.message}`);
        } else {
          setMessage("An unexpected error occurred.");
        }
      }
      
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>🏔️ Purchase Mountain Share</h2>
      <p><strong>Mountain Peak Share #001</strong></p>
      <p>Price: <strong>$15.00</strong></p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px 0' }}>
          <PaymentElement />
        </div>
        
        <button 
          disabled={!stripe || isLoading}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: isLoading ? '#ccc' : '#5469d4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Processing...' : 'Purchase for $15.00'}
        </button>
      </form>
      
      {message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: message.includes('succeeded') ? '#d4edda' : '#f8d7da',
          border: '1px solid',
          borderColor: message.includes('succeeded') ? '#c3e6cb' : '#f5c6cb',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
      
      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <p><strong>Test Card Numbers:</strong></p>
        <ul>
          <li><code>4242424242424242</code> - Visa (succeeds)</li>
          <li><code>4000000000000002</code> - Card declined</li>
          <li><code>4000000000009995</code> - Insufficient funds</li>
        </ul>
        <p>Use any future expiry date and any 3-digit CVC.</p>
      </div>
    </div>
  );
}

export default function BuyMountainShare() {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  // Create payment intent when component mounts (CLIENT-SIDE ONLY)
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        // Use absolute URL to fix server-side rendering issue
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const response = await fetch(`${baseUrl}/api/create-payment-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 1500, // $15.00
            shareId: 'mountain-peak-001',
            shareName: 'Mountain Peak Share #001',
            userId: 'demo-user-123'
          })
        });

        const data = await response.json();
        if (data.success) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('Payment intent creation failed:', data);
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>🏔️ Loading Payment Form...</h2>
        <p>Setting up secure payment...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>❌ Payment Setup Failed</h2>
        <p>Unable to initialize payment. Please try again.</p>
        <button 
          onClick={() => window.location.reload()}
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
          Retry
        </button>
      </div>
    );
  }

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
