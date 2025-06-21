// Real Stripe integration for MountainShares (from search results)
const stripe = Stripe('pk_test_YOUR_REAL_STRIPE_PUBLISHABLE_KEY_HERE');

async function initiatePurchase() {
  const quantity = parseInt(document.getElementById('ms-quantity').value);
  const walletAddress = document.getElementById('wallet-address').value;

  if (!quantity || quantity < 1) {
    showStatus('Please enter a valid quantity (minimum 1 MountainShare)', 'error', 'payment-status');
    return;
  }

  if (!walletAddress || !walletAddress.startsWith('0x')) {
    showStatus('Please enter a valid Ethereum wallet address or connect MetaMask', 'error', 'payment-status');
    return;
  }

  try {
    document.getElementById('purchase-btn').textContent = 'Creating Real Stripe Session...';
    document.getElementById('purchase-btn').disabled = true;

    // Use real Stripe checkout (from search results [1])
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'MountainShares Token',
            description: `${quantity} MountainShares for ${walletAddress}`,
          },
          unit_amount: Math.round((quantity * 1.35) * 100), // $1.35 per MS in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: 'https://relaxed-medovik-06c531.netlify.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://relaxed-medovik-06c531.netlify.app/',
      customerEmail: 'customer@example.com',
      metadata: {
        walletAddress: walletAddress,
        quantity: quantity,
        tokenValue: quantity * 1.00,
        totalPaid: quantity * 1.35
      }
    });

    if (error) {
      console.error('Stripe error:', error);
      showStatus('Payment failed: ' + error.message, 'error', 'payment-status');
    }

  } catch (error) {
    console.error('❌ Purchase failed:', error);
    showStatus('Payment session creation failed. Please try again.', 'error', 'payment-status');
  } finally {
    document.getElementById('purchase-btn').textContent = 'Purchase MountainShares';
    document.getElementById('purchase-btn').disabled = false;
  }
}
