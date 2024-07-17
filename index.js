import express from "express";
import { dbConnection } from "./config/db.js";
import { eventRouter } from "./routes/event_route.js";
import { collegeRouter } from "./routes/college_route.js";
import userRouter from "./routes/user_route.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

dbConnection();

// middlewares
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

// routes
app.use(eventRouter);
app.use(collegeRouter);
app.use(userRouter);

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
