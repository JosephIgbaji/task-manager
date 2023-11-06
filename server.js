const path = require("path");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tasks = require("./routes/tasks");
const connectDb = require("./database/connect");

const server = express();

server.use(express.static(path.resolve(__dirname, "./client/build")));

server.use(cors());
server.use(express.json());

//Routes
server.use("/api/v1/tasks", tasks);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
