const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

// Load videos from JSON
let videoURLs = [];
try {
  videoURLs = JSON.parse(fs.readFileSync("./videos.json"));
} catch (err) {
  console.error("Error loading videos.json:", err);
  videoURLs = [];
}

// 🏠 Root endpoint
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "🎬 Welcome to Anime API 💫",
    info: "Use /api/anime/random to get random anime videos.",
    powered_by: "Azad 💥",
    timestamp: new Date().toISOString()
  });
});

// ❌ Hide all videos list
app.get("/api/anime", (req, res) => {
  res.json({
    status: false,
    message: "🚫 Access Denied!",
    info: "Use /api/anime/random to fetch a random anime video.",
    powered_by: "Azad 💥"
  });
});

// ✅ Random video endpoint
app.get("/api/anime/random", (req, res) => {
  if (videoURLs.length === 0) {
    return res.json({
      status: false,
      error: "❌ No videos available right now!",
      powered_by: "Azad 💥"
    });
  }

  const randomVideo = videoURLs[Math.floor(Math.random() * videoURLs.length)];
  res.json({
    status: true,
    operator: "Azad 💥",
    message: "Random anime video fetched successfully!",
    data: {
      download_link: randomVideo
    },
    powered_by: "Anime API 💫",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => console.log(`✅ Anime API running on port ${PORT}`));
