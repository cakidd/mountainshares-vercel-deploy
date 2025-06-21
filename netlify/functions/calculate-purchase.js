exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { msTokens } = JSON.parse(event.body);
  
  const pricing = {
    tokenValue: msTokens * 1.00,
    stripeFee: (msTokens * 1.00 * 0.029) + 0.30,
    mountainSharesFee: msTokens * 1.00 * 0.02,
    totalCharge: msTokens * 1.00 + ((msTokens * 1.00 * 0.029) + 0.30) + (msTokens * 1.00 * 0.02)
  };
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ success: true, pricing })
  };
};
