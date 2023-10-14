import express from "express";
import dotenv from "dotenv";

import { getUsers, getUser, addUser, deleteUser } from "./services/users";
import { getBooks, getBook, addBook, deleteBook } from "./services/books";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/users", getUsers);
app.use("/user", getUser);
app.use("/add-user", addUser);
app.use("/delete-user", deleteUser);

app.use("/books", getBooks);
app.use("/book", getBook);
app.use("/add-book", addBook);
app.use("/delete-book", deleteBook);

app.listen(() => {
  console.log(`App started on port ${PORT}`);
});
