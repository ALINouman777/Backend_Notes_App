import express from "express"
import { connectDb } from "./Database/Connection.js";
import dotenv from 'dotenv';
import userRoute from "./Routes/Route.js"
import Taskroute from "./Routes/TaskRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app= express();
app.use(function(req, res, next) {
    // Set the Access-Control-Allow-Origin header to allow requests from all origins
    res.header('Access-Control-Allow-Origin', '*');
    // Set the Access-Control-Allow-Headers header to allow the Content-Type header
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['https://notes-app-7g2s.onrender.com'],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
dotenv.config();
connectDb();

app.use("/user", userRoute);
app.use("/task",Taskroute );


app.listen(process.env.PORT, ()=>{
    console.log(`server is listening `)
})