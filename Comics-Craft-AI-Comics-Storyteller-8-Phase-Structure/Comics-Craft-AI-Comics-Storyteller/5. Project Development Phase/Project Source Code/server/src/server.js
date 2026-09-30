import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import storyRoutes from "./routes/story.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/health", healthRoutes);
app.use("/api/story", storyRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Server error.",
    detail: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Midnight Magic School API running on http://localhost:${PORT}`);
});