import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use environment variable for Python backend URL
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "https://python-backend-server-8nsy.onrender.com";

// Add root route
app.get("/", (req, res) => {
  res.json({ 
    message: "SmartScan AI Node.js Backend is running!",
    python_backend: PYTHON_BACKEND_URL,
    endpoints: {
      "/": "Health check",
      "/api/classify": "POST - Image classification proxy"
    }
  });
});

app.post("/api/classify", async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ output: "No imageUrl provided" });
  }
  
  try {
    console.log(`Forwarding request to: ${PYTHON_BACKEND_URL}/local-caption`);
    
    const response = await fetch(`${PYTHON_BACKEND_URL}/local-caption`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    // Handle non-200 responses from Python server
    if (!response.ok) {
      const text = await response.text();
      console.error("Python server error:", text);
      return res.status(502).json({ output: "AI server error: " + text });
    }

    const data = await response.json();
    if (!data.output) {
      return res.status(500).json({ output: "No caption generated" });
    }
    res.json({ output: data.output });
  } catch (err) {
    console.error("Proxy server error:", err);
    res.status(500).json({ output: "Server error: " + err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Node.js server running on port ${PORT}`));