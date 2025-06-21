exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "mountainshares-netlify",
      timeout: "26s max"
    })
  };
};
