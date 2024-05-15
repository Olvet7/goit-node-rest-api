import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import "dotenv/config";
import "./db/db.js";



// const DB_URI = process.env.DB_URI;

// async function run() {
//   try {
//     await mongoose.connect(DB_URI);
//     await mongoose.connection.db.admin().command({ping: 1});

//     console.log("Database connection successful");
//   } catch(error) {
//     await mongoose.disconnect();
//     process.exit(1);
//   } 
//   finally {
    
//   }
// };
// run().catch(error => console.log(error));

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter)


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


