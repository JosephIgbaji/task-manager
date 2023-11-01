const express = require("express");
const path = require("path");

require("dotenv").config();
const cors = require("cors");

const tasks = require("./routes/tasks");

const server = express();

const PORT = process.env.PORT || 5000;

server.use(express.static(path.resolve(__dirname, "./client/build")));

server.use(cors());
server.use(express.json());

//Routes
server.use("/api/v1/tasks", tasks);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
