import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// function export
import userRoutes from "./routes/userRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

// config
dotenv.config();
connectDB();
const app = express();
// * json persing and excoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 5000;

// routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("server listing");
});

// middleware
app.use(notFound);
app.use(errorHandler);

//connection
app.listen(port, () => {
  console.log(`Server started and listing to ${port}`);
});

{
  /*
   **POST api/users** - register a user
   **POST api/users/auth** - Authenticate a user and get a token
   **POST api/users/logout** - logout a user and clear cookie
   **POST api/users/profile** - get a user profile
   **POST api/users/profile** - Update profile
   */
}
