import express from "express";
import dotenv from "dotenv";
import allRoutes from "./routes"; // Import index.ts which includes all routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
