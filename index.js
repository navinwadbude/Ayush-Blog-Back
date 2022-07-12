const express = require("express");
const cors = require("cors");
require("./db/db_connection.js");
const userRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);

app.listen(5000, () => {
  console.log("heloo ");
});
