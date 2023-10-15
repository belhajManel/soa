import express from "express";
import dotenv from "dotenv";

import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
} from "./services/users/index.js";
import {
  getBooks,
  getBook,
  addBook,
  deleteBook,
} from "./services/books/index.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/users", getUsers);
app.get("/user/:id", getUser);
app.post("/users", addUser);
app.delete("/user/:id", deleteUser);

app.get("/books", getBooks);
app.get("/book/:id", getBook);
app.post("/books", addBook);
app.delete("/book/:id", deleteBook);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${PORT}`);
});
