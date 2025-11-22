import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/planner.js';
import plannerRoutes from './routes/planner.js';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/plan', plannerRoutes);

// Serve frontend (StudySync folder)
app.use(express.static(path.join(__dirname, '..', 'StudySync')));

// Catch-all -> frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'StudySync', 'index.html'));
});

// When running locally — start server
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
