// Add this to your Commons website (Stack Overflow #68630229 solution)
window.handlePurchaseClick = async function() {
  const quantity = parseInt(document.getElementById('ms-quantity').value) || 1;
  const walletAddress = document.getElementById('wallet-address').value || window.selectedAccount;
  
  try {
    const response = await fetch('https://mountainshares-backend-production.up.railway.app/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: quantity,
        walletAddress: walletAddress,
        amount: quantity,
        productName: 'MountainShares Token'
      })
    });
    
    const data = await response.json();
    
    if (data.url) {
      console.log('✅ Session URL received:', data.url);
      // CLIENT-SIDE REDIRECT (Stack Overflow #68630229 solution)
      window.location.href = data.url;
    } else {
      console.log('❌ No URL in response');
    }
    
  } catch (error) {
    console.error('❌ Purchase failed:', error);
  }
};
