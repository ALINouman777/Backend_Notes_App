import express from "express"
import { connectDb } from "./Database/Connection.js";
import dotenv from 'dotenv';
import userRoute from "./Routes/Route.js"
import Taskroute from "./Routes/TaskRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app= express();
dotenv.config();
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://notes-app-7g2s.onrender.com");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());

app.use("/user", userRoute);
app.use("/task",Taskroute );


app.listen(process.env.PORT, ()=>{
    console.log(`server is listening `)
})