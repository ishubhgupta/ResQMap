import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectMongo from "./connection.js";

const app = express();
const PORT = process.env.PORT;

connectMongo(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}/`);
});