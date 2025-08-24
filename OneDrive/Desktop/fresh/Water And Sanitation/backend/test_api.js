const axios = require('axios');
const FormData = require('form-data');

async function testAPI() {
  try {
    const formData = new FormData();
    formData.append('issueType', 'dirty');
    formData.append('description', 'Water is brown and smells bad');
    formData.append('location', 'Test Location');
    
    console.log('Testing API endpoint...');
    const response = await axios.post('http://localhost:3000/api/report', formData, {
      headers: formData.getHeaders()
    });
    
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
