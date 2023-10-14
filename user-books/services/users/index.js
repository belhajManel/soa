import fs from "fs";

const readUsersData = () => {
  fs.readFile("../../data/users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    users = JSON.parse(data || "[]");
  });
};

readUsersData();

const results = {
  status: "sucess",
  message: "ok",
  data: [],
};

export const getUsers = () => {
  Object.assign(results, { data: users });
  return results;
};

export const getUser = (id) => {
  const user = users.filter((user) => {
    user.id === id;
  });
  if (user) {
    Object.assign(results, { data: user });
  } else {
    Object.assign(results, { data: "No user with specific id" });
  }
  return results;
};

export const addUser = (data) => {
  users.push(data);
  fs.writeFile("../../data/users.json", JSON.stringify(users), function (err) {
    if (err) {
      Object.assign(results, {
        status: "fail",
        message: "An error occured while saving to data",
      });
    } else {
      Object.assign(results, { data: users });
    }
    return results;
  });
};

export const deleteUser = (id) => {
  const filtered = users.filter((user) => {
    user.id != id;
  });
  fs.writeFile(
    "../../data/users.json",
    JSON.stringify(filtered),
    function (err) {
      if (err) {
        Object.assign(results, {
          status: "fail",
          message: "An error occured while deleting the user",
        });
      } else {
        Object.assign(results, { data: filtered });
      }
      return results;
    }
  );
  Object.assign(results, { data: users });
  return filtered;
};
