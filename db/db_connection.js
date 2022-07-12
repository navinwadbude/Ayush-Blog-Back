const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ayush:ksCuPCEqfvH2C9R8@cluster0.fszgy.mongodb.net/EmployemyFirstDatabase?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection successful with database");
  })
  .catch((error) => {
    console.log(error);
  });
