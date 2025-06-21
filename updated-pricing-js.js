// Enhanced pricing calculation with regional banking fee
async function calculatePrice() {
  const quantity = parseInt(document.getElementById('ms-quantity').value) || 1;
  
  try {
    const apiUrl = useProxyMode ? 
      `${CORS_PROXY}${MOUNTAINSHARES_API}/api/calculate-purchase` : 
      `${MOUNTAINSHARES_API}/api/calculate-purchase`;
      
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msTokens: quantity })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const pricing = data.pricing;
      
      // Update display with detailed breakdown
      document.getElementById('token-value').textContent = pricing.tokenValue.toFixed(2);
      document.getElementById('stripe-fee').textContent = pricing.stripeFee.toFixed(2);
      document.getElementById('ms-fee').textContent = pricing.mountainSharesFee.toFixed(2);
      document.getElementById('total-price').textContent = pricing.totalCharge.toFixed(2);
      
      // Add regional fee display if element exists
      const regionalFeeElement = document.getElementById('regional-fee');
      if (regionalFeeElement) {
        regionalFeeElement.textContent = pricing.stripeRegionalFee.toFixed(4);
      }
      
      return;
    }
  } catch (error) {
    console.error('Failed to calculate price:', error);
    
    // Try proxy mode if not already using it
    if (!useProxyMode && error.message.includes('Failed to fetch')) {
      useProxyMode = true;
      return calculatePrice(); // Retry with proxy
    }
  }
  
  // Fallback calculation with regional banking fee
  const tokenValue = quantity * 1.00;
  const stripeBaseFee = (tokenValue * 0.029) + 0.30;
  const stripeRegionalFee = tokenValue * 0.000111; // 0.0111% regional banking fee
  const totalStripeFee = Math.ceil((stripeBaseFee + stripeRegionalFee) * 100) / 100;
  const msFee = Math.ceil((tokenValue * 0.02) * 100) / 100;
  const total = tokenValue + totalStripeFee + msFee;
  
  document.getElementById('token-value').textContent = tokenValue.toFixed(2);
  document.getElementById('stripe-fee').textContent = totalStripeFee.toFixed(2);
  document.getElementById('ms-fee').textContent = msFee.toFixed(2);
  document.getElementById('total-price').textContent = total.toFixed(2);
  
  // Update regional fee display
  const regionalFeeElement = document.getElementById('regional-fee');
  if (regionalFeeElement) {
    regionalFeeElement.textContent = stripeRegionalFee.toFixed(4);
  }
}
