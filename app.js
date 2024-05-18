import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import "./db/db.js";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter)


app.use((_, response) => {
  response.status(404).json({message: "Route not found"})
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
    res.status(status).json({message});
  }
)

app.listen(8080, () => {
  console.log("Server is running")
})


