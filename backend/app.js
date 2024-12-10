import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectMongo from "./connection.js";
import cors from 'cors'; // Import the cors package

// Router imports
import userRoute from "./routers/user.js";
import missingReportRoute from "./routers/missingReport.js";

const app = express();
const PORT = process.env.PORT;
connectMongo(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers you need
  credentials: true, // Allow credentials if you are using cookies
}));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve('./uploads')));

// Routes
app.use('/api/user', userRoute);
app.use("/api/missing-reports", missingReportRoute);

app.get('/', (req, res) => res.send("he"));

app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}/`);
});
