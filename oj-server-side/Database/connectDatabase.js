// MONGODB
const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/oj-server";

const connectDatabase = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Database Connected!!");
    })
    .catch((error) => {
      console.log("Oh no mongoose Error !!!");
      console.log(error);
    });
};

module.exports = connectDatabase;

/*

*/
