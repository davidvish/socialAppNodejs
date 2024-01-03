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



mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mogodb database is connet");
  });
app.listen(8200, () => {
  console.log("node connection checking check port " + 8200);
});
