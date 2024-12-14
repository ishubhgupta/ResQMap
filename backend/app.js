import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectMongo from './connection.js';
import userRoute from './routers/user.js';
import missingReportRoute from './routers/missingReport.js';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectMongo(process.env.MONGO_URL);

// CORS configuration to allow withCredentials header
app.use(cors({
  origin: 'http://localhost:3000', // The origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ,'PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'], // Explicitly allow withCredentials header
  credentials: true, // Allow cookies and credentials
}));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the missingPersonImages folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRoute);
app.use('/api/missing-reports', missingReportRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}/`);
});
