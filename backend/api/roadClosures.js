const { getClosures } = require("../utils/roadClosureCache");

exports.getRoadClosures = async (req, res) => {
  try {
    const data = getClosures();
    if (!data || data.length === 0) {
      console.warn("⚠️ No cached road closures available");
      return res.status(204).json([]);
    }
    res.json(data);
  } catch (err) {
    console.error("❌ Failed to serve cached road closures:", err.message);
    res.status(500).json({ error: "Could not return road closures" });
  }
};
