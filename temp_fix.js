// Find the fetch call and replace it
const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
    method: 'POST',
    body: JSON.stringify(checkoutData)
    // No headers = no preflight
});
