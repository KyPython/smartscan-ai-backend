import cors from "cors";
import express from "express";
import fetch from "node-fetch";
const app = express();
app.use(cors());
app.use(express.json());

// Add root route
app.get("/", (req, res) => {
  res.json({ message: "SmartScan AI Backend is running!" });
});

app.post("/api/classify", async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ output: "No imageUrl provided" });
  }
  try {
    const response = await fetch("http://localhost:5001/local-caption", {
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
    console.error("Local server error:", err);
    res.status(500).json({ output: "Server error" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));