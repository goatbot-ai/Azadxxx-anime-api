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
}

// All videos endpoint
app.get("/api/anime", (req, res) => {
  res.json({
    creator: "Azad 💥",
    total: videoURLs.length,
    videos: videoURLs
  });
});

// Random video endpoint
app.get("/api/anime/random", (req, res) => {
  const randomVideo = videoURLs[Math.floor(Math.random() * videoURLs.length)];
  res.json(randomVideo);
});

app.listen(PORT, () => console.log(`🎬 Anime API running on port ${PORT}`));
