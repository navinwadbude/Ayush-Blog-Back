const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("./db/db_connection.js");
const userRouter = require("./routes/index");
const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsConfig));

app.use("*",(req,res,next)=>{
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  next()
})
app.use("/", userRouter);

app.listen(5000, () => {
  console.log("heloo ");
});
