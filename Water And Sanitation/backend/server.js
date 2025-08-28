

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();
const PORT = 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Helper: Call Gemini API for text
async function analyzeTextWithGemini(description) {
  const prompt = `Classify the following water issue report into severity (urgent, medium, low) and suggest if the water is safe to drink, needs boiling/filtration, or should be avoided.\nReport: ${description}\nRespond in JSON: {"severity":"...", "suggestion":"..."}`;
  console.log('Sending text to Gemini:', description);
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    console.log('Gemini text response:', response.data);
    const text = response.data.candidates[0].content.parts[0].text;
    console.log('Extracted text:', text);
    // Try to parse JSON from Gemini's response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    } else {
      return { severity: 'medium', suggestion: text };
    }
  } catch (err) {
    console.error('Text analysis error:', err.message);
    return { severity: 'error', suggestion: 'AI analysis failed' };
  }
}

// Helper: Call Gemini API for image
async function analyzeImageWithGemini(imagePath) {
  console.log('Analyzing image:', imagePath);
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const prompt = 'Classify this water as clean, muddy, or turbid. Respond in JSON: {"class":"..."}';
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image
                }
              }
            ]
          }
        ]
      }
    );
    console.log('Gemini image response:', response.data);
    const text = response.data.candidates[0].content.parts[0].text;
    console.log('Extracted image text:', text);
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    } else {
      return { class: text };
    }
  } catch (err) {
    console.error('Image analysis error:', err.message);
    return { class: 'AI analysis failed' };
  }
}

// Citizen Input Form submission endpoint
// First Aid & Medicine Suggestions endpoint (Gemini-powered)
app.post('/api/firstaid', async (req, res) => {
  const { symptoms } = req.body;
  if (!Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ error: 'No symptoms provided' });
  }
  const prompt = `You are a medical assistant. Given these symptoms: ${symptoms.join(", ")}, provide:
1. Emergency disclaimer if needed
2. Recommended first aid actions (bulleted)
3. List of commonly available medicines (max 3, generic names)
Respond in JSON: { disclaimer: "...", actions: ["..."], medicines: ["..."] }`;
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    const text = response.data.candidates[0].content.parts[0].text;
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return res.json(JSON.parse(match[0]));
    } else {
      return res.json({ disclaimer: '', actions: [text], medicines: [] });
    }
  } catch (err) {
    console.error('Gemini first aid error:', err.message);
    return res.status(500).json({ error: 'AI service failed' });
  }
});

// Nearby Health Centers endpoint (Gemini-powered with fallback data)
app.post('/api/nearby-facilities', async (req, res) => {
  const { location, latitude, longitude } = req.body;
  if (!location && (!latitude || !longitude)) {
    return res.status(400).json({ error: 'Location or coordinates required' });
  }
  
  const locationInfo = location || `coordinates: ${latitude}, ${longitude}`;
  
  // First try to get Gemini to provide general guidance and then provide sample data
  const prompt = `As a healthcare assistant, provide guidance for finding health facilities near ${locationInfo}. 
Create a realistic list of 3-4 sample health facilities that would typically be found in this area. 
Include hospitals, clinics, and health centers with realistic names, addresses, and phone numbers.
Respond in JSON: { 
  message: "brief helpful message about finding healthcare", 
  facilities: [{ name: "...", address: "...", phone: "...", distance: "...", type: "hospital/clinic/health center" }] 
}`;
  
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    const text = response.data.candidates[0].content.parts[0].text;
    console.log('Gemini facilities response:', text);
    
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return res.json(parsed);
    } else {
      // Fallback with sample data
      return res.json({
        message: "Here are some sample health facilities. For real-time data, please use Google Maps or call local directory services.",
        facilities: [
          {
            name: "City General Hospital",
            address: "123 Main Street, Your City",
            phone: "+1-555-0123",
            distance: "2.5 km",
            type: "hospital"
          },
          {
            name: "Community Health Clinic",
            address: "456 Oak Avenue, Your City", 
            phone: "+1-555-0456",
            distance: "1.8 km",
            type: "clinic"
          },
          {
            name: "Primary Care Center",
            address: "789 Pine Road, Your City",
            phone: "+1-555-0789", 
            distance: "3.2 km",
            type: "health center"
          }
        ]
      });
    }
  } catch (err) {
    console.error('Gemini facilities error:', err.message);
    // Provide fallback data even if API fails
    return res.json({
      message: "Unable to get AI recommendations. Here are sample facilities - please verify with local directory services.",
      facilities: [
        {
          name: "Regional Medical Center",
          address: "Near your location",
          phone: "Call local directory",
          distance: "Contact for details",
          type: "hospital"
        },
        {
          name: "Local Health Clinic", 
          address: "In your area",
          phone: "Call local directory",
          distance: "Contact for details",
          type: "clinic"
        }
      ]
    });
  }
});

app.post('/api/report', upload.single('photo'), async (req, res) => {
  const { issueType, description, location } = req.body;
  const photo = req.file ? req.file.filename : null;
  let textAnalysis = { severity: 'unknown', suggestion: 'unknown' };
  let imageAnalysis = { class: 'not_provided' };

  // Analyze text
  if (description) {
    textAnalysis = await analyzeTextWithGemini(description);
  }

  // Analyze image if provided
  if (photo) {
    const imagePath = path.join(__dirname, 'uploads', photo);
    imageAnalysis = await analyzeImageWithGemini(imagePath);
  }

  res.json({
    status: 'analyzed',
    data: { issueType, description, location, photo },
    textAnalysis,
    imageAnalysis
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
