import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "dotenv/config";

// express HTTP application
const app = express();

// express application middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// APIs
import usersRoute from "./routes/users-route";
import moviesRoute from "./routes/movies-route";
import ticketsRoute from "./routes/tickets-route";

// express API routes
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/tickets", ticketsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

// database connection
mongoose.connect(
  // database link
  process.env.MONGO_URI,
  // database options
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  // function callback
  () => {
    // application start on port
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  }
);
