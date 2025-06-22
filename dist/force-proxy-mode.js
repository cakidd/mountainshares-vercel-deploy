// Force activate CORS proxy mode for MountainShares payments
document.addEventListener('DOMContentLoaded', function() {
  window.useProxyMode = true;
  console.log('🔄 CORS proxy mode force-activated');
  window.MOUNTAINSHARES_API_PROXY = 'https://cors-anywhere.herokuapp.com/https://mountainshares-backend-production.up.railway.app';
});
