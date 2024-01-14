const express = require("express");
const app = express();
//API export calls
const userRouter = require('./router/users')
const authRouter = require('./router/auth')
const postRouter = require('./router/post')
const commentRouter = require('./router/comment')




const morgan = require("morgan");
const dotevn = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const nodemon = require("nodemon");

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
dotevn.config();


//API Url 
app.use("/social/api/users",userRouter)
app.use("/social/api/auth",authRouter)
app.use("/social/api/post",postRouter)
app.use("/social/api/post/comment",commentRouter)

const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
//Routes go here
app.all('*', (req,res) => {
  res.json({"every thing":"is awesome"})
})

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})
