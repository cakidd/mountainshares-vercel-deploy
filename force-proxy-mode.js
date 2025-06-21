// Force activate CORS proxy mode for MountainShares payments
document.addEventListener('DOMContentLoaded', function() {
  // Force proxy mode for all API calls
  window.useProxyMode = true;
  console.log('🔄 CORS proxy mode force-activated via WSL patch');
  
  // Override the API URL to always use proxy
  window.MOUNTAINSHARES_API_PROXY = 'https://cors-anywhere.herokuapp.com/https://mountainshares-production.up.railway.app';
  
  // Patch the existing functions to use proxy
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (url.includes('mountainshares-production.up.railway.app')) {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url;
      console.log('🔄 Using CORS proxy:', proxyUrl);
      return originalFetch(proxyUrl, options);
    }
    return originalFetch(url, options);
  };
});
