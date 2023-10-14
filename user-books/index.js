import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(() => {
  console.log(`App started on port ${PORT}`);
});
