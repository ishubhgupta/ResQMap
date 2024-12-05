import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectMongo from "./connection.js";

// Router imports
import userRoute from "./routers/user.js";

const app = express();
const PORT = process.env.PORT;
connectMongo(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

//routes
app.use('/api/user', userRoute);

app.get('/', (req, res) => res.send("he"));

app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}/`);
});
