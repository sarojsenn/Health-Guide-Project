const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const auth = require("../middleware/auth");

const router = express.Router();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const conversationSessions = new Map();




router.post("/chat", auth, async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const userId = req.user.id;
    const currentSessionId = sessionId || `${userId}_${Date.now()}`;

    
    if (!conversationSessions.has(currentSessionId)) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
      conversationSessions.set(currentSessionId, chat);
    }

    const chat = conversationSessions.get(currentSessionId);

    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      sessionId: currentSessionId,
      timestamp: new Date()
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    
    if (error.message.includes("API_KEY_INVALID")) {
      return res.status(401).json({ 
        error: "Invalid Gemini API key. Please check your configuration." 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to generate response from chatbot",
      details: error.message 
    });
  }
});




router.post("/chat-public", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const currentSessionId = sessionId || `public_${Date.now()}`;

    
    if (!conversationSessions.has(currentSessionId)) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
      conversationSessions.set(currentSessionId, chat);
    }

    const chat = conversationSessions.get(currentSessionId);

    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      sessionId: currentSessionId,
      timestamp: new Date()
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    
    if (error.message.includes("API_KEY_INVALID")) {
      return res.status(401).json({ 
        error: "Invalid Gemini API key. Please check your configuration." 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to generate response from chatbot",
      details: error.message 
    });
  }
});




router.post("/chat-with-history", async (req, res) => {
  console.log("🔥 Chat request received:", req.body);
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      console.log("❌ No message provided");
      return res.status(400).json({ error: "Message is required" });
    }

    const currentSessionId = sessionId || `public_${Date.now()}`;
    console.log("📱 Session ID:", currentSessionId);

    
    if (!conversationSessions.has(currentSessionId)) {
      console.log("🆕 Creating new session");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
      conversationSessions.set(currentSessionId, chat);
    }

    const chat = conversationSessions.get(currentSessionId);

    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      sessionId: currentSessionId,
      timestamp: new Date()
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    
    if (error.message.includes("API_KEY_INVALID")) {
      return res.status(401).json({ 
        error: "Invalid Gemini API key. Please check your configuration." 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to generate response from chatbot",
      details: error.message 
    });
  }
});




router.delete("/session/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  
  if (conversationSessions.has(sessionId)) {
    conversationSessions.delete(sessionId);
    res.json({ success: true, message: "Session cleared" });
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});




router.get("/sessions", (req, res) => {
  res.json({ 
    activeSessions: conversationSessions.size,
    sessions: Array.from(conversationSessions.keys())
  });
});

module.exports = router;
