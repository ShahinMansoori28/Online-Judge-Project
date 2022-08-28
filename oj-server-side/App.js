require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const test = require("./routes/test");
const route = require("./routes/problemMain");
const user = require("./routes/user");
const path = require("path");
const connectDatabase = require("./DataBase/connectDatabase");

connectDatabase();

//parse json request body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//enable cores
app.use(cors());

// set route routes
app.use("/explore/test", test);

// set route routes to get all the questions
app.use("/explore", route); //

// set user profile
app.use("/user", user); //

// set 404 route

// set handle error

const port = process.env.PORT || 5000;

// Serve static assets in production
// Set static folder
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
