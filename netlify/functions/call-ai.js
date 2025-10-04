const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { model, userQuery } = JSON.parse(event.body);
    
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    let response;
    
    if (model === 'gemini') {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }]
        })
      });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          text: data.candidates[0].content.parts[0].text 
        })
      };
    }
    
    // Reste du code...
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};