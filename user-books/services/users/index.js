import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const moduleURL = import.meta.url;
const __dirname = dirname(fileURLToPath(moduleURL));
const filePath = path.join(__dirname, "../..", "data", "users.json");
var users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const results = {
  status: "sucess",
  message: "ok",
  data: [],
};

export const getUsers = (req, res) => {
  Object.assign(results, { data: users });
  res.json(results);
};

export const getUser = (req, res) => {
  const user = users.filter((user) => {
    user.id === req.params.id;
  });
  if (user) {
    Object.assign(results, { data: user });
  } else {
    Object.assign(results, { data: "No user with specific id" });
  }
  res.json(results);
};

export const addUser = (req, res) => {
  if (!req.body) {
    Object.assign(results, {
      status: "fail",
      message: "No data provided",
    });
    res.json(results);
    return;
  }
  users.push(req.body);
  fs.writeFile(filePath, JSON.stringify(users), function (err) {
    if (err) {
      Object.assign(results, {
        status: "fail",
        message: "An error occured while saving to data",
      });
    } else {
      Object.assign(results, { data: users });
    }
    res.json(results);
  });
};

export const deleteUser = (req, res) => {
  const filtered = users.filter((user) => {
    if (user.id != req.params.id) {
      return true;
    }
  });

  if (filtered.length < users.length) {
    users = filtered;
    fs.writeFile(filePath, JSON.stringify(users), function (err) {
      if (err) {
        Object.assign(results, {
          status: "fail",
          message: "An error occured while deleting the user",
        });
      } else {
        Object.assign(results, { data: users });
      }
      res.json(results);
    });
  } else {
    Object.assign(results, { data: "No user with specific id" });
    res.json(results);
  }
};
