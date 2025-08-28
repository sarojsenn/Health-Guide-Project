require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  const prompt = 'Classify this water issue: "The water is brown and smells bad" into severity (urgent, medium, low) and suggest safety action. Answer briefly.';
  
  try {
    console.log('Testing Gemini API...');
    console.log('API Key:', GEMINI_API_KEY ? 'Present' : 'Missing');
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ 
          parts: [{ text: prompt }] 
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Success!');
    console.log('Response:', response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
  }
}

testGemini();
