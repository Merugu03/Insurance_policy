require('dotenv').config();
const express=require("express")
const app=express()
const upload = require("express-fileupload");

const route=require("./routes/route")

const agent=require("./routes/agent")
const LOB=require("./routes/LOB")
const carrier=require("./routes/carrier")
const UserAccount=require("./routes/userAccount")
const policy=require("./routes/policy")

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(upload());


// database
const connectDB = require('./db/connect');

// routes
app.use("/",route)

// Agents Route
app.use("/api/agent",agent)

// LOB
app.use("/api/LOB",LOB)

// carrier
app.use("/api/carrier",carrier)

// UserAccount
app.use("/api/UserAccount",UserAccount)

// user
app.use("/api/user",require("./routes/user"))

// policy
app.use("/api/policy",policy)


// app.listen(3000,console.log("Server running on port 3000"))
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();