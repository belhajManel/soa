import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const moduleURL = import.meta.url;
const __dirname = dirname(fileURLToPath(moduleURL));
const filePathUsers = path.join(__dirname, "../..", "data", "users.json");
const filePathBooks = path.join(__dirname, "../..", "data", "books.json");
var usersData = JSON.parse(fs.readFileSync(filePathUsers, "utf-8"));
var booksData = JSON.parse(fs.readFileSync(filePathBooks, "utf-8"));

function allowOperations(userId) {
  var user = usersData.filter((user) => {
    if (user.id == userId) {
      return true;
    }
  });

  [user] = user;

  console.log(user);
  if (user && user?.hasPermission) {
    return true;
  }
  if (!user || (user && !user?.hasPermission)) {
    return false;
  }
}

const results = {
  status: "success",
  message: "ok",
  data: [],
};

export const getBooks = (req, res) => {
  const isAllowed = allowOperations(req.body.userId);
  if (isAllowed) {
    Object.assign(results, { data: booksData });
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
  }
  res.json(results);
};

export const getBook = (req, res) => {
  const isAllowed = allowOperations(req.body.userId);
  if (isAllowed) {
    const book = booksData.find((book) => {
      if (book.id == req.params.id) {
        return true;
      }
    });
    if (book) {
      Object.assign(results, { data: book });
    } else {
      Object.assign(results, { data: "No book with the specific id" });
    }
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
  }
  res.json(results);
};

export const addBook = (req, res) => {
  const { userId, ...data } = req.body;
  const isAllowed = allowOperations(userId);
  const isUnique = booksData.find((book) => {
    if (book.id == data.id) {
      return true;
    }
  });
  if (isUnique && Object.keys(isUnique || {}).length > 0) {
    Object.assign(results, {
      status: "fail",
      message: "Book with the same id already exists",
    });
    res.json(results);
  }
  if (isAllowed) {
    booksData.push(req.body);
    fs.writeFile(filePathBooks, JSON.stringify(booksData), (err) => {
      if (err) {
        Object.assign(results, {
          status: "fail",
          message: "An error occurred while saving book data",
        });
        res.json(results);
      } else {
        Object.assign(results, { data: booksData });
        res.json(results);
      }
    });
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
    res.json(results);
  }
};

export const deleteBook = (req, res) => {
  const isAllowed = allowOperations(req.body.userId);
  if (isAllowed) {
    const filteredBooks = booksData.filter((book) => {
      if (book.id != req.params.id) {
        return true;
      }
    });
    if (filteredBooks.length < booksData.length) {
      booksData = filteredBooks;
      fs.writeFile(filePathBooks, JSON.stringify(filteredBooks), (err) => {
        if (err) {
          Object.assign(results, {
            status: "fail",
            message: "An error occurred while deleting the book",
          });
        } else {
          Object.assign(results, { data: filteredBooks });
          res.json(results);
        }
      });
    } else {
      Object.assign(results, { message: "No book with the specific id" });
      res.json(results);
    }
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
    res.json(results);
  }
};
