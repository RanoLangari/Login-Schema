import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const port = process.env.PORT;

const app = express();
const corsOptions = {
  header: "Access-Control-Allow-Origin",
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(userRoutes);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
