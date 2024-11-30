const express = require("express"); // this aquires the express for us

const userRouter = require("./routes/userRoute");

const app = express(); // this initiat the exprees

const dotenv = require("dotenv"); // require for reading the .env files
dotenv.config();


const cors = require('cors')
app.use(cors())

app.use(express.json());



//***********this is yhe production way to connect to db */
const connectToDB = require("./config/dbconfig.js");
connectToDB();


// app.use("/api/user", userRouter);  // in this ("/api/user is define as the default routes")
 app.use("/", userRouter);

//create route

app.listen(process.env.PORT || 8000, (err) => {
  if (err) console.log(err);
  console.log("running successfully at", process.env.PORT);
});
