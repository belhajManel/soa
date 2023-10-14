import fs from "fs";

const booksData = JSON.parse(fs.readFileSync("../../data/books.json", "utf8"));
const usersData = JSON.parse(fs.readFileSync("../../data/users.json", "utf8"));

function allowOperations(userId) {
  const user = usersData.filter((user) => {
    user.id === userId;
  });
  if (!user || (user && !user.hasPermission)) {
    return false;
  }
  if (user && user.hasPermission) {
    return true;
  }
}

const results = {
  status: "success",
  message: "ok",
  data: [],
};

export const getBooks = (userId) => {
  const isAllowed = allowOperations(userId);
  if (isAllowed) {
    Object.assign(results, { data: booksData });
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
  }
  return results;
};

export const getBook = (userId, id) => {
  const isAllowed = allowOperations(userId);
  if (isAllowed) {
    const book = booksData.find((book) => book.id === id);
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
  return results;
};

export const addBook = (userId, data) => {
  const isAllowed = allowOperations(userId);
  if (isAllowed) {
    booksData.push(data);
    fs.writeFile("../../data/books.json", JSON.stringify(booksData), (err) => {
      if (err) {
        Object.assign(results, {
          status: "fail",
          message: "An error occurred while saving book data",
        });
      } else {
        Object.assign(results, { data: booksData });
      }
    });
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
  }

  return results;
};

export const deleteBook = (userId, id) => {
  const isAllowed = allowOperations(userId);
  if (isAllowed) {
    const filteredBooks = booksData.filter((book) => book.id !== id);
    fs.writeFile(
      "../../data/books.json",
      JSON.stringify(filteredBooks),
      (err) => {
        if (err) {
          Object.assign(results, {
            status: "fail",
            message: "An error occurred while deleting the book",
          });
        } else {
          Object.assign(results, { data: filteredBooks });
        }
      }
    );
  } else {
    Object.assign(results, {
      status: "fail",
      message: "Not enough permessions",
    });
  }

  return results;
};
